import React from 'react';
import { Link } from 'react-router-dom';

function ConfirmationPage() {
  return (
    <div
      style={{
        backgroundImage: 'url(/assets/gym.webp)', // Set background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          Your payment has been processed successfully. Thank you for paying your fee!
        </p>
        <p className="text-lg text-gray-800 text-center mb-4">
          Fee Amount: <span className="text-blue-500">1000</span>
        </p>
        <div className="text-center">
          <Link
            to="/pay-fee"
            className="bg-blue-500 text-white p-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Go to Payment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
