import React from 'react';
import appstore from "../assets/appstoreicon.svg";
import playstore from "../assets/playstoreicon.svg";
import mockup1 from "../assets/DownloadPage1.jpg"; // Add these mockup images to your assets
import mockup2 from "../assets/DownloadPage2.jpg";

import {Helmet} from "react-helmet-async";

const DownloadPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Andes Laundry - Download</title>
        <meta name="description" content="Download the Andes Laundry app to start your laundry journey." />
      </Helmet>
      {/* Main Content */}
      <div className="flex-grow bg-gradient-to-b from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* App Screenshots - Left Side */}
            <div className="lg:w-1/2 relative">
              <div className="flex justify-center items-center relative">
                <div className="relative w-[250px] md:w-[300px] z-10 transform -rotate-6">
                  <img
                    src={mockup1}
                    alt="App Screenshot 1"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </div>
                <div className="relative w-[250px] md:w-[300px] -ml-20 mt-10 z-20 transform rotate-6">
                  <img
                    src={mockup2}
                    alt="App Screenshot 2"
                    className="w-full rounded-3xl shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="lg:w-1/2 text-white text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                DAILY LAUNDRY!
                <br />
                STILL DOING IT
                <br />
                YOURSELF?
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Let us take off the load from your hands and
                <br className="hidden md:block" />
                deliver them back spotless to your door
              </p>
              
              <div className="bg-blue-500/30 backdrop-blur-sm rounded-xl p-6 mb-8">
                <p className="text-lg mb-4">
                  Join thousands of happy customers who have already made the smart choice.
                </p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2">✨</span>
                    Professional Cleaning Services
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">🚚</span>
                    Free Pickup & Delivery
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">⚡</span>
                    24-Hour Turnaround Time
                  </li>
                </ul>
              </div>
              
              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  href="#"
                  className="bg-white rounded-xl flex items-center px-6 py-3 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <img src={appstore} alt="App Store" className="h-10 w-10" />
                  <div className="ml-3 text-left">
                    <p className="text-gray-600 text-xs">Download on the</p>
                    <p className="text-black font-semibold text-lg">App Store</p>
                  </div>
                </a>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.andes.laundry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl flex items-center px-6 py-3 hover:shadow-lg transition duration-300 transform hover:-translate-y-1"
                >
                  <img src={playstore} alt="Play Store" className="h-10 w-10" />
                  <div className="ml-3 text-left">
                    <p className="text-gray-600 text-xs">GET IT ON</p>
                    <p className="text-black font-semibold text-lg">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="opacity-90">Multiple secure payment options for your convenience</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="opacity-90">Quick turnaround time with quality assurance</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="opacity-90">Always here to help with your laundry needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default DownloadPage; 