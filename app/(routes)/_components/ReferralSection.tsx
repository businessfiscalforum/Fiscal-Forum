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
      className="relative overflow-hidden bg-white rounded-[2rem] border-2 border-black shadow-[4px_4px_0px_#000] p-5 sm:p-8"
    >
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-yellow-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="p-3 bg-emerald-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
              <Gift className="h-6 w-6 text-black animate-bounce" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="h-4 w-4 text-yellow-600 fill-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-xl font-black text-black tracking-tight uppercase">Referral Program</h3>
            <p className="text-sm font-bold text-emerald-800/80">Share the wealth, grow together</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Your Code', value: userDetail.referCode, icon: Users, color: 'emerald', type: 'code', bg: 'bg-emerald-50' },
          { label: 'Total Credits', value: referred.length, icon: Star, color: 'yellow', type: 'number', bg: 'bg-yellow-50' },
          { label: 'Referred By', value: userDetail.referrerCode || 'Direct', icon: Users, color: 'blue', type: 'text', bg: 'bg-blue-50' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            className={`relative group ${stat.bg} border-2 border-black p-4 rounded-2xl shadow-[3px_3px_0px_#000] overflow-hidden`}
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <stat.icon className="h-4 w-4 text-black/60" />
                <span className="text-xs font-bold uppercase tracking-wider text-black/70">{stat.label}</span>
              </div>
              {stat.type === 'code' ? (
                <code className="text-lg font-black text-emerald-800 block">{stat.value}</code>
              ) : (
                <div className={`text-2xl font-black text-black`}>
                  {stat.value}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} className="text-black" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Referrals List */}
      <div className="mb-8 bg-gray-50 rounded-2xl p-5 border-2 border-black shadow-[2px_2px_0px_#000]">
        <div className="flex items-center justify-between mb-4">
          <p className="font-black uppercase text-black flex items-center gap-2 text-sm">
            Your Network <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">{referred.length}</span>
          </p>
        </div>
        <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar space-y-2">
          {referred && referred.length > 0 ? (
            referred.map((refUser, index) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={index} 
                className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-black hover:shadow-[2px_2px_0px_#000] transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-black flex items-center justify-center text-black font-bold text-xs">
                  {refUser.name?.charAt(0)}
                </div>
                <p className="text-sm font-bold text-black">{refUser.name}</p>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 text-sm font-medium italic">No referrals yet. Start sharing!</p>
            </div>
          )}
        </div>
      </div>

      {/* Share Section */}
      <div className="relative group bg-[#1FA463] border-2 border-black rounded-2xl p-6 text-black overflow-hidden shadow-[4px_4px_0px_#000]">
        <h4 className="font-black text-black mb-4 flex items-center gap-2 uppercase tracking-wide">
          <Sparkles className="h-4 w-4 text-yellow-300 fill-yellow-300" /> Your Referral Link
        </h4>
        
        <div className="flex flex-col gap-4">
          <div className="bg-white border-2 border-black rounded-xl px-4 py-3 text-sm font-mono truncate text-black shadow-[2px_2px_0px_#000]">
            {referralUrl}
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="flex-1 bg-white text-black border-2 border-black px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000] active:translate-y-[2px] transition-all"
            >
              <Copy size={18} />
              {copied ? 'Success!' : 'Copy Link'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={shareReferral}
              className="bg-white text-black border-2 border-black p-3 rounded-xl hover:bg-yellow-100 hover:shadow-[2px_2px_0px_#000] transition-all"
            >
              <Share2 size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 pt-8 border-t-2 border-black/10">
        <h4 className="font-black text-black mb-6 text-center uppercase tracking-widest text-xs">The Growth Loop</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Invite', desc: 'Send your link' },
            { step: '02', title: 'Join', desc: 'Friends sign up' },
            { step: '03', title: 'Earn', desc: 'Get VIP credits' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 border-2 border-black flex items-center justify-center mb-3 group-hover:bg-[#1FA463] group-hover:text-black transition-all duration-300 shadow-[2px_2px_0px_#000]">
                <span className="text-xs font-black text-black">{item.step}</span>
              </div>
              <p className="font-bold text-black text-sm">{item.title}</p>
              <p className="text-xs text-gray-600 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ReferralSection;