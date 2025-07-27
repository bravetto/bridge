import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resource = searchParams.get('resource');
  
  console.log(`🔧 Fallback handler for missing resource: ${resource}`);
  
  // Return a minimal response for missing chunks
  if (resource?.endsWith('.js')) {
    return new NextResponse('// Missing chunk - fallback loaded', {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
      },
    });
  }
  
  // Return empty CSS for missing stylesheets
  if (resource?.endsWith('.css')) {
    return new NextResponse('/* Missing stylesheet - fallback loaded */', {
      status: 200,
      headers: {
        'Content-Type': 'text/css',
        'Cache-Control': 'no-cache',
      },
    });
  }
  
  // Default fallback
  return new NextResponse('Resource not found', {
    status: 404,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
} 