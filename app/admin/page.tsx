import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="young-serif text-3xl md:text-4xl mb-4 text-[#5d4037]">
            Admin Dashboard
          </h1>
          <Link 
            href="/" 
            className="text-[#9c6644] hover:text-[#875839] poppins-medium"
          >
            ← Back to Home
          </Link>
        </div>
        
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="young-serif text-xl mb-3 text-[#5d4037]">Data Management</h2>
            <p className="poppins-light text-[#5d4037]/80 mb-4">
              Export and manage consciousness scores data from your Airtable database.
            </p>
            <Link 
              href="/admin/export" 
              className="inline-block py-2 px-4 bg-[#9c6644] text-white rounded-md hover:bg-[#875839] transition-colors poppins-medium"
              style={{
                boxShadow: '0 4px 12px rgba(156, 102, 68, 0.2)'
              }}
            >
              Export Data to CSV
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="young-serif text-xl mb-3 text-[#5d4037]">Quick Stats</h2>
            <p className="poppins-light text-[#5d4037]/80 mb-4">
              View basic information about your consciousness scale data.
            </p>
            <div className="text-sm text-[#5d4037]/60">
              Use the export function to get detailed analytics and user data.
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-[#fff8e1] border border-[#ffe082] rounded-md">
          <h3 className="poppins-medium text-[#5d4037] mb-2">Security Notice:</h3>
          <p className="poppins-light text-xs text-[#5d4037]/80">
            This admin area contains sensitive user data. Ensure you're accessing this from a secure location 
            and handle all exported data in accordance with your privacy policy and GDPR requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
