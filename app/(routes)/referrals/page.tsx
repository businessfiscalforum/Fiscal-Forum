"use client";

import React from 'react';
import ReferralSection from '../_components/ReferralSection';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function ReferralsPage() {
  const { isSignedIn, isLoaded } = useUser();

  if (isLoaded && !isSignedIn) {
    redirect('/sign-in');
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Referral Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Invite your friends to join Fiscal Forum and earn credits for each successful referral. 
            Share your unique referral code and start building your network today!
          </p>
        </div>

        {/* Referral Section */}
        <ReferralSection />

        {/* Additional Referral Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Referral Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Earn Credits</h4>
                  <p className="text-gray-600 text-sm">Get 10 credits for each successful referral</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Build Network</h4>
                  <p className="text-gray-600 text-sm">Connect with like-minded financial enthusiasts</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-sm font-bold text-green-600">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Exclusive Rewards</h4>
                  <p className="text-gray-600 text-sm">Unlock special benefits as you earn more credits</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Share Your Code</h4>
                  <p className="text-gray-600 text-sm">Copy and share your unique referral code with friends and family</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">They Sign Up</h4>
                  <p className="text-gray-600 text-sm">Your friends use your referral code when creating their account</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Earn Credits</h4>
                  <p className="text-gray-600 text-sm">Receive 10 credits for each successful referral</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What are referral credits used for?</h4>
              <p className="text-gray-600">Referral credits can be used for premium features, exclusive content, and special rewards within the platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How many credits do I earn per referral?</h4>
              <p className="text-gray-600">You earn 10 credits for each successful referral who signs up using your referral code.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I use someone else's referral code?</h4>
              <p className="text-gray-600">Yes! When signing up, you can enter a friend's referral code to help them earn credits.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Is there a limit to how many referrals I can make?</h4>
              <p className="text-gray-600">No, there's no limit! You can refer as many people as you want and earn credits for each one.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 