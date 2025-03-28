import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, score } = data;
    
    // Validate inputs
    if (!email || !score) {
      return NextResponse.json({ success: false, message: 'Email and score are required' }, { status: 400 });
    }
    
    // Airtable API configuration
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const BASE_ID = 'appJLsdKawHxzgI5W'; // Replace with your actual base ID
    const TABLE_NAME = 'Consciousness Scores';
    
    // Format date for GDPR compliance (record when consent was given)
    const submissionDate = new Date().toISOString();
    
    console.log('Preparing to submit to Airtable:', { name, email, score: Number(score) });
    
    // Prepare record for Airtable with GDPR fields
    const recordData = {
      records: [
        {
          fields: {
            Name: name || 'Anonymous',
            Email: email,
            Score: Number(score),
            'Consent Given': true,
            'Data Source': 'Consciousness Questionnaire'
          }
        }
      ]
    };
    
    console.log('Sending data to Airtable with token:', AIRTABLE_TOKEN ? 'Token exists' : 'Token missing');
    
    // Submit to Airtable
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recordData)
    });
    
    // Log the response status
    console.log('Airtable response status:', response.status);
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error('Airtable error:', result);
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to save to database',
        error: result
      }, { status: 500 });
    }
    
    console.log('Successfully submitted to Airtable:', result);
    
    // For GDPR compliance, don't return unnecessary personal data in the response
    return NextResponse.json({ 
      success: true, 
      message: 'Score submitted successfully'
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 