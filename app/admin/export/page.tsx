"use client"

import { useState } from 'react';
import Link from 'next/link';

export default function ExportPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState('');
  const [recordCount, setRecordCount] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState('');
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugStatus, setDebugStatus] = useState('');

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('Connecting to Airtable...');
    setRecordCount(null);

    try {
      console.log('Starting export request...');
      const response = await fetch('/api/export-data', {
        method: 'GET',
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          console.log('Could not parse error response as JSON');
          try {
            const textError = await response.text();
            console.log('Error response text:', textError);
            if (textError) {
              errorMessage = textError.substring(0, 200); // Limit error message length
            }
          } catch (textError) {
            console.log('Could not read error response as text');
          }
        }
        throw new Error(errorMessage);
      }

      setExportStatus('Download starting...');
      
      // Get the filename from the response headers
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'consciousness-scores.csv';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Parse the CSV to count records (rough estimate)
      const text = await blob.text();
      const lines = text.split('\n').filter(line => line.trim());
      const dataRows = lines.length - 1; // Subtract header row
      setRecordCount(dataRows);

      setExportStatus('Export completed successfully!');
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestStatus('Testing Airtable connection...');

    try {
      const response = await fetch('/api/test-airtable', {
        method: 'GET',
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setTestStatus(`✅ Connection successful! Found ${data.recordCount} records. Fields: ${data.fields?.join(', ') || 'none'}`);
      } else {
        setTestStatus(`❌ Connection failed: ${data.message} (Status: ${data.status || response.status})`);
      }
    } catch (error) {
      console.error('Test error:', error);
      setTestStatus(`❌ Test failed: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleDebugToken = async () => {
    setIsDebugging(true);
    setDebugStatus('Debugging Airtable token...');

    try {
      const response = await fetch('/api/debug-airtable', {
        method: 'GET',
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const basesList = data.bases.map(b => `${b.name} (${b.id})`).join(', ');
        setDebugStatus(`✅ Token is valid! Available bases: ${basesList}`);
      } else {
        setDebugStatus(`❌ Token validation failed: ${data.message} (Status: ${data.status || response.status})`);
      }
    } catch (error) {
      console.error('Debug error:', error);
      setDebugStatus(`❌ Debug failed: ${error.message}`);
    } finally {
      setIsDebugging(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="young-serif text-3xl md:text-4xl mb-4 text-[#5d4037]">
            Data Export
          </h1>
          <Link 
            href="/admin" 
            className="text-[#9c6644] hover:text-[#875839] poppins-medium"
          >
            ← Back to Admin
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="young-serif text-xl mb-4 text-[#5d4037]">
            Export Consciousness Scores
          </h2>
          <p className="poppins-light mb-6 text-[#5d4037]/80">
            Click the button below to export all consciousness scores data from your Airtable to a CSV file. 
            This will include all submitted questionnaire results, user information, and timestamps.
          </p>
          
          <div className="mb-6 p-4 bg-[#fff8e1] border border-[#ffe082] rounded-md">
            <h3 className="poppins-medium text-[#5d4037] mb-2">Export includes:</h3>
            <ul className="poppins-light text-sm text-[#5d4037] space-y-1">
              <li>• Record IDs and creation timestamps</li>
              <li>• User names and email addresses</li>
              <li>• Consciousness scores and submission dates</li>
              <li>• Consent information and data source</li>
            </ul>
          </div>
          
          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDebugToken}
                disabled={isDebugging}
                className={`py-2 px-4 rounded-md transition-colors poppins-medium ${
                  isDebugging
                    ? 'bg-[#d3cec4] text-white cursor-not-allowed'
                    : 'bg-[#6d8c9e] hover:bg-[#5a7a8a] cursor-pointer text-white'
                }`}
              >
                {isDebugging ? 'Debugging...' : 'Debug Token'}
              </button>
              
              <button
                onClick={handleTestConnection}
                disabled={isTesting}
                className={`py-2 px-4 rounded-md transition-colors poppins-medium ${
                  isTesting
                    ? 'bg-[#d3cec4] text-white cursor-not-allowed'
                    : 'bg-[#7d8c6d] hover:bg-[#6b7a5b] cursor-pointer text-white'
                }`}
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
            
            {debugStatus && (
              <div className={`p-3 rounded-md text-sm ${
                debugStatus.includes('❌') 
                  ? 'bg-[#ffebee] text-[#d32f2f] border border-[#ffcdd2]' 
                  : 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]'
              }`}>
                {debugStatus}
              </div>
            )}
            
            {testStatus && (
              <div className={`p-3 rounded-md text-sm ${
                testStatus.includes('❌') 
                  ? 'bg-[#ffebee] text-[#d32f2f] border border-[#ffcdd2]' 
                  : 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]'
              }`}>
                {testStatus}
              </div>
            )}
          </div>
          
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`py-3 px-6 rounded-md transition-colors poppins-medium ${
              isExporting
                ? 'bg-[#d3cec4] text-white cursor-not-allowed'
                : 'bg-[#9c6644] hover:bg-[#875839] cursor-pointer text-white'
            }`}
            style={{
              boxShadow: isExporting ? 'none' : '0 4px 12px rgba(156, 102, 68, 0.2)'
            }}
          >
            {isExporting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Exporting...
              </span>
            ) : (
              'Export to CSV'
            )}
          </button>
          
          {exportStatus && (
            <div className={`mt-6 p-4 rounded-md ${
              exportStatus.includes('failed') 
                ? 'bg-[#ffebee] text-[#d32f2f] border border-[#ffcdd2]' 
                : exportStatus.includes('completed')
                ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#c8e6c9]'
                : 'bg-[#e3f2fd] text-[#1976d2] border border-[#bbdefb]'
            }`}>
              <p className="poppins-medium">
                {exportStatus}
              </p>
              {recordCount !== null && (
                <p className="poppins-light text-sm mt-1">
                  {recordCount} records exported
                </p>
              )}
            </div>
          )}
          
          <div className="mt-8 p-4 bg-[#f8f5f0] border border-[#d3cec4] rounded-md">
            <h3 className="poppins-medium text-[#5d4037] mb-2 text-sm">Privacy Note:</h3>
            <p className="poppins-light text-xs text-[#5d4037]/80">
              This export contains personal data. Please handle the exported file in accordance with 
              your privacy policy and applicable data protection regulations (GDPR, etc.). 
              Store the file securely and delete it when no longer needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
