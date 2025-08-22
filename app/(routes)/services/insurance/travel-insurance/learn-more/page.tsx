"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaGlobeAmericas } from "react-icons/fa";

export default function TravelInsurancePage() {
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
            Travel Insurance
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
              <FaGlobeAmericas className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Travel Protected</h2>
              <p className="text-emerald-600">
                Coverage that travels with you, wherever you go
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Every journey is an adventure—a chance to explore new cultures, discover breathtaking 
              landscapes, and create lasting memories. Yet, even the most carefully planned trips 
              can be disrupted by unexpected events. Lost luggage, delayed flights, sudden medical 
              emergencies, or last-minute cancellations can turn excitement into stress and joy 
              into frustration. Travel insurance is your trusted companion on every trip, offering 
              reliable protection that moves seamlessly with you across borders and time zones. 
              With comprehensive coverage in place, you can leave behind the worries and focus 
              entirely on the experience.
            </p>

            <p>
              Whether you&apos;re embarking on a weekend getaway, a long-term work assignment, or a 
              semester abroad, travel insurance ensures that you’re safeguarded from the moment 
              you step out the door until you return home safely. It’s more than just a policy—it’s 
              peace of mind that allows you to embrace the journey with confidence, knowing that 
              help is always within reach when you need it most.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Peace of Mind on Every Trip</h3>
            <p className="italic">
              Traveling for leisure, business, or education comes with unique challenges, and each 
              situation demands dependable support. Comprehensive travel insurance provides 
              continuous protection throughout your journey, covering a wide range of potential 
              disruptions. From unexpected medical issues that require treatment abroad to emergency 
              evacuations due to serious illness or injury, the coverage ensures access to timely care, 
              no matter where you are in the world.
            </p>

            <p className="italic">
              When flight delays or cancellations disrupt your schedule, travel insurance helps 
              cover additional expenses such as accommodations, meals, and rebooking fees. If your 
              luggage goes missing or gets damaged during transit, the policy offers reimbursement 
              so you can continue your trip without being left stranded. For those traveling 
              internationally, the insurance also includes support for trip interruptions, missed 
              connections, and even natural disasters or civil unrest that may affect your itinerary.
            </p>

            <p className="italic">
              With global assistance services at your disposal, you’re never alone when challenges 
              arise. A dedicated team of professionals is available 24/7 to guide you through every 
              situation—from finding a local doctor to helping you navigate foreign healthcare 
              systems or coordinating emergency transportation. This constant availability means 
              you can travel with the assurance that help is just a call away, no matter how far 
              you roam.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">Smooth and Reliable Support</h3>
            <p className="italic">
              The best travel insurance isn’t just about what it covers—it’s about how quickly and 
              efficiently it delivers support when you need it. Our policies are built around 
              simplicity, transparency, and speed. Claims are processed swiftly and with minimal 
              hassle, ensuring that disruptions to your trip are kept to a minimum. Whether you&apos;re 
              dealing with a minor inconvenience like a lost passport or facing a major emergency 
              such as a hospitalization, our team is ready to assist you every step of the way.
            </p>

            <p className="italic">
              We understand that travel should be about discovery, connection, and enjoyment—not 
              managing risks or navigating complex paperwork. That’s why we’ve streamlined every 
              aspect of the experience: from easy online policy management to fast claim approvals 
              and clear communication throughout the process. You’ll have a dependable partner who 
              listens, responds, and acts with urgency and care.
            </p>

            <p className="italic">
              This reliability empowers you to make the most of your travels. You can book that 
              spontaneous excursion, try that new cuisine, or hike that remote trail—knowing that if 
              anything happens, you’re covered. You’re not just protected; you’re free.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Travel Without Worries, Live with Confidence
            </h3>
            <p className="italic">
              At its heart, travel is about creating memories—moments shared with loved ones, 
              personal growth through new experiences, and the joy of stepping outside your comfort 
              zone. But these moments can easily be overshadowed by fear of the unknown. With the 
              right travel insurance, you remove that fear. You gain the freedom to explore new 
              places, meet new people, and embrace life’s adventures—all with the confidence that 
              you’re fully protected every step of the way.
            </p>

            <p className="italic">
              You don’t have to choose between safety and spontaneity. With comprehensive coverage, 
              you can plan boldly, travel freely, and return home with stories—and not stress.
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              “Let us be your trusted travel partner—wherever your next adventure takes you.”
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                router.push("/services/insurance/travel-insurance")
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
