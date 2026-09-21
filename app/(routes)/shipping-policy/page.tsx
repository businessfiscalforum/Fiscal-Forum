import React from 'react';

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-800 mb-2">
              Shipping Policy
            </h1>
            <p className="text-gray-600">
              Last updated: 27th September 2025
            </p>
          </div>

          <div className="prose prose-emerald max-w-none">
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                The orders for the user are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within 1 days from the date of the order and/or payment or as per the delivery date agreed at the time of order confirmation and delivering of the shipment, subject to courier company / post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company / postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of purchase. Delivery of our services will be confirmed on your email ID as specified at the time of registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be), the same is not refundable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
