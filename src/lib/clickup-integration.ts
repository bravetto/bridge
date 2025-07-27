// ClickUp CRM Integration Library
// Comprehensive integration for task creation, contact management, and deal tracking

export interface ClickUpConfig {
  apiToken: string
  teamId: string
  baseUrl?: string
}

export interface ClickUpTask {
  id?: string
  name: string
  description?: string
  status?: string
  priority?: 1 | 2 | 3 | 4 // 1=urgent, 2=high, 3=normal, 4=low
  assignees?: string[]
  due_date?: number // Unix timestamp
  start_date?: number // Unix timestamp
  tags?: string[]
  custom_fields?: ClickUpCustomField[]
  list_id: string
}

export interface ClickUpCustomField {
  id: string
  value: string | number | boolean | string[]
}

export interface ClickUpContact {
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  source?: string
  tags?: string[]
  custom_fields?: Record<string, any>
}

export interface ClickUpDeal {
  name: string
  value?: number
  stage: string
  contact_id?: string
  company?: string
  source?: string
  notes?: string
  expected_close_date?: number
  probability?: number
  tags?: string[]
}

export interface ClickUpFormSubmission {
  formName: string
  fields: Record<string, any>
  submittedAt: Date
  source?: string
  ipAddress?: string
  userAgent?: string
}

export interface ClickUpList {
  id: string
  name: string
  folder?: {
    id: string
    name: string
  }
  space: {
    id: string
    name: string
  }
  statuses: Array<{
    id: string
    status: string
    type: string
    orderindex: number
    color: string
  }>
}

export interface ClickUpUser {
  id: string
  username: string
  email: string
  color: string
  profilePicture?: string
}

export class ClickUpCRMError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ClickUpCRMError'
  }
}

export class ClickUpCRM {
  private config: ClickUpConfig
  private baseUrl: string

  constructor(config: ClickUpConfig) {
    this.config = config
    this.baseUrl = config.baseUrl || 'https://api.clickup.com/api/v2'
  }

  private async makeRequest<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const headers: Record<string, string> = {
      'Authorization': this.config.apiToken,
      'Content-Type': 'application/json'
    }

