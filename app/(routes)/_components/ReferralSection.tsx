"use client";

import React, { useEffect, useState, useContext } from 'react';
import { Copy, Share2, Users, Gift, Sparkles, Star, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '../../../context/UserDetailContext';
import { usersTable } from '../../../config/schema';
import { motion, AnimatePresence } from 'framer-motion';

const ReferralSection = () => {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);
  const [copied, setCopied] = useState(false);
  const [referred, setReferred] = useState<typeof usersTable.$inferSelect[]>([]);

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
      <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-emerald-50 rounded-2xl w-full"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-emerald-50 rounded-2xl"></div>
            <div className="h-20 bg-emerald-50 rounded-2xl"></div>
            <div className="h-20 bg-emerald-50 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.05)] border border-emerald-100 p-5 sm:p-8"
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg shadow-emerald-200">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Referral Program</h3>
            <p className="text-sm font-medium text-emerald-600/70">Share the wealth, grow together</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Your Code', value: userDetail.referCode, icon: Users, color: 'emerald', type: 'code' },
          { label: 'Total Credits', value: referred.length, icon: Star, color: 'yellow', type: 'number' },
          { label: 'Referred By', value: userDetail.referrerCode || 'Direct', icon: Users, color: 'blue', type: 'text' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="relative group bg-slate-50 border border-slate-100 p-4 rounded-3xl overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <stat.icon className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</span>
              </div>
              {stat.type === 'code' ? (
                <code className="text-lg font-black text-emerald-700 block">{stat.value}</code>
              ) : (
                <div className={`text-2xl font-black ${stat.color === 'yellow' ? 'text-yellow-600' : 'text-slate-700'}`}>
                  {stat.value}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
              <stat.icon size={48} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referrals List */}
      <div className="mb-8 bg-slate-50/50 rounded-3xl p-5 border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-slate-700 flex items-center gap-2">
            Your Network <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">{referred.length}</span>
          </p>
        </div>
        <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar space-y-2">
          {referred && referred.length > 0 ? (
            referred.map((refUser, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={index} 
                className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-xs">
                  {refUser.name?.charAt(0)}
                </div>
                <p className="text-sm font-semibold text-slate-700">{refUser.name}</p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-400 text-sm italic">No referrals yet. Start sharing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Share Section */}
      <div className="relative group bg-emerald-900 rounded-[2rem] p-6 text-white overflow-hidden shadow-2xl shadow-emerald-200">
        {/* Animated Shimmer */}
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
        
        <h4 className="font-bold text-emerald-200 mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> Your Referral Link
        </h4>
        
        <div className="flex flex-col gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-sm font-mono truncate">
            {referralUrl}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex-1 bg-white text-emerald-900 px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
            >
              <Copy size={18} />
              {copied ? 'Success!' : 'Copy Link'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={shareReferral}
              className="bg-emerald-500 text-white p-3 rounded-2xl hover:bg-emerald-400 transition-colors shadow-lg"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <h4 className="font-black text-slate-800 mb-6 text-center uppercase tracking-widest text-xs">The Growth Loop</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Invite', desc: 'Send your link' },
            { step: '02', title: 'Join', desc: 'Friends sign up' },
            { step: '03', title: 'Earn', desc: 'Get VIP credits' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <span className="text-xs font-black">{item.step}</span>
              </div>
              <p className="font-bold text-slate-800 text-sm">{item.title}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralSection;