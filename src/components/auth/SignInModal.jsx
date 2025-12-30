import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

export default function SignInModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');

  const handleGoogleSignIn = () => {
    base44.auth.redirectToLogin();
  };

  const handleEmailContinue = () => {
    if (email) {
      base44.auth.redirectToLogin();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white p-0 gap-0">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Welcome to WatchRaffle
          </h1>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium mb-6 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 pl-4 pr-32 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500"
            />
            <Button
              onClick={handleEmailContinue}
              className="absolute right-2 top-2 h-10 bg-blue-400 hover:bg-blue-500 text-white font-medium px-6"
            >
              Continue
            </Button>
          </div>

          {/* Wallet Options */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {[
              { name: 'MetaMask', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/3ce29aa8f_images.png' },
              { name: 'Coinbase', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/735804b44_WalletLogo.png' },
              { name: 'Phantom', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/af3875159_images.jpeg' },
              { name: 'WalletConnect', icon: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/a49cf1924_images-1.png' }
            ].map((wallet) => (
              <button
                key={wallet.name}
                className="h-20 border-2 border-gray-300 rounded-xl hover:border-gray-400 transition-colors flex items-center justify-center p-4"
              >
                <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-2 mt-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-gray-700">Privacy</a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}