    const options: RequestInit = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) })
    }

    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ClickUpCRMError(
          errorData.err || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        )
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ClickUpCRMError) {
        throw error
      }
      throw new ClickUpCRMError(
        `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }

  // Team and Workspace Management
  async getTeamInfo(): Promise<any> {
    return this.makeRequest(`/team/${this.config.teamId}`)
  }

  async getSpaces(): Promise<any> {
    return this.makeRequest(`/team/${this.config.teamId}/space`)
  }

  async getLists(spaceId?: string): Promise<ClickUpList[]> {
    if (spaceId) {
      const response = await this.makeRequest<{ lists: ClickUpList[] }>(`/space/${spaceId}/list`)
      return response.lists || []
    }
    
    // Get all lists across all spaces
    const spaces = await this.getSpaces()
    const allLists: ClickUpList[] = []
    
    for (const space of (spaces as any).spaces || []) {
      try {
        const response = await this.makeRequest<{ lists: ClickUpList[] }>(`/space/${space.id}/list`)
        allLists.push(...(response.lists || []))
      } catch (error) {
        console.warn(`Failed to fetch lists for space ${space.id}:`, error)
      }
    }
    
    return allLists
  }

  async getUsers(): Promise<ClickUpUser[]> {
    const response = await this.makeRequest<{ members: ClickUpUser[] }>(`/team/${this.config.teamId}/member`)
    return response.members || []
  }

  // Task Management
  async createTask(task: ClickUpTask): Promise<any> {
    const taskData = {
      name: task.name,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      assignees: task.assignees || [],
      due_date: task.due_date,
      start_date: task.start_date,
      tags: task.tags || [],
      custom_fields: task.custom_fields || []
    }

    return this.makeRequest(`/list/${task.list_id}/task`, 'POST', taskData)
  }

  async updateTask(taskId: string, updates: Partial<ClickUpTask>): Promise<any> {
    return this.makeRequest(`/task/${taskId}`, 'PUT', updates)
  }

  async getTask(taskId: string): Promise<any> {
    return this.makeRequest(`/task/${taskId}`)
  }

  async getTasks(listId: string, filters?: {
    assignees?: string[]
    statuses?: string[]
    tags?: string[]
    due_date_gt?: number
    due_date_lt?: number
  }): Promise<any> {
    let endpoint = `/list/${listId}/task`
    
    if (filters) {
      const params = new URLSearchParams()
      
      if (filters.assignees?.length) {
        filters.assignees.forEach(id => params.append('assignees[]', id))
      }
      if (filters.statuses?.length) {
        filters.statuses.forEach(status => params.append('statuses[]', status))
      }
      if (filters.tags?.length) {
        filters.tags.forEach(tag => params.append('tags[]', tag))
      }
      if (filters.due_date_gt) {
        params.set('due_date_gt', filters.due_date_gt.toString())
      }
      if (filters.due_date_lt) {
        params.set('due_date_lt', filters.due_date_lt.toString())
      }
      
      const queryString = params.toString()
      if (queryString) {
        endpoint += `?${queryString}`
      }
    }

    return this.makeRequest(endpoint)
  }

  async deleteTask(taskId: string): Promise<any> {
    return this.makeRequest(`/task/${taskId}`, 'DELETE')
  }

  // Contact Management (using tasks with custom fields)
  async createContact(contact: ClickUpContact, contactsListId: string): Promise<any> {
    const customFields: ClickUpCustomField[] = [
      { id: 'email', value: contact.email },
      { id: 'phone', value: contact.phone || '' },
      { id: 'company', value: contact.company || '' },
      { id: 'role', value: contact.role || '' },
      { id: 'source', value: contact.source || '' }
    ]

    const task: ClickUpTask = {
      name: `Contact: ${contact.name}`,
      description: `Contact information for ${contact.name}`,
      list_id: contactsListId,
      tags: ['contact', ...(contact.tags || [])],
      custom_fields: customFields,
      priority: 3
    }

    return this.createTask(task)
  }

  async updateContact(contactTaskId: string, updates: Partial<ClickUpContact>): Promise<any> {
    const customFields: ClickUpCustomField[] = []
    
    if (updates.email) customFields.push({ id: 'email', value: updates.email })
    if (updates.phone) customFields.push({ id: 'phone', value: updates.phone })
    if (updates.company) customFields.push({ id: 'company', value: updates.company })
    if (updates.role) customFields.push({ id: 'role', value: updates.role })
    if (updates.source) customFields.push({ id: 'source', value: updates.source })

    const taskUpdates: Partial<ClickUpTask> = {
      ...(updates.name && { name: `Contact: ${updates.name}` }),
      ...(customFields.length && { custom_fields: customFields }),
      ...(updates.tags && { tags: ['contact', ...updates.tags] })
    }

    return this.updateTask(contactTaskId, taskUpdates)
  }

  async getContacts(contactsListId: string): Promise<any> {
    return this.getTasks(contactsListId, { tags: ['contact'] })
  }

  // Deal Management (using tasks with custom fields)
  async createDeal(deal: ClickUpDeal, dealsListId: string): Promise<any> {
    const customFields: ClickUpCustomField[] = [
      { id: 'deal_value', value: deal.value || 0 },
      { id: 'deal_stage', value: deal.stage },
      { id: 'contact_id', value: deal.contact_id || '' },
      { id: 'company', value: deal.company || '' },
      { id: 'source', value: deal.source || '' },
      { id: 'probability', value: deal.probability || 50 }
    ]

    const task: ClickUpTask = {
      name: `Deal: ${deal.name}`,
      description: deal.notes || `Deal for ${deal.name}`,
      list_id: dealsListId,
      tags: ['deal', ...(deal.tags || [])],
      custom_fields: customFields,
      priority: 2,
      due_date: deal.expected_close_date
    }

    return this.createTask(task)
  }

  async updateDeal(dealTaskId: string, updates: Partial<ClickUpDeal>): Promise<any> {
    const customFields: ClickUpCustomField[] = []
    
    if (updates.value !== undefined) customFields.push({ id: 'deal_value', value: updates.value })
    if (updates.stage) customFields.push({ id: 'deal_stage', value: updates.stage })
    if (updates.contact_id) customFields.push({ id: 'contact_id', value: updates.contact_id })
    if (updates.company) customFields.push({ id: 'company', value: updates.company })
    if (updates.source) customFields.push({ id: 'source', value: updates.source })
    if (updates.probability !== undefined) customFields.push({ id: 'probability', value: updates.probability })

    const taskUpdates: Partial<ClickUpTask> = {
      ...(updates.name && { name: `Deal: ${updates.name}` }),
      ...(updates.notes && { description: updates.notes }),
      ...(customFields.length && { custom_fields: customFields }),
      ...(updates.tags && { tags: ['deal', ...updates.tags] }),
      ...(updates.expected_close_date && { due_date: updates.expected_close_date })
    }

    return this.updateTask(dealTaskId, taskUpdates)
  }

  async getDeals(dealsListId: string, filters?: { stage?: string; value_gt?: number }): Promise<any> {
    const taskFilters: any = { tags: ['deal'] }
    
    // Note: Advanced filtering by custom fields requires ClickUp's paid plans
    // For basic filtering, we'll get all deals and filter client-side
    const deals = await this.getTasks(dealsListId, taskFilters)
    
    if (filters) {
      // Client-side filtering (not ideal for large datasets)
      deals.tasks = deals.tasks?.filter((task: any) => {
        if (filters.stage) {
          const stageField = task.custom_fields?.find((f: any) => f.name === 'deal_stage')
          if (stageField?.value !== filters.stage) return false
        }
        
        if (filters.value_gt) {
          const valueField = task.custom_fields?.find((f: any) => f.name === 'deal_value')
          if (!valueField || parseFloat(valueField.value) <= filters.value_gt) return false
        }
        
        return true
      })
    }
    
    return deals
  }

  // Form Integration
  async processFormSubmission(
    submission: ClickUpFormSubmission,
    config: {
      createContact?: boolean
      createDeal?: boolean
      createTask?: boolean
      contactsListId?: string
      dealsListId?: string
      tasksListId?: string
      leadSource?: string
    }
  ): Promise<{
    contact?: any
    deal?: any
    task?: any
    errors: string[]
  }> {
    const results: any = { errors: [] }

    try {
      // Extract common fields
      const name = submission.fields.name || submission.fields.firstName + ' ' + submission.fields.lastName
      const email = submission.fields.email
      const company = submission.fields.company
      const phone = submission.fields.phone

      // Create contact if requested
      if (config.createContact && config.contactsListId && name && email) {
        try {
          const contact: ClickUpContact = {
            name,
            email,
            phone,
            company,
            source: config.leadSource || submission.source || 'Web Form',
            tags: [submission.formName.toLowerCase().replace(/\s+/g, '-')]
          }
          
          results.contact = await this.createContact(contact, config.contactsListId)
        } catch (error) {
          results.errors.push(`Failed to create contact: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }

      // Create deal if requested
      if (config.createDeal && config.dealsListId && name) {
        try {
          const dealValue = submission.fields.budget || submission.fields.dealValue || 0
          
          const deal: ClickUpDeal = {
            name: `${submission.formName} - ${name}`,
            value: typeof dealValue === 'string' ? parseFloat(dealValue) : dealValue,
            stage: 'New Lead',
            company,
            source: config.leadSource || submission.source || 'Web Form',
            notes: `Form submission from ${submission.formName}\n\nSubmission details:\n${JSON.stringify(submission.fields, null, 2)}`,
            tags: [submission.formName.toLowerCase().replace(/\s+/g, '-')]
          }
          
          results.deal = await this.createDeal(deal, config.dealsListId)
        } catch (error) {
          results.errors.push(`Failed to create deal: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }

      // Create task if requested
      if (config.createTask && config.tasksListId) {
        try {
          const task: ClickUpTask = {
            name: `Follow up: ${submission.formName} - ${name || 'Unknown'}`,
            description: `New form submission from ${submission.formName}\n\nSubmission details:\n${JSON.stringify(submission.fields, null, 2)}\n\nSubmitted: ${submission.submittedAt.toISOString()}\nSource: ${submission.source || 'Unknown'}\nIP: ${submission.ipAddress || 'Unknown'}`,
            list_id: config.tasksListId,
            priority: 2,
            tags: ['form-submission', submission.formName.toLowerCase().replace(/\s+/g, '-')],
            due_date: Date.now() + (24 * 60 * 60 * 1000) // Due in 24 hours
          }
          
          results.task = await this.createTask(task)
        } catch (error) {
          results.errors.push(`Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }

    } catch (error) {
      results.errors.push(`Form processing error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    return results
  }

  // Analytics and Reporting
  async getDealsPipeline(dealsListId: string): Promise<{
    stages: Record<string, { count: number; value: number }>
    total: { count: number; value: number }
  }> {
    const deals = await this.getDeals(dealsListId)
    const pipeline: Record<string, { count: number; value: number }> = {}
    let totalCount = 0
    let totalValue = 0

    for (const deal of deals.tasks || []) {
      const stageField = deal.custom_fields?.find((f: any) => f.name === 'deal_stage')
      const valueField = deal.custom_fields?.find((f: any) => f.name === 'deal_value')
      
      const stage = stageField?.value || 'Unknown'
      const value = valueField ? parseFloat(valueField.value) || 0 : 0

      if (!pipeline[stage]) {
        pipeline[stage] = { count: 0, value: 0 }
      }

      pipeline[stage].count++
      pipeline[stage].value += value
      totalCount++
      totalValue += value
    }

    return {
      stages: pipeline,
      total: { count: totalCount, value: totalValue }
    }
  }

  async getContactsReport(contactsListId: string): Promise<{
    total: number
    sources: Record<string, number>
    companies: Record<string, number>
  }> {
    const contacts = await this.getContacts(contactsListId)
    const report = {
      total: 0,
      sources: {} as Record<string, number>,
      companies: {} as Record<string, number>
    }

    for (const contact of contacts.tasks || []) {
      report.total++

      const sourceField = contact.custom_fields?.find((f: any) => f.name === 'source')
      const companyField = contact.custom_fields?.find((f: any) => f.name === 'company')

      const source = sourceField?.value || 'Unknown'
      const company = companyField?.value || 'Unknown'

      report.sources[source] = (report.sources[source] || 0) + 1
      report.companies[company] = (report.companies[company] || 0) + 1
    }

    return report
  }

  // Webhook Management
  async createWebhook(endpoint: string, events: string[]): Promise<any> {
    const webhookData = {
      endpoint,
      events
    }

    return this.makeRequest(`/team/${this.config.teamId}/webhook`, 'POST', webhookData)
  }

  async getWebhooks(): Promise<any> {
    return this.makeRequest(`/team/${this.config.teamId}/webhook`)
  }

  async deleteWebhook(webhookId: string): Promise<any> {
    return this.makeRequest(`/webhook/${webhookId}`, 'DELETE')
  }
}

// Utility functions for form integration
export const createClickUpFormProcessor = (crm: ClickUpCRM, defaultConfig: {
  contactsListId?: string
  dealsListId?: string
  tasksListId?: string
  leadSource?: string
}) => {
  return async (formData: Record<string, any>, formName: string, options?: {
    createContact?: boolean
    createDeal?: boolean
    createTask?: boolean
    source?: string
  }) => {
    const submission: ClickUpFormSubmission = {
      formName,
      fields: formData,
      submittedAt: new Date(),
      source: options?.source || defaultConfig.leadSource
    }

    const config = {
      ...defaultConfig,
      createContact: options?.createContact ?? true,
      createDeal: options?.createDeal ?? false,
      createTask: options?.createTask ?? true
    }

    return crm.processFormSubmission(submission, config)
  }
}

// Export default instance creator
export const createClickUpCRM = (config: ClickUpConfig) => new ClickUpCRM(config)

export default ClickUpCRM 