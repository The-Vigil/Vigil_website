import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const ConfirmationPage = () => {
  return (
    <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
      <div className="max-w-lg mx-auto p-6 text-center">
        {/* Logo and Icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-white">VIGIL</h1>
        </div>

        {/* Success Message */}
        <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800 shadow-xl">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-white">
            Application Received!
          </h2>

          <p className="text-gray-400 mb-6">
            Thank you for choosing VIGIL to protect your property. Our team will review your application and contact you within 24 hours.
          </p>

          <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-300">
              Your spot in the Early Access Program has been reserved.
            </p>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-medium mb-3 text-blue-400">Next Steps:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-500 text-sm">1</span>
                </div>
                <span>Check your email for confirmation details</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-500 text-sm">2</span>
                </div>
                <span>Our team will contact you to verify your property details</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-500 text-sm">3</span>
                </div>
                <span>Complete your digital verification setup</span>
              </li>
            </ul>
          </div>

          {/* Return Button */}
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-150"
          >
            Return to Homepage
          </Link>

          {/* Contact Info */}
          <p className="text-sm text-gray-500 mt-6">
            Questions? Contact us at support@vigil.com
          </p>
        </div>
      </div>
    </div >
  );
};

export default ConfirmationPage;