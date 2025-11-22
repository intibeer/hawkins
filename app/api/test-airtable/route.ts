import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = 'appJLsdKawHxzgI5W';
    const TABLE_NAME = 'Consciousness Scores';
    
    console.log('Testing Airtable connection...');
    console.log('AIRTABLE_TOKEN exists:', !!AIRTABLE_TOKEN);
    console.log('BASE_ID:', BASE_ID);
    console.log('TABLE_NAME:', TABLE_NAME);
    
    if (!AIRTABLE_TOKEN) {
      return NextResponse.json({ 
        success: false, 
        message: 'AIRTABLE_TOKEN environment variable is not set' 
      }, { status: 500 });
    }

    // Try to fetch just one record to test permissions
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`);
    url.searchParams.append('maxRecords', '1');
    
    console.log('Testing with URL:', url.toString());
    
    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      }
    });
    
    console.log('Test response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable test error:', errorData);
      return NextResponse.json({ 
        success: false, 
        message: 'Airtable API error',
        status: response.status,
        error: errorData
      }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Test successful, found records:', data.records?.length || 0);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Airtable connection successful',
      recordCount: data.records?.length || 0,
      fields: data.records?.[0]?.fields ? Object.keys(data.records[0].fields) : []
    });
    
  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Test failed',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
