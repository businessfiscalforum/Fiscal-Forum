'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Dummy data for research reports
const RESEARCH_DATA = [
  {
    id: 1,
    title: "Global Market Trends 2024",
    description: "Comprehensive analysis of emerging market patterns and economic indicators.",
    date: "2024-03-15",
    category: "Market Analysis"
  },
  {
    id: 2,
    title: "AI in Financial Services",
    description: "Impact assessment of artificial intelligence on banking and investment sectors.",
    date: "2024-02-28",
    category: "Technology"
  },
  {
    id: 3,
    title: "Sustainable Energy Outlook",
    description: "Renewable energy adoption rates and future projections across industries.",
    date: "2024-01-10",
    category: "Environment"
  }
];

const ResearchReportsSection = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{text: string, type: string} | null>(null);

  // Initialize chart
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
              {
                label: 'Research Publications',
                data: [12, 19, 15, 17],
                backgroundColor: '#1976d2',
                borderColor: '#0d47a1',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              title: {
                display: true,
                text: 'Quarterly Research Output',
                color: '#0d47a1',
                font: {
                  size: 16,
                  weight: 'bold'
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#e3f2fd'
                },
                ticks: {
                  color: '#0d47a1'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  color: '#0d47a1'
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Handle email subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage({ text: 'Please enter your email address', type: 'error' });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulate API call

      const response = await fetch('/api/subscribe',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
      const data = await response.json();
      if (response.ok){
        setMessage({text:data.message, type:'success'});
        setEmail('');
      }
      else {
        setMessage({text:data.error || 'Subscription failed', type:'error'});
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage({ text: 'Subscription failed. Please sign-in to subscribe.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle button actions
  const handleButtonClick = (action: string) => {
    console.log(`${action} button clicked`);
    // Implement your navigation or action logic here
  };

  return (
    <section className="flex gap-8 max-w-6xl mx-auto my-20 p-4 md:p-8 bg-white border border-gray-300 shadow-md ">
      <div className="flex-3 py-10">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">Research Reports</h2>
          <p className="text-gray-600">Latest insights and findings from our research team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {RESEARCH_DATA.map((report) => (
            <div 
              key={report.id} 
              className="border border-gray-300 p-5 bg-gray-50 hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-md transition-all"
            >
              <div className="bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 inline-block mb-3 uppercase tracking-wide">
                {report.category}
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{report.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{report.description}</p>
              <div className="text-gray-500 text-xs font-medium">{report.date}</div>
            </div>
          ))}
        </div>

        {/* Responsive Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button 
            onClick={() => handleButtonClick('Get More Research')}
            className="px-4 py-3 bg-blue-50 text-blue-600 border border-blue-100 font-semibold text-sm md:text-base uppercase tracking-wide hover:bg-blue-100 transition-colors w-full sm:w-auto"
          >
            Get More Research
          </button>
          {/* <button 
            onClick={() => handleButtonClick('Newsletters')}
            className="px-4 py-3 bg-blue-50 text-blue-600 border border-blue-100 font-semibold text-sm md:text-base uppercase tracking-wide hover:bg-blue-100 transition-colors w-full sm:w-auto"
          >
            Newsletters
          </button>
          <button 
            onClick={() => handleButtonClick('Updates')}
            className="px-4 py-3 bg-blue-50 text-blue-600 border border-blue-100 font-semibold text-sm md:text-base uppercase tracking-wide hover:bg-blue-100 transition-colors w-full sm:w-auto"
          >
            Updates
          </button>
          <button 
            onClick={() => handleButtonClick('Subscribe Now')}
            className="px-4 py-3 bg-blue-600 text-white font-semibold text-sm md:text-base uppercase tracking-wide hover:bg-blue-900 transition-colors w-full sm:w-auto"
          >
            Subscribe Now
          </button> */}
        </div>

        {/* Subscribe Section */}
        <div className="mb-8">
          <h3 className="text-xl text-blue-900 mb-4">Stay Updated</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 border border-gray-300 bg-gray-50 text-sm"
              disabled={isSubmitting}
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white font-semibold uppercase tracking-wide hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <div className={`mt-3 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>

      <aside className="hidden lg:flex flex-1 flex-col gap-6">
        <div className="h-80 bg-gray-50 border border-gray-300 p-5">
          <canvas ref={chartRef}></canvas>
        </div>
        <div className="bg-gray-50 border border-gray-300 p-5">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Research Metrics</h3>
          <ul className="space-y-3">
            <li className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-600 text-sm">Published Reports:</span>
              <span className="text-blue-900 font-semibold text-sm">127</span>
            </li>
            <li className="flex justify-between pb-2 border-b border-gray-200">
              <span className="text-gray-600 text-sm">Active Subscribers:</span>
              <span className="text-blue-900 font-semibold text-sm">5,842</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 text-sm">Research Team:</span>
              <span className="text-blue-900 font-semibold text-sm">24</span>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default ResearchReportsSection;