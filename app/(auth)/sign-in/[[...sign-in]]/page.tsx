// app/login/page.tsx

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <SignIn
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
            formFieldInputText: 'text-black',
            socialButtonsBlockButton: 'bg-gray-100 text-black hover:bg-gray-200',
            socialButtonsBlockButtonText: 'text-black',
          },
        }}
      />
    </div>
  );
}
