// app/sign-up/page.tsx
"use client";

import { SignUp } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  useEffect(() => {
    if (refCode) {
      // Store the referral code in localStorage so it can be used after signup
      localStorage.setItem('referralCode', refCode);
    }
  }, [refCode]);

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-white text-black">
      {refCode && (
        <div className='pt-25'>
          <div className="p-4 text-lg text-white bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-xl">
            🎉 You&apos;re signing up with referral code: <strong>{refCode}</strong>
          </div>
        </div>
      )}
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#000000',
            colorText: '#000000',
            colorInputText: '#000000',
            colorBackground: '#ffffff',
            borderRadius: '0.5rem',
            spacingUnit: '0.75rem',
            fontSize: '1rem',
          },
          elements: {
            card: 'shadow-lg border border-gray-200',
            headerTitle: 'text-black text-xl font-semibold',
            formButtonPrimary: 'bg-black text-white hover:bg-gray-800 transition',
            formFieldInput: 'bg-white border border-gray-300 text-black placeholder:text-gray-400',
            footerActionLink: 'text-blue-600 hover:underline',
            otpInput: 'text-black bg-white border border-gray-300',
            otpInputBox: 'text-black bg-white border border-gray-300',
          },
        }}
      />
    </div>
  );
}
