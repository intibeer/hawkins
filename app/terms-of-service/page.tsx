export default function TermsOfService() {
  return (
    <div className="min-h-screen py-10 px-4 bg-[#f8f7f2]">
      <div className="zen-container pt-8 max-w-4xl mx-auto">
        <h1 className="young-serif text-3xl md:text-4xl mb-8 text-center text-[#5d4037]">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">1. Introduction</h2>
            <p className="poppins-light mb-4">
              Welcome to the Hawkins Consciousness Scale website. These Terms of Service govern your use of our website and the services we provide.
            </p>
            <p className="poppins-light">
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">2. Use of Our Services</h2>
            <p className="poppins-light mb-4">
              Our website offers a self-assessment questionnaire based on Dr. David R. Hawkins' consciousness scale. This is provided for educational and self-reflection purposes only.
            </p>
            <p className="poppins-light mb-4">
              You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">3. Intellectual Property</h2>
            <p className="poppins-light mb-4">
              The content on our website, including but not limited to text, graphics, logos, images, and software, is the property of the website owner or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>
            <p className="poppins-light mb-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">4. Disclaimer</h2>
            <p className="poppins-light mb-4">
              The Hawkins Consciousness Scale questionnaire is for self-reflection purposes only. It is not a scientific or clinical assessment of consciousness. The results are a speculative interpretation based on David Hawkins' theoretical consciousness scale and should not be considered medical or psychological advice.
            </p>
            <p className="poppins-light mb-4">
              Our website and its content are provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation or availability of the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">5. Limitation of Liability</h2>
            <p className="poppins-light mb-4">
              In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">6. Privacy</h2>
            <p className="poppins-light mb-4">
              Your use of our website is also governed by our Privacy Policy, which can be found <a href="/privacy-policy" className="text-[#9c6644] hover:underline">here</a>.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">7. Governing Law</h2>
            <p className="poppins-light mb-4">
              These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its conflict of law provisions.
            </p>
          </section>
          
          <section>
            <h2 className="poppins-semibold text-xl mb-4 text-[#5d4037]">8. Changes to Terms</h2>
            <p className="poppins-light">
              We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. You are advised to review these Terms periodically for any changes.
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