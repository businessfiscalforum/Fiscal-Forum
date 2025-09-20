"use client";

import React, { useEffect, useState } from 'react';
import { Copy, Share2, Users, Gift } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useContext } from 'react';
import { UserDetailContext } from '../../../context/UserDetailContext';
import { usersTable } from '../../../config/schema';

const ReferralSection = () => {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const [copied, setCopied] = useState(false);

  const referralUrl = `${process.env.NEXT_PUBLIC_API_URL}/sign-up?ref=${userDetail?.referCode || ''}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Fiscal Forum',
          text: `Use my referral code ${userDetail?.referCode} to get started!`,
          url: referralUrl,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      copyToClipboard();
    }
  };

  const [referred, setReferred] = useState<typeof usersTable.$inferSelect[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      if (!userDetail?.referCode) return;
      const res = await fetch(`/api/referrals?referCode=${userDetail.referCode}`);
      const users = await res.json();
      setReferred(users);
    };
    fetchUsers();
  }, [userDetail]);

  if (!userDetail) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Referral Program</h3>
          <p className="text-xs sm:text-sm text-gray-600">Earn credits by referring friends</p>
        </div>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {/* Referral Code */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-1.5">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">Your Code</span>
          </div>
          <code className="text-base sm:text-lg font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 sm:px-3 sm:py-2 rounded">
            {userDetail.referCode}
          </code>
        </div>

        {/* Referral Credits */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-1.5">
            <Gift className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">Credits</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-green-600">
            {referred.length}
          </div>
        </div>

        {/* Referred By */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <div className="flex items-center space-x-2 mb-1.5">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">Referred By</span>
          </div>
          <div className="text-base sm:text-lg font-mono text-gray-700">
            {userDetail.referrerCode ? (
              <span className="text-blue-600 truncate">{userDetail.referrerCode}</span>
            ) : (
              <span className="text-gray-400 text-xs sm:text-sm">None</span>
            )}
          </div>
        </div>
      </div>

      {/* Referrals List */}
      <div className="mb-6">
        <p className="font-semibold text-base sm:text-lg mb-2">Your referrals:</p>
        <div className="max-h-32 overflow-y-auto pl-2 border-l-2 border-blue-200">
          {referred && referred.length > 0 ? (
            referred.map((refUser, index) => (
              <p key={index} className="py-1 text-sm sm:text-base text-gray-700 truncate">
                {refUser.name}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-1">No referrals yet</p>
          )}
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
        <h4 className="font-medium text-blue-900 mb-2 text-sm sm:text-base">Share Your Link</h4>
        <div className="flex flex-col space-y-2 mb-3">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 border border-blue-200 rounded-lg bg-white text-xs sm:text-sm text-gray-700 truncate"
          />
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1.5"
            >
              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={shareReferral}
              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* How it works - Collapsed for small screens */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">How it works</h4>
        <div className="space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-blue-600">1</span>
            </div>
            <span>Share your referral link with friends</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-blue-600">2</span>
            </div>
            <span>They sign up using your referral code</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-blue-600">3</span>
            </div>
            <span>Earn credits for each successful referral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;