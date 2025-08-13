'use client';

import React, { useState } from 'react';

const LoanApplicationForm = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home Loan' },
    { id: 'property', label: 'Loan Against Property' },
    { id: 'personal', label: 'Personal Loan' },
    { id: 'business', label: 'Business Loan' },
    { id: 'gold', label: 'Gold Loan' },
    { id: 'car', label: 'Car Loan' },
    { id: 'education', label: 'Education Loan' },
    { id: 'securities', label: 'Loan Against Securities' }
  ];

  const renderPersonalDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
        APPLICANT DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father&apos;s Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PAN</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input type="radio" name="marital" value="married" className="mr-1" />
              Married
            </label>
            <label className="flex items-center">
              <input type="radio" name="marital" value="unmarried" className="mr-1" />
              Unmarried
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="flex items-center">
              <input type="radio" name="sex" value="male" className="mr-1" />
              Male
            </label>
            <label className="flex items-center">
              <input type="radio" name="sex" value="female" className="mr-1" />
              Female
            </label>
            <label className="flex items-center">
              <input type="radio" name="sex" value="others" className="mr-1" />
              Others
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No</label>
          <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Id</label>
          <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderAddressDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
        CURRENT ADDRESS DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Address 1</label>
          <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Address 2</label>
          <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Residence Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Rented</option>
            <option>Owned</option>
            <option>Company Provided</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="permanentSame" className="mr-2" />
        <label htmlFor="permanentSame" className="text-sm text-gray-700">PERMANENT ADDRESS SAME AS CURRENT ADDRESS</label>
      </div>
    </div>
  );

  const renderEmploymentDetails = (showDetailed = true) => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
        EMPLOYMENT DETAILS/COMPANY / SELF EMPLOYED
      </h3>
      <div className="flex items-center space-x-6 mb-4">
        <label className="flex items-center">
          <input type="radio" name="employmentType" value="employed" className="mr-2" />
          EMPLOYMENT DETAILS/SALARY
        </label>
        <label className="flex items-center">
          <input type="radio" name="employmentType" value="selfEmployed" className="mr-2" />
          EMPLOYMENT DETAILS/SELF EMPLOYED
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Salary</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        {showDetailed && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address 1</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address 2</label>
              <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current job stability</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>In Months</option>
                <option>Less than 6 months</option>
                <option>6-12 months</option>
                <option>1-2 years</option>
                <option>2+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total job stability</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>In Months</option>
                <option>Less than 1 year</option>
                <option>1-3 years</option>
                <option>3-5 years</option>
                <option>5+ years</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );

  const renderLoanAmountSection = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        LOAN AMOUNT REQUIRED
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount Required</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderPropertyDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        PROPERTY DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Agreement Value</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount Required</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Address Line 1</label>
          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Property Address Line 2</label>
          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderExistingObligations = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">5</span>
        EXISTING OBLIGATIONS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No. of Current Loans</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select No. Of Loan</option>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAdditionalDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">6</span>
        ADDITIONAL DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Builder&apos;s name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Residence since</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>In Years</option>
            <option>Less than 1 year</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderReferences = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">7</span>
        REFERENCE 1
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
          <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">8</span>
        REFERENCE 2
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
          <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderVehicleDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        CAR DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>New Car</option>
            <option>Used Car</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Ex: Brand</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>Personal</option>
            <option>Commercial</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderCourseDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        COURSE DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderGoldLoanDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        GOLD LOAN DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gold Weight (grams)</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gold Purity (Karat)</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>24K</option>
            <option>22K</option>
            <option>18K</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritiesDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        SECURITIES DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>Shares</option>
            <option>Mutual Funds</option>
            <option>Bonds</option>
            <option>Fixed Deposits</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Value</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Required Loan Amount</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="bg-red-50 border border-red-200 p-4 mb-6">
      <h3 className="text-red-700 font-semibold mb-4 flex items-center">
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
        BUSINESS DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>Proprietorship</option>
            <option>Partnership</option>
            <option>Private Limited</option>
            <option>Public Limited</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>SELECT</option>
            <option>Less than 1 year</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Turnover</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Profit</label>
          <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
          <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    const commonSections = [
       <React.Fragment key="personal">{renderPersonalDetails()}</React.Fragment>,
    <React.Fragment key="address">{renderAddressDetails()}</React.Fragment>,
    <React.Fragment key="employment">{renderEmploymentDetails()}</React.Fragment>,
    <React.Fragment key="obligations">{renderExistingObligations()}</React.Fragment>
    ];

    switch (activeTab) {
      case 'home':
        return (
          <div>
            {commonSections}
            {renderPropertyDetails()}
            {renderAdditionalDetails()}
            {renderReferences()}
          </div>
        );
        
      case 'property':
        return (
          <div>
            {commonSections}
            {renderPropertyDetails()}
            {renderReferences()}
          </div>
        );
        
      case 'personal':
        return (
          <div>
            {commonSections}
            {renderLoanAmountSection()}
            {renderReferences()}
          </div>
        );
        
      case 'business':
        return (
          <div>
            {renderPersonalDetails()}
            {renderAddressDetails()}
            {renderEmploymentDetails(false)}
            {renderBusinessDetails()}
            {renderLoanAmountSection()}
            {renderExistingObligations()}
            {renderReferences()}
          </div>
        );
        
      case 'gold':
        return (
          <div>
            {commonSections}
            {renderGoldLoanDetails()}
            {renderReferences()}
          </div>
        );
        
      case 'car':
        return (
          <div>
            {commonSections}
            {renderVehicleDetails()}
            {renderLoanAmountSection()}
            {renderReferences()}
          </div>
        );
        
      case 'education':
        return (
          <div>
            {commonSections}
            {renderCourseDetails()}
            {renderLoanAmountSection()}
            {renderReferences()}
          </div>
        );
        
      case 'securities':
        return (
          <div>
            {commonSections}
            {renderSecuritiesDetails()}
            {renderReferences()}
          </div>
        );
        
      default:
        return commonSections;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Loan Application Form</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <form className="space-y-6">
          {renderTabContent()}
          
          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationForm