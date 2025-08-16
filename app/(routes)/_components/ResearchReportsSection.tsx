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
  Legend,
} from 'chart.js';
import { useRouter } from 'next/navigation';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Dummy data for research reports
const RESEARCH_DATA = [
  {
    id: 1,
    title: "Global Market Trends 2024",
    description: "Comprehensive analysis of emerging market patterns and economic indicators.",
    date: "2024-03-15",
    category: "Market Analysis",
  },
  {
    id: 2,
    title: "AI in Financial Services",
    description: "Impact assessment of artificial intelligence on banking and investment sectors.",
    date: "2024-02-28",
    category: "Technology",
  },
  {
    id: 3,
    title: "Sustainable Energy Outlook",
    description: "Renewable energy adoption rates and future projections across industries.",
    date: "2024-01-10",
    category: "Environment",
  },
];

const ResearchReportsSection = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  // Initialize chart with emerald-teal theme
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
                backgroundColor: '#047857', // emerald-600
                borderColor: '#065f46', // emerald-700
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'Quarterly Research Output',
                color: '#065f46',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: '#d1fae5', // emerald-100
                  tickColor: '#d1fae5',
                },
                ticks: {
                  color: '#065f46',
                  stepSize: 5,
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#065f46',
                },
              },
            },
          },
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({ text: data.message || 'Successfully subscribed!', type: 'success' });
        setEmail('');
      } else {
        setMessage({ text: data.error || 'Subscription failed', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Subscription failed. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-16 px-6 md:px-10 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"
      style={{
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto p-6 md:p-10 bg-white border border-emerald-200 shadow-lg rounded-2xl">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-emerald-900 mb-2 flex items-center gap-2"
              style={{ textAlign: 'left' }}
            >
              Research Reports
            </h2>
            <p
              className="text-gray-600"
              style={{ textAlign: 'left' }}
            >
              Latest insights and findings from our expert research team
            </p>
          </div>

          {/* Research Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {RESEARCH_DATA.map((report) => (
              <div
                key={report.id}
                className="border border-emerald-200 p-5 bg-emerald-50 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl"
                style={{ textAlign: 'left' }}
              >
                <div className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 inline-block mb-3 uppercase tracking-wide rounded-full">
                  {report.category}
                </div>
                <h3 className="text-lg font-semibold text-emerald-900 mb-3 leading-tight">
                  {report.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {report.description}
                </p>
                <div className="text-emerald-700 text-xs font-medium">
                  {report.date}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => router.push('/reports')}
              className="px-5 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300 font-semibold text-sm md:text-base uppercase tracking-wide transition-colors rounded-full flex-1 sm:flex-none"
            >
              View All Reports
            </button>
          </div>

          {/* Subscribe Section */}
          <div className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl shadow-md border border-emerald-100">
            <h3
              className="text-2xl font-bold text-emerald-900 mb-3 flex items-center gap-2"
              style={{ textAlign: 'left' }}
            >
              Stay Connected With Us
            </h3>

            <p
              className="text-lg text-emerald-800 leading-relaxed mb-6"
              style={{ textAlign: 'left' }}
            >
              Subscribe to our newsletter for exclusive financial tips, market insights, and special offers tailored just for you.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 border border-emerald-300 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm transition-colors"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold uppercase tracking-wide rounded-full transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 text-sm font-medium px-4 py-2 rounded-lg ${
                  message.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}
                style={{ textAlign: 'left' }}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-1 flex-col gap-6">
          <div className="h-80 bg-white border border-emerald-200 p-5 rounded-xl shadow-sm">
            <canvas ref={chartRef}></canvas>
          </div>

          <div className="bg-white border border-emerald-200 p-6 rounded-xl shadow-sm">
            <h3
              className="text-lg font-semibold text-emerald-900 mb-5 flex items-center gap-2"
              style={{ textAlign: 'left' }}
            >
              Research Metrics
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between pb-3 border-b border-emerald-100">
                <span className="text-gray-600 text-sm">Published Reports:</span>
                <span className="text-emerald-900 font-bold text-sm">127</span>
              </li>
              <li className="flex justify-between pb-3 border-b border-emerald-100">
                <span className="text-gray-600 text-sm">Active Subscribers:</span>
                <span className="text-emerald-900 font-bold text-sm">5,842</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600 text-sm">Research Team:</span>
                <span className="text-emerald-900 font-bold text-sm">24 Experts</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ResearchReportsSection;