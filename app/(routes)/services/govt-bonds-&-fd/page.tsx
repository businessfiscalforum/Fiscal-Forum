// pages/government-bonds-funds.tsx
import Head from "next/head";

export default function GovernmentBondsFunds() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Government Bonds & Funds - Coming Soon</title>
        <meta name="description" content="Secure investment opportunities in government securities and mutual funds coming soon" />
      </Head>

      <div className="max-w-2xl w-full text-center bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg 
              className="w-10 h-10 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
          Government Bonds & Funds
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-2">
          Secure Investment Opportunities
        </p>
        
        {/* Coming Soon Badge */}
        <div className="inline-flex items-center justify-center bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-8">
          <svg 
            className="w-4 h-4 mr-2 animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
              clipRule="evenodd"
            />
          </svg>
          Coming Soon
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We&apos;re crafting the best investment solutions in government bonds and funds. 
          Stay tuned for expert-curated portfolios with guaranteed returns and minimal risk.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { title: "Guaranteed Returns", icon: "🛡️" },
            { title: "Low Risk", icon: "📉" },
            { title: "Expert Curation", icon: "👨‍💼" }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="font-medium text-gray-800">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}