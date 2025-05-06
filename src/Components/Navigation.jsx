import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
      <nav className="absolute bottom-0 w-full h-32 flex flex-col-reverse items-center  md:flex-row justify-between px-8 pb-8 gap-4">
        {/* routes */}
        <div className=" text-nowrap">
        <Link
            to="/"
            className="text-white font-medium py-2 px-4 rounded"
          >
            Home
          </Link>
        <Link
            to="/privacy-policy"
            className="text-white font-medium py-2 px-4 rounded"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className="text-white font-medium py-2 px-4 rounded"
          >
            Terms and Conditions
          </Link>
          
        </div>
        {/* Download links */}

        <div className="flex flex-col items-center justify-between gap-2 text-white">
          <h1 className="text-base">Get our App</h1>
          {/* google icon */}
          <div className="flex items-center justify-center gap-4">
            <Link
              className="w-full"
              to="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&pli=1"
              target="_blank"
            >
              <button className="font-semibold rounded-xl flex items-center justify-center text-nowrap bg-black px-4 py-2 gap-2 border border-white">
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/fluency/48/google-play.png"
                  alt="google-play"
                />
                <p className="text-sm">Google Play</p>
              </button>
            </Link>

            {/* apple icon */}
            <Link
              className="w-full"
              to="https://apps.apple.com/gb/app/metatrader-5/id413251709"
              target="_blank"
            >
              <button className="font-semibold rounded-xl flex items-center justify-center text-nowrap bg-black px-4 py-2 gap-2 border border-white">
                <img
                  alt="svgImg"
                  width="30"
                  height="30"
                  src="https://img.icons8.com/?size=100&id=17843&format=png&color=000000"
                />
                <p className="text-sm">App Store</p>
              </button>
            </Link>
          </div>
        </div>
      </nav>
  );
};

export default Navigation;