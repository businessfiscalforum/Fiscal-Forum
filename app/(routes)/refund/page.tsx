import React from 'react';

const RefundPolicyPage = () => {
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

          <div className="prose prose-emerald max-w-none text-gray-700 space-y-8">
            {/* Refund and Cancellation policy */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2">
                Refund and Cancellation policy
              </h2>
              <p className="mb-4 leading-relaxed">
                This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service that you have purchased through the Platform. Under this policy:
              </p>
              <ol className="list-decimal pl-6 space-y-3 leading-relaxed">
                <li>
                  Cancellations will only be considered if the request is made 7 days of placing the order. However, cancellation requests may not be entertained if the orders have been communicated to such sellers / merchant(s) listed on the Platform and they have initiated the process of shipping them, or the product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
                </li>
                <li>
                  <strong>8696060387</strong> does not accept cancellation requests for perishable items like flowers, eatables, etc. However, the refund / replacement can be made if the user establishes that the quality of the product delivered is not good.
                </li>
                <li>
                  In case of receipt of damaged or defective items, please report to our customer service team. The request would be entertained once the seller/ merchant listed on the Platform, has checked and determined the same at its own end. This should be reported within 7 days of receipt of products. In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The customer service team after looking into your complaint will take an appropriate decision.
                </li>
                <li>
                  In case of complaints regarding the products that come with a warranty from the manufacturers, please refer the issue to them.
                </li>
                <li>
                  In case of any refunds approved by <strong>8696060387</strong>, it will take 1 days for the refund to be processed to you.
                </li>
              </ol>
            </div>

            {/* Return Policy */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2">
                Return Policy
              </h2>
              <p className="mb-4 leading-relaxed">
                We offer refund / exchange within first 1 days from the date of your purchase. If 1 days have passed since your purchase, you will not be offered a return, exchange or refund of any kind. In order to become eligible for a return or an exchange, (i) the purchased item should be unused and in the same condition as you received it, (ii) the item must have original packaging, (iii) if the item that you purchased on a sale, then the item may not be eligible for a return / exchange. Further, only such items are replaced by us (based on an exchange request), if such items are found defective or damaged.
              </p>
              <p className="leading-relaxed">
                You agree that there may be a certain category of products / items that are exempted from returns or refunds. Such categories of the products would be identified to you at the item of purchase. For exchange / return accepted request(s) (as applicable), once your returned product / item is received and inspected by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further. If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will be processed in accordance with our policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyPage;