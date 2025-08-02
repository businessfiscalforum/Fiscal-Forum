"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Phone, Mail, Calendar, MoreHorizontal, Search, Filter } from 'lucide-react';

const FinancialCRMDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

  // Sample data for different financial services
  const revenueData = [
    { month: 'Jan', loans: 120000, insurance: 85000, savings: 45000, stocks: 95000, mutualFunds: 65000, creditCards: 75000, govBonds: 35000 },
    { month: 'Feb', loans: 135000, insurance: 92000, savings: 52000, stocks: 88000, mutualFunds: 71000, creditCards: 82000, govBonds: 38000 },
    { month: 'Mar', loans: 128000, insurance: 98000, savings: 48000, stocks: 102000, mutualFunds: 68000, creditCards: 78000, govBonds: 42000 },
    { month: 'Apr', loans: 142000, insurance: 105000, savings: 55000, stocks: 112000, mutualFunds: 78000, creditCards: 85000, govBonds: 45000 },
    { month: 'May', loans: 158000, insurance: 115000, savings: 62000, stocks: 125000, mutualFunds: 85000, creditCards: 92000, govBonds: 52000 },
    { month: 'Jun', loans: 165000, insurance: 122000, savings: 68000, stocks: 138000, mutualFunds: 92000, creditCards: 98000, govBonds: 58000 }
  ];

  const serviceDistribution = [
    { name: 'Loans', value: 35, count: 2240, color: '#4F46E5' },
    { name: 'Insurance', value: 22, count: 1408, color: '#06B6D4' },
    { name: 'Stock Investment', value: 18, count: 1152, color: '#10B981' },
    { name: 'Credit Cards', value: 12, count: 768, color: '#F59E0B' },
    { name: 'Mutual Funds', value: 8, count: 512, color: '#EF4444' },
    { name: 'Savings Accounts', value: 3, count: 192, color: '#8B5CF6' },
    { name: 'Govt Bonds', value: 2, count: 128, color: '#EC4899' }
  ];

  const leadsByService = [
    { service: 'Loans', hot: 45, warm: 82, cold: 123 },
    { service: 'Insurance', hot: 32, warm: 67, cold: 98 },
    { service: 'Stocks', hot: 28, warm: 54, cold: 87 },
    { service: 'Credit Cards', hot: 38, warm: 72, cold: 105 },
    { service: 'Mutual Funds', hot: 22, warm: 43, cold: 65 },
    { service: 'Savings', hot: 15, warm: 28, cold: 42 },
    { service: 'Govt Bonds', hot: 8, warm: 15, cold: 23 }
  ];

  const recentClients = [
    { id: 'CL001', name: 'Sarah Johnson', email: 'sarah.j@email.com', service: 'Home Loan', value: '$285,000', status: 'Active', date: '2024-07-28' },
    { id: 'CL002', name: 'Michael Chen', email: 'michael.chen@email.com', service: 'Life Insurance', value: '$150,000', status: 'Pending', date: '2024-07-27' },
    { id: 'CL003', name: 'Emma Davis', email: 'emma.davis@email.com', service: 'Stock Portfolio', value: '$75,000', status: 'Active', date: '2024-07-26' },
    { id: 'CL004', name: 'Robert Wilson', email: 'robert.w@email.com', service: 'Credit Card', value: '$25,000', status: 'Complete', date: '2024-07-25' },
    { id: 'CL005', name: 'Lisa Garcia', email: 'lisa.garcia@email.com', service: 'Mutual Fund', value: '$45,000', status: 'Active', date: '2024-07-24' }
  ];

  const upcomingTasks = [
    { time: '09:30 AM', task: 'Loan Application Review', client: 'David Miller - Personal Loan Application', type: 'review' },
    { time: '11:00 AM', task: 'Insurance Consultation', client: 'Jennifer Brown - Life Insurance Policy', type: 'consultation' },
    { time: '02:15 PM', task: 'Investment Planning', client: 'Thomas Anderson - Portfolio Review', type: 'planning' },
    { time: '03:45 PM', task: 'Credit Assessment', client: 'Maria Rodriguez - Credit Card Application', type: 'assessment' },
    { time: '04:30 PM', task: 'Savings Account Setup', client: 'James Wilson - High Yield Savings', type: 'setup' }
  ];

  const kpiCards = [
    { title: 'Total Revenue', value: '$2,847,500', change: '+12.5%', icon: DollarSign, trend: 'up', color: 'bg-blue-500' },
    { title: 'Active Clients', value: '6,400', change: '+8.3%', icon: Users, trend: 'up', color: 'bg-green-500' },
    { title: 'Conversion Rate', value: '24.8%', change: '+2.1%', icon: Target, trend: 'up', color: 'bg-purple-500' },
    { title: 'Average Deal Size', value: '$89,250', change: '-1.2%', icon: TrendingUp, trend: 'down', color: 'bg-orange-500' }
  ];


  return (
    <div className="min-h-screen bg-gray-50 p-6 py-30">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Financial Services CRM</h1>
            <p className="text-gray-600 mt-1">Track performance across all financial service offerings</p>
          </div>
          <div className="flex space-x-3">
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annually</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <kpi.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Chart and Service Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Service */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Service</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">Monthly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Quarterly</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="loans" stackId="1" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.8} />
                <Area type="monotone" dataKey="insurance" stackId="1" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.8} />
                <Area type="monotone" dataKey="stocks" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
                <Area type="monotone" dataKey="creditCards" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Service Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Client Distribution by Service</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {serviceDistribution.map((service, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: service.color }}></div>
                  <span className="text-sm text-gray-600">{service.name}: {service.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Pipeline and Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads by Service */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Pipeline by Service</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadsByService} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="service" stroke="#666" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="hot" stackId="a" fill="#EF4444" name="Hot Leads" />
                <Bar dataKey="warm" stackId="a" fill="#F59E0B" name="Warm Leads" />
                <Bar dataKey="cold" stackId="a" fill="#6B7280" name="Cold Leads" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Todays Schedule</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-700">{task.time.split(' ')[0]}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{task.task}</h4>
                    <p className="text-sm text-gray-600 mt-1">{task.client}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Clients Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Client ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Service</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentClients.map((client, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-600">{client.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">{client.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900">{client.service}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{client.value}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        client.status === 'Active' ? 'bg-green-100 text-green-800' :
                        client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{client.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCRMDashboard;