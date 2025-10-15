// app/policies/page.js
import React from 'react';

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
              Refund Policy
            </h1>
            <p className="text-gray-600">
              Last updated: 27th September 2025
            </p>
          </div>

          <div className="prose prose-emerald max-w-none">
            {/* Privacy Policy */}
            {/* <div className="mb-12">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">
                Privacy Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We are Fiscal Forum, committed to protecting your privacy. This Privacy Policy explains how we handle personal information when you use our website: https://fiscalforum.in.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">1. Information We Collect</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Name, email address, and phone number</li>
                <li>Payment information (for subscriptions to reports)</li>
                <li>Login credentials (username, password)</li>
                <li>Referral program details (your referred contacts if you participate)</li>
                <li>Information submitted by B2B partners, remisiers, or employees for collaboration or employment purposes</li>
                <li>We do not collect IP addresses, location data, cookies, or any tracking information.</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">2. How We Use Your Information</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Providing free and paid services, including research reports, newsletters, and market news</li>
                <li>Processing subscription payments</li>
                <li>Sending updates, newsletters, or communications if you opt in</li>
                <li>Managing partnerships, employment, and business development relationships</li>
                <li>Managing referral program rewards and tracking</li>
                <li>Operating login-protected services</li>
                <li>Complying with legal obligations</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">3. Sharing Your Information</h3>
              <p className="text-gray-700 mb-4">
                We do not sell or share your personal information with unrelated third parties.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li><strong>Third-Party Service Providers:</strong> Shared only to deliver requested services</li>
                <li><strong>Referral Program:</strong> Only limited information used to track referrals and award rewards</li>
                <li><strong>Business/Employment:</strong> Shared internally as required</li>
                <li><strong>Legal Requirements:</strong> May disclose if required by law</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">4. Social Media</h3>
              <p className="text-gray-700 mb-4">
                Engagement via our official social media handles may be visible publicly. We are not responsible for third-party social media content.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">5. Data Security</h3>
              <p className="text-gray-700 mb-4">
                We implement reasonable measures to protect your information, including login credentials and referral data.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">6. Your Rights</h3>
              <p className="text-gray-700 mb-4">
                Request access, correction, or deletion of personal data at support@fiscalforum.in.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">7. Age</h3>
              <p className="text-gray-700 mb-4">
                Our services are available to users of all ages. Parents or guardians may supervise minors if needed.
              </p>
            </div> */}

            {/* Terms & Conditions */}
            {/* <div className="mb-12">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">
                Terms & Conditions
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms govern your use of Fiscal Forum and its website: https://fiscalforum.in.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">1. Eligibility</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Users of all ages may use our services</li>
                <li>Users must provide accurate information for subscriptions and login-based services</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">2. Use of Services</h3>
              <p className="text-gray-700 mb-4">
                Our services include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Free and paid research reports (weekly/monthly/yearly)</li>
                <li>Market news (corporate, financial, global)</li>
                <li>Access to third-party financial services (stock broking, insurance, mutual funds, loans, credit cards)</li>
                <li>Login-based content</li>
                <li>Referral (“refer & earn”) program for registered users</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Free content, news, and reports are for personal use only.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">3. Paid Reports</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Access granted after successful payment</li>
                <li>Reports for personal use only</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">4. Payments</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Processed securely via third-party gateways</li>
                <li>Fees as listed on the website</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">5. Refunds</h3>
              <p className="text-gray-700 mb-4">
                Refunds available within 3 days if unsatisfied (see Refund Policy)
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">6. Referral Program</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Must provide valid information</li>
                <li>Rewards tracked based on successful referrals</li>
                <li>Fraud or misuse may result in disqualification</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">7. Partnerships & Employment</h3>
              <p className="text-gray-700 mb-4">
                Hiring B2B partners, business development partners, remisiers, and employees subject to separate agreements
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">8. Disclaimers</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Content is informational only, not financial advice</li>
                <li>No guarantee of accuracy or timeliness of third-party data</li>
                <li>Not responsible for losses from using services or third-party services</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">9. Intellectual Property</h3>
              <p className="text-gray-700 mb-4">
                All content owned by Fiscal Forum or partners. Unauthorized use prohibited.
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">10. Limitation of Liability</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Not liable for indirect, incidental, or consequential damages</li>
                <li>Liability limited to amount paid in last 12 months</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">11. Social Media</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Users interacting on social media agree to platform rules</li>
                <li>Not responsible for third-party content</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">12. Governing Law</h3>
              <p className="text-gray-700 mb-4">
                Governed by laws of India, disputes resolved in courts located in Bhilwara, Rajasthan, India
              </p>
            </div> */}

            {/* Refund/Cancellation Policy */}
            <div>
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">
                Refund/Cancellation Policy
              </h2>
              <p className="text-gray-700 mb-4">
                Fiscal Forum offers refunds for paid reports under the following terms:
              </p>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">1. Refund Eligibility</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Refunds available within 3 days if unsatisfied</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">2. Refund Process</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Contact support@fiscalforum.in with transaction details</li>
                <li>Refunds processed via original payment method</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">3. Non-Refundable Cases</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
                <li>Not available after 3 days</li>
                <li>No refunds for reports already accessed or downloaded</li>
              </ul>

              <h3 className="text-xl font-semibold text-emerald-700 mt-6 mb-3">4. Termination of Access</h3>
              <p className="text-gray-700 mb-4">
                Refund approval revokes access to report or subscription immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;