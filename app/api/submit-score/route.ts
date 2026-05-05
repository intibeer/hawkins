import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, score } = data;

    if (!email || !score) {
      return NextResponse.json({ success: false, message: 'Email and score are required' }, { status: 400 });
    }

    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const SHEET_RANGE = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:F';
    const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const SERVICE_ACCOUNT_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!SHEET_ID || !SERVICE_ACCOUNT_EMAIL || !SERVICE_ACCOUNT_KEY) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json({ success: false, message: 'Server misconfigured' }, { status: 500 });
    }

    const submissionDate = new Date().toISOString();

    const auth = new google.auth.JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      key: SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          submissionDate,
          name || 'Anonymous',
          email,
          Number(score),
          true,
          'Consciousness Questionnaire',
        ]],
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Score submitted successfully',
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}
