import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-black">Privacy Policy</h1>
      </header>

      {/* Privacy Policy Content */}
      <section className="space-y-8">
        {/* Introduction */}
        <div>
          <h2 className="text-3xl font-bold text-black">Introduction</h2>
          <p className="text-lg text-gray-800">
            Welcome to our Privacy Policy page. Your privacy is critically important to us. 
            At our website, we aim to protect your personal data and ensure that you understand how your information is used.
          </p>
        </div>

        {/* Information We Collect */}
        <div>
          <h2 className="text-3xl font-bold text-black">Information We Collect</h2>
          <p className="text-lg text-gray-800">
            We may collect the following types of information:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>Personal Information (name, email, etc.)</li>
            <li>Browsing Data (IP address, device information, etc.)</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div>
          <h2 className="text-3xl font-bold text-black">How We Use Your Information</h2>
          <p className="text-lg text-gray-800">
            The information we collect is used for the following purposes:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-700">
            <li>To provide and improve our services</li>
            <li>To communicate with you</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </div>

        {/* How We Protect Your Information */}
        <div>
          <h2 className="text-3xl font-bold text-black">How We Protect Your Information</h2>
          <p className="text-lg text-gray-800">
            We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure.
          </p>
        </div>

        {/* Your Rights */}
        <div>
          <h2 className="text-3xl font-bold text-black">Your Rights</h2>
          <p className="text-lg text-gray-800">
            You have the right to access, update, or delete your personal information. If you have any concerns about your data, feel free to contact us.
          </p>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-3xl font-bold text-black">Contact Us</h2>
          <p className="text-lg text-gray-800">
            If you have any questions or concerns regarding this Privacy Policy, please contact us at{' '}
            <strong className="font-semibold text-blue-600">support@ShopIt.com</strong>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12 text-gray-600">
        <p>&copy; 2025 Our Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Privacy;
