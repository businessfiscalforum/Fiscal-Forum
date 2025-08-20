"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaTruck } from "react-icons/fa";

export default function CommercialVehicleInsurancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow-lg border border-emerald-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center flex-grow px-4">
            Commercial Vehicle Insurance
          </h1>
          <div className="w-16"></div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaTruck className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Cover for Your Business on the Move</h2>
              <p className="text-emerald-600">
                Secure your commercial vehicles against risks on the road
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Commercial vehicles are the backbone of many businesses, enabling trade, deliveries, and essential services across industries—from food distribution and freight transport to construction and emergency services. These vehicles operate daily in diverse environments, facing traffic hazards, weather conditions, and potential mechanical failures. Any accident, damage, or liability involving them can result in heavy financial losses, legal complications, and operational delays.
            </p>

            <p>
              Commercial vehicle insurance is a critical safeguard that protects your business assets and ensures uninterrupted operations. By insuring your fleet, you shield your company from unexpected costs and maintain stability even in challenging circumstances.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Comprehensive Protection for Business Vehicles</h3>
            <p>
              Commercial vehicle insurance offers tailored coverage for all types of business vehicles, whether you operate compact delivery vans, large semi-trucks, or specialized transport units. The protection goes beyond basic collision coverage to include a wide range of risks encountered on the road. Damage from accidents, such as collisions or rollovers, is covered, helping to manage repair or replacement costs efficiently. The policy also extends to losses caused by fire, floods, storms, hail, and other natural disasters, ensuring your assets are protected in extreme conditions.
            </p>
            <p>
              In the event of theft or vandalism, the insurance provides financial recovery for both the vehicle and its contents. Third-party liability coverage is a crucial component, protecting your business from claims made by others involved in an accident. This includes compensation for property damage or personal injury, reducing the risk of financial strain from lawsuits or legal settlements. For businesses transporting goods, cargo insurance adds an essential layer of security, covering valuable items that may be damaged, lost, or destroyed during transit. Protection is also available when dealing with drivers who lack sufficient insurance, through coverage for accidents involving uninsured or underinsured motorists.
            </p>
            <p>
              This broad range of protection ensures your business remains resilient, no matter what challenges arise on the road.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Safeguarding Business Continuity</h3>
            <p>
              When your vehicles are insured, your operations can continue smoothly even after an unexpected incident. Whether you run a logistics company, manage a delivery network, or rely on mobile service units, commercial vehicle insurance minimizes downtime and prevents minor setbacks from turning into major disruptions. Consider a scenario where one of your trucks is involved in an accident. Without insurance, you could face not only the cost of repairs or replacement but also lost income from halted deliveries, penalties for missed deadlines, and the added expense of temporary vehicle rentals. With proper coverage, these financial burdens are significantly reduced, allowing your team to focus on serving customers without interruption.
            </p>
            <p>
              The benefits extend beyond immediate incident response. Commercial vehicle insurance supports long-term business growth by reducing the financial risks associated with owning and operating a fleet. It makes it easier to secure financing or leasing options for new vehicles, helps meet legal and industry compliance requirements, and strengthens your credibility when working with clients, partners, and lenders. By minimizing exposure to risk, you create a more stable foundation for scaling your operations and exploring new opportunities.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Protecting Your Reputation and Client Trust</h3>
            <p>
              Your business reputation is built on reliability, consistency, and professionalism. Insuring your commercial vehicles demonstrates a commitment to safety and responsibility—qualities that inspire confidence in your clients, suppliers, and employees. Customers expect timely deliveries and dependable service. A breakdown or accident without insurance can lead to delays, damaged goods, or unfulfilled orders, all of which can damage your brand and lead to negative feedback. With comprehensive coverage, you maintain service continuity and uphold your promises, reinforcing your image as a trustworthy and professional partner.
            </p>
            <p>
              Many contracts, tenders, and government agencies also require proof of valid commercial vehicle insurance before awarding business or issuing permits. Having the right policy in place not only meets these requirements but also enhances your competitiveness in bidding processes. It shows that your business is prepared, responsible, and capable of managing operational risks effectively.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Choose the Right Policy for Your Needs</h3>
            <p>
              Every business is different, and so are its insurance needs. Working with an experienced provider who understands your industry allows you to customize a policy that aligns with your specific operations. Factors such as the type and age of your vehicles, the experience of your drivers, the frequency and distance of your routes, the value of the cargo you transport, and the regions where you operate all influence the ideal coverage for your fleet. A well-matched policy ensures you are neither underinsured nor paying for unnecessary extras.
            </p>
            <p>
              Taking the time to assess your risks and select appropriate coverage is an investment in your business’s long-term stability and success.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Invest in Peace of Mind Today</h3>
            <p>
              Commercial vehicle insurance is more than just a regulatory requirement or a line item in your budget—it is a strategic tool that protects your entire business. It safeguards your assets, supports compliance, strengthens client relationships, and enables sustainable growth.
            </p>
            <p>
              Don’t wait for an incident to reveal the gaps in your protection. Take proactive steps now to secure your fleet and ensure your business keeps moving forward with confidence.
            </p>
            <p>
              Let us help you find the perfect commercial vehicle insurance solution—tailored to your business, designed for resilience, and built to last.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                router.push("/services/insurance/commercial-vehicle-insurance")
              }
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all transform hover:scale-105"
            >
              Get Insurance Quote
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
