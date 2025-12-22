// app/policies/page.js
import React from 'react';

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
              Terms & Conditions
            </h1>
            <p className="text-gray-600">
              Last updated: 27th September 2025
            </p>
          </div>

          <div className="prose prose-emerald max-w-none">

            {/* Terms & Conditions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-emerald-800 mb-4 border-b-2 border-emerald-200 pb-2">
                Terms & Conditions
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms govern your use of Fiscal Forum and its website: https://www.fiscalforum.in.
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;