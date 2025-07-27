import { NextRequest, NextResponse } from 'next/server'
import { createClickUpCRM, createClickUpFormProcessor, ClickUpFormSubmission } from '@/lib/clickup-integration'

// Environment variables for ClickUp configuration
const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID
const CLICKUP_CONTACTS_LIST_ID = process.env.CLICKUP_CONTACTS_LIST_ID
const CLICKUP_DEALS_LIST_ID = process.env.CLICKUP_DEALS_LIST_ID
const CLICKUP_TASKS_LIST_ID = process.env.CLICKUP_TASKS_LIST_ID

// Rate limiting and security
const submissionCache = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_SUBMISSIONS_PER_IP = 5

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const submissions = submissionCache.get(key) || 0
  
  // Clean up old entries
  if (now % 60000 < 1000) { // Cleanup every minute
    submissionCache.clear()
  }
  
  return submissions >= MAX_SUBMISSIONS_PER_IP
}

function incrementRateLimit(ip: string): void {
  const key = getRateLimitKey(ip)
  const current = submissionCache.get(key) || 0
  submissionCache.set(key, current + 1)
}

export async function POST(request: NextRequest) {
  try {
    // Check if ClickUp is configured
    if (!CLICKUP_API_TOKEN || !CLICKUP_TEAM_ID) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ClickUp integration not configured',
          message: 'Please configure CLICKUP_API_TOKEN and CLICKUP_TEAM_ID environment variables'
        },
        { status: 500 }
      )
    }

    // Get client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown'

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded',
          message: 'Too many submissions. Please try again later.'
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { 
      formName, 
      formData, 
      options = {},
      source,
      metadata = {} 
    } = body

    // Validate required fields
    if (!formName || !formData) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields',
          message: 'formName and formData are required'
        },
        { status: 400 }
      )
    }

    // Validate form data has minimum required fields
    if (!formData.email && !formData.name && !formData.firstName) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Insufficient form data',
          message: 'At least email or name is required'
        },
        { status: 400 }
      )
    }

    // Initialize ClickUp CRM
    const crm = createClickUpCRM({
      apiToken: CLICKUP_API_TOKEN,
      teamId: CLICKUP_TEAM_ID
    })

    // Create form processor with default configuration
    const formProcessor = createClickUpFormProcessor(crm, {
      contactsListId: CLICKUP_CONTACTS_LIST_ID,
      dealsListId: CLICKUP_DEALS_LIST_ID,
      tasksListId: CLICKUP_TASKS_LIST_ID,
      leadSource: source || 'Website Form'
    })

    // Enhance form data with metadata
    const enhancedFormData = {
      ...formData,
      submissionTime: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
      ipAddress: clientIP,
      ...metadata
    }

    // Process form submission
    const result = await formProcessor(
      enhancedFormData, 
      formName, 
      {
        createContact: options.createContact ?? true,
        createDeal: options.createDeal ?? false,
        createTask: options.createTask ?? true,
        source: source || 'Website Form'
      }
    )

    // Increment rate limit counter
    incrementRateLimit(clientIP)

    // Prepare response
    const response = {
      success: true,
      message: 'Form submission processed successfully',
      data: {
        contact: result.contact ? {
          id: result.contact.id,
          created: !!result.contact.id
        } : null,
        deal: result.deal ? {
          id: result.deal.id,
          created: !!result.deal.id
        } : null,
        task: result.task ? {
          id: result.task.id,
          created: !!result.task.id
        } : null,
        errors: result.errors
      },
      timestamp: new Date().toISOString()
    }

    // Log for monitoring (in production, use proper logging)
    console.log('ClickUp form submission processed:', {
      formName,
      ip: clientIP,
      success: result.errors.length === 0,
      errors: result.errors
    })

    // Return success response
    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('ClickUp form submission error:', error)
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: 'Failed to process form submission',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check ClickUp integration status
export async function GET(request: NextRequest) {
  try {
    // Check if ClickUp is configured
    if (!CLICKUP_API_TOKEN || !CLICKUP_TEAM_ID) {
      return NextResponse.json({
        configured: false,
        message: 'ClickUp integration not configured'
      })
    }

    // Test ClickUp connection
    const crm = createClickUpCRM({
      apiToken: CLICKUP_API_TOKEN,
      teamId: CLICKUP_TEAM_ID
    })

    try {
      const teamInfo = await crm.getTeamInfo()
      
      return NextResponse.json({
        configured: true,
        connected: true,
        team: {
          id: teamInfo.id,
          name: teamInfo.name
        },
        lists: {
          contacts: !!CLICKUP_CONTACTS_LIST_ID,
          deals: !!CLICKUP_DEALS_LIST_ID,
          tasks: !!CLICKUP_TASKS_LIST_ID
        }
      })
    } catch (error) {
      return NextResponse.json({
        configured: true,
        connected: false,
        error: 'Failed to connect to ClickUp API'
      })
    }

  } catch (error) {
    return NextResponse.json({
      configured: false,
      error: 'Configuration error'
    }, { status: 500 })
  }
}

// OPTIONS endpoint for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
} 