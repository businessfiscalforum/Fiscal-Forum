"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

export default function LifeInsurancePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 pt-30 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
            Life Insurance
          </h1>
          <div className="w-16"></div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-emerald-200 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
              <FaHeart className="text-emerald-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Security for What Matters Most
              </h2>
              <p className="text-emerald-600">
                Financial protection and peace of mind for your loved ones
              </p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed space-y-5">
            <p>
              Life is uncertain. We never know when our journey might take an unexpected turn. While we can’t control the future, we can prepare for it—with love, foresight, and care. Life insurance is more than a financial product; it’s a heartfelt commitment to those who matter most. It ensures that even if you’re no longer there, your family will be supported, protected, and able to continue living with dignity and hope.
            </p>

            <p>
              In the face of unforeseen circumstances, life insurance becomes a lifeline—a source of strength and stability during one of life’s most difficult moments. It provides financial security to your loved ones, helping them manage daily expenses, honor commitments, and maintain their quality of life. It’s not just about replacing income—it’s about preserving the future you’ve worked so hard to build together.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Protecting Your Family’s Future
            </h3>
            <p className="italic">
              When you choose life insurance, you’re choosing to shield your family from the sudden weight of financial hardship. A loss can leave behind a void—not only emotionally but also economically. Outstanding loans, mortgage payments, children’s education, medical bills, and everyday living costs can quickly become overwhelming without a steady income. Life insurance helps bridge that gap, ensuring your family doesn’t have to make painful choices between paying bills and honoring memories.
            </p>

            <p className="italic">
              More than just covering immediate needs, life insurance safeguards long-term dreams. It allows your children to pursue higher education without burdening themselves with debt. It enables your spouse to remain financially independent, whether they choose to work, care for the home, or start a new chapter. It supports your parents, if needed, and helps preserve the lifestyle your family has grown accustomed to.
            </p>

            <p className="italic">
              By securing your family’s financial future, you give them the freedom to grieve without fear, to heal without stress, and to move forward with confidence. You provide them with a foundation where dreams can still grow, even in your absence. That is the true power of life insurance: it turns uncertainty into assurance.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              Building Long-Term Security
            </h3>
            <p className="italic">
              Beyond its protective role, life insurance can also serve as a powerful tool for long-term planning and wealth creation. Certain policies offer flexible options that allow you to accumulate savings, build assets, and create a lasting financial legacy. These plans can be structured to support important milestones—such as a child’s wedding, a major home purchase, or retirement—and can grow over time, offering both protection and potential returns.
            </p>

            <p className="italic">
              For many, life insurance becomes a way to plan for the future while caring for the present. It can help fund retirement goals, supplement pension income, or provide a tax-efficient inheritance for your heirs. Some policies even include riders for critical illness or disability, adding layers of coverage that extend beyond death benefits.
            </p>

            <p className="italic">
              This dual purpose makes life insurance not just a safety net, but a strategic investment in your family’s well-being. It’s a way to say, “I may not be here forever, but I want you to have everything you need.” It transforms a simple policy into a lasting expression of love and responsibility.
            </p>

            <h3 className="text-xl font-semibold text-emerald-800">
              An Act of Love and Responsibility
            </h3>
            <p className="italic">
              Choosing life insurance is deeply personal. It’s a decision rooted in care, compassion, and a desire to protect those you hold dear. It reflects your understanding that your presence is not only emotional but also financial—a vital part of your family’s stability. By taking this step, you are showing your loved ones that you are thinking of them, even in the hardest-to-imagine scenarios.
            </p>

            <p className="italic">
              It gives you peace of mind today, knowing that your family is cared for no matter what happens. And it gives them strength for tomorrow—knowing they are not alone, that someone has thought ahead, and that their future is secure.
            </p>

            <p className="italic">
              In a world full of unknowns, life insurance is your way of saying, “I love you enough to plan for your future—even when I’m not there to walk beside you.”
            </p>

            <blockquote className="border-l-4 border-emerald-600 pl-4 italic text-emerald-800 text-lg font-medium">
              “Let us help you build a legacy of care, security, and enduring love—for your family, today and always.”
            </blockquote>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/services/insurance/life-insurance")}
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
