import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    
    console.log('=== AIRTABLE DEBUG INFO ===');
    console.log('AIRTABLE_TOKEN exists:', !!AIRTABLE_TOKEN);
    console.log('AIRTABLE_TOKEN length:', AIRTABLE_TOKEN?.length || 0);
    console.log('AIRTABLE_TOKEN starts with:', AIRTABLE_TOKEN?.substring(0, 10) + '...' || 'N/A');
    
    if (!AIRTABLE_TOKEN) {
      return NextResponse.json({ 
        success: false, 
        message: 'AIRTABLE_TOKEN not found' 
      }, { status: 500 });
    }

    // Let's try to list all bases this token has access to
    console.log('Attempting to list bases...');
    const basesResponse = await fetch('https://api.airtable.com/v0/meta/bases', {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      }
    });
    
    console.log('Bases API response status:', basesResponse.status);
    
    if (basesResponse.ok) {
      const basesData = await basesResponse.json();
      console.log('Available bases:', basesData.bases?.map(b => ({ id: b.id, name: b.name })) || []);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Token is valid',
        bases: basesData.bases?.map(b => ({ id: b.id, name: b.name })) || []
      });
    } else {
      const errorData = await basesResponse.json();
      console.log('Bases API error:', errorData);
      
      return NextResponse.json({ 
        success: false, 
        message: 'Token validation failed',
        error: errorData,
        status: basesResponse.status
      }, { status: basesResponse.status });
    }
    
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Debug failed',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
