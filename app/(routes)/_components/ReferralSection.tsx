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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Gift className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Referral Program</h3>
            <p className="text-sm text-gray-600">Earn credits by referring friends</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Referral Code */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Your Referral Code</span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="text-lg font-mono font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded">
              {userDetail.referCode}
            </code>
          </div>
        </div>

        {/* Referral Credits */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Gift className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Total Credits</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {referred.length}
          </div>
          <p className="text-xs text-gray-500">Credits earned</p>
        </div>

        {/* Referrer Code (if any) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Referred By</span>
          </div>
          <div className="text-lg font-mono text-gray-700">
            {userDetail.referrerCode ? (
              <span className="text-blue-600">{userDetail.referrerCode}</span>
            ) : (
              <span className="text-gray-400">Not referred</span>
            )}
          </div>
        </div>
      </div>

      <div className='p-4'>
        <p className='font-bold text-xl'>Your referrals:</p>
        <div className='pl-5 p-2'>
          {referred && referred.map((refUser, index) => (
            <div>
              <p>{refUser.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Share Your Referral Link</h4>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            value={referralUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-blue-200 rounded-lg bg-white text-sm text-gray-700"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={shareReferral}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">How it works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <span>Share your referral link with friends</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <span>They sign up using your referral code</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
            <span>Earn credits for each successful referral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection; 