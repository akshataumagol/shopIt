import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Terms of Service</h1>
        <p className="text-lg text-gray-500">Effective Date: 2nd Jan 2026</p>
      </header>

      {/* Terms of Service Content */}
      <section className="space-y-8">
        {/* Introduction */}
        <div>
          <h2 className="text-1xl font-light italic text-black">Introduction</h2>
          <p className="text-lg text-gray-800">
            Welcome to ShopIt! Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the [Your Website/App Name] website (the "Service") operated by [Your Company Name] ("us", "we", or "our").
          </p>
          <p className="text-lg text-gray-800">
            By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with any part of the Terms, you may not access the Service.
          </p>
        </div>

        {/* Acceptance of Terms */}
        <div>
          <h2 className="text-3xl font-light italic text-black">1. Acceptance of Terms</h2>
          <p className="text-lg text-gray-800">
            By using this Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are accessing the Service on behalf of an organization, you represent and warrant that you have the authority to bind such organization to these Terms.
          </p>
        </div>

        {/* Changes to Terms */}
        <div>
          <h2 className="text-3xl font-light italic text-black">2. Changes to Terms</h2>
          <p className="text-lg text-gray-800">
            We reserve the right to modify or update these Terms at any time. When we do, we will post the updated Terms on this page and update the "Effective Date" at the top. Your continued use of the Service after such changes constitutes your acceptance of the revised Terms.
          </p>
        </div>

        {/* Eligibility */}
        <div>
          <h2 className="text-3xl font-light italic text-black">3. Eligibility</h2>
          <p className="text-lg text-gray-800">
            You must be at least 13 years old to use our Service. By using the Service, you represent and warrant that you are at least 13 years of age. If you are under 18 years of age, you may only use the Service under the supervision of a parent or legal guardian.
          </p>
        </div>

        {/* Account Creation */}
        <div>
          <h2 className="text-3xl font-light italic text-black">4. Account Creation</h2>
          <p className="text-lg text-gray-800">
            In order to access certain features of the Service, you may be required to create an account. You agree to provide accurate, current, and complete information when registering and to update such information as necessary.
          </p>
        </div>

        {/* Use of Service */}
        <div>
          <h2 className="text-3xl font-light italic text-black">5. Use of Service</h2>
          <p className="text-lg text-gray-800">
            You agree to use the Service in compliance with all applicable local, state, national, and international laws and regulations. You may not use the Service to:
          </p>
          <ul className="list-inside list-disc pl-6 text-lg text-gray-800">
            <li>Engage in any unlawful activities;</li>
            <li>Infringe on any intellectual property rights;</li>
            <li>Upload or transmit viruses or malicious code;</li>
            <li>Harass, abuse, or threaten others;</li>
            <li>Impersonate any person or entity.</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div>
          <h2 className="text-3xl font-light italic text-black">6. Intellectual Property</h2>
          <p className="text-lg text-gray-800">
            All content on the Service, including text, graphics, logos, images, and software, is the property of ShopIt or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute any content from the Service without our express written permission.
          </p>
        </div>

        {/* Privacy */}
        <div>
          <h2 className="text-3xl font-light italic text-black">7. Privacy</h2>
          <p className="text-lg text-gray-800">
            Your use of the Service is also governed by our <Link to="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>, which can be found [here]. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.
          </p>
        </div>

        {/* Disclaimers */}
        <div>
          <h2 className="text-3xl font-light italic text-black">8. Disclaimers</h2>
          <p className="text-lg text-gray-800">
            The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div>
          <h2 className="text-3xl font-light italic text-black">9. Limitation of Liability</h2>
          <p className="text-lg text-gray-800">
            To the fullest extent permitted by law, ShopIt and its affiliates will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of your use of the Service.
          </p>
        </div>

        {/* Termination */}
        <div>
          <h2 className="text-3xl font-light italic text-black">10. Termination</h2>
          <p className="text-lg text-gray-800">
            We may suspend or terminate your access to the Service at our sole discretion, without notice, for any reason, including without limitation if you violate these Terms. Upon termination, all provisions of these Terms which by their nature should survive termination shall survive.
          </p>
        </div>

        {/* Indemnification */}
        <div>
          <h2 className="text-3xl font-light italic text-black">11. Indemnification</h2>
          <p className="text-lg text-gray-800">
            You agree to indemnify, defend, and hold harmless ShopIt, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of your use of the Service or violation of these Terms.
          </p>
        </div>

        {/* Governing Law */}
        <div>
          <h2 className="text-3xl font-light italic text-black">12. Governing Law</h2>
          <p className="text-lg text-gray-800">
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or related to these Terms shall be resolved exclusively in the courts located in [Your Jurisdiction].
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-3xl font-light italic text-black">13. Contact Information</h2>
          <p className="text-lg text-gray-800">
            If you have any questions or concerns about these Terms of Service, please contact us at:
          </p>
          <p className="text-lg text-gray-800">
            ShopIt <br />
            123456789 <br />
            ShopIt.com <br />
            Kothrud, Pune-38
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
