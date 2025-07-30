// app/sign-up/page.tsx

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
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
