import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = 'appJLsdKawHxzgI5W'; // Make sure this matches your Airtable base
    const TABLE_NAME = 'Consciousness Scores'; // Make sure this matches your table name exactly
    
    console.log('Starting data export...');
    console.log('AIRTABLE_TOKEN exists:', !!AIRTABLE_TOKEN);
    console.log('BASE_ID:', BASE_ID);
    console.log('TABLE_NAME:', TABLE_NAME);
    
    if (!AIRTABLE_TOKEN) {
      throw new Error('AIRTABLE_TOKEN environment variable is not set');
    }
    
    // Fetch all records from Airtable
    let allRecords = [];
    let offset = null;
    
    do {
      const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`);
      if (offset) {
        url.searchParams.append('offset', offset);
      }
      
      console.log('Fetching from URL:', url.toString());
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        }
      });
      
      console.log('Airtable response status:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Airtable API error: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Airtable API error:', errorData);
          errorMessage = `${errorMessage} - ${errorData.error?.message || errorData.error?.type || 'Unknown error'}`;
        } catch (parseError) {
          console.error('Could not parse Airtable error response');
          const textResponse = await response.text();
          console.error('Raw error response:', textResponse);
          if (textResponse) {
            errorMessage = `${errorMessage} - ${textResponse.substring(0, 100)}`;
          }
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      allRecords.push(...data.records);
      offset = data.offset;
      
      console.log(`Fetched ${data.records.length} records, total: ${allRecords.length}`);
    } while (offset);
    
    console.log(`Total records fetched: ${allRecords.length}`);
    
    // Convert to CSV
    if (allRecords.length === 0) {
      return new NextResponse('No data found', { status: 404 });
    }
    
    // Get all unique field names
    const fieldNames = new Set();
    allRecords.forEach(record => {
      Object.keys(record.fields).forEach(field => fieldNames.add(field));
    });
    
    const headers = ['Record ID', 'Created Time', ...Array.from(fieldNames).sort()];
    let csvContent = headers.join(',') + '\n';
    
    allRecords.forEach(record => {
      const row = [
        `"${record.id}"`,
        `"${record.createdTime}"`,
        ...headers.slice(2).map(header => {
          const value = record.fields[header];
          if (value === undefined || value === null) return '""';
          // Escape quotes and handle different data types
          const stringValue = String(value).replace(/"/g, '""');
          return `"${stringValue}"`;
        })
      ];
      csvContent += row.join(',') + '\n';
    });
    
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `consciousness-scores-${timestamp}.csv`;
    
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Export failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
