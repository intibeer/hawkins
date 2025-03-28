export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
      <div className="zen-container pt-8 max-w-4xl mx-auto">
        <h1 className="young-serif text-3xl md:text-4xl mb-8 text-center text-[#5d4037]">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">1. Introduction</h2>
            <p className="poppins-light mb-4">
              This Privacy Policy explains how we collect, use, and protect your personal information when you use our Hawkins Consciousness Scale questionnaire.
            </p>
            <p className="poppins-light">
              We are committed to ensuring the privacy and security of your personal data in compliance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">2. Information We Collect</h2>
            <p className="poppins-light mb-4">We collect the following information:</p>
            <ul className="list-disc pl-6 mb-4 poppins-light">
              <li>Email address (required)</li>
              <li>Name (optional)</li>
              <li>Your consciousness score results</li>
              <li>Date and time of submission</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">3. How We Use Your Information</h2>
            <p className="poppins-light mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 poppins-light">
              <li>To provide you with your consciousness score results</li>
              <li>To send you additional insights related to your score</li>
              <li>To improve our questionnaire and services</li>
              <li>To analyze usage patterns and enhance user experience</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">4. Legal Basis for Processing</h2>
            <p className="poppins-light mb-4">
              We process your personal data based on your consent, which you provide by checking the consent box before submitting your information.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">5. Data Storage and Security</h2>
            <p className="poppins-light mb-4">
              Your data is stored securely in Airtable with appropriate technical and organizational measures to protect against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="poppins-light">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">6. Your Rights</h2>
            <p className="poppins-light mb-4">Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-4 poppins-light">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
            <p className="poppins-light">
              To exercise any of these rights, please contact us at [your contact email].
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">7. Third-Party Sharing</h2>
            <p className="poppins-light">
              We do not sell, trade, or otherwise transfer your personal information to outside parties except as specifically described in this Privacy Policy. We use Airtable as our data processor, which is GDPR compliant.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">8. Cookies and Analytics</h2>
            <p className="poppins-light">
              We use Google Analytics to track usage patterns and improve our service. This may involve the use of cookies. You can control cookies through your browser settings.
            </p>
          </section>
          
          <section>
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">9. Changes to This Privacy Policy</h2>
            <p className="poppins-light">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
            </p>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <p className="poppins-light text-sm text-[#7d7d7d]">Last updated: {new Date().toLocaleDateString()}</p>
          <a href="/" className="inline-block mt-4 text-[#9c6644] hover:text-[#875839] poppins-medium">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
} 