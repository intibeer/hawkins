"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent === null) {
      // Only show banner if no choice has been made
      setShowConsent(true);
    } else if (cookieConsent === 'accepted') {
      // If cookies were accepted, initialize analytics
      initializeAnalytics();
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
    initializeAnalytics();
  };
  
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
    // Disable analytics tracking
    window['ga-disable-G-06E454G91R'] = true;
  };
  
  const initializeAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window['ga-disable-G-06E454G91R'] = false;
    }
  };
  
  if (!showConsent) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-[#d3cec4]">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="poppins-medium text-[#5d4037] text-lg mb-2">Cookie Consent</h3>
            <p className="poppins-light text-sm text-[#5d4037]">
              We use cookies to enhance your experience and analyze our website traffic. 
              By clicking "Accept", you consent to our use of cookies. See our{' '}
              <Link href="/cookie-policy" className="text-[#9c6644] hover:underline">
                Cookie Policy
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-[#9c6644] hover:underline">
                Privacy Policy
              </Link>{' '}
              for more information.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={declineCookies}
              className="py-2 px-4 border border-[#d3cec4] text-[#5d4037] rounded-md hover:bg-[#f8f5f0] transition-colors"
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="py-2 px-4 bg-[#9c6644] text-white rounded-md hover:bg-[#875839] transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 