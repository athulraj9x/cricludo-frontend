import React from 'react';
import image from '../assets/playground.png';
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
function PrivacyPolicy() {
  return (
    <div
      className="relative w-full mx-auto text-white bg-cover bg-center bg-no-repeat h-[100dvh] "
      style={{ backgroundImage: `url(${image})` }}

    >
      {/* Overlay */}

      {/* Content */}
      <div className="px-14 py-12 lg:px-40 lg:py-20 flex justify-center flex-col">
         <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
          
        </div>
        

        <p className="mb-4">
          We appreciate your interest in <strong>CricLudo</strong> and thank you for choosing to be part of our gaming community. Your privacy is important to us, and this Privacy Policy describes how your information is collected, used, and protected when you use our mobile game.
        </p>

        <p className="mb-4">
          By using CricLudo, you agree to the practices described here. When you create an account or sign in through third-party platforms, we may collect information such as your username, email address, and profile image if available.
        </p>

        <p className="mb-4">
          Additionally, to enhance gameplay and personalize your experience, we collect data related to your in-game activity, including matches played, scores, preferences, and interactions.
        </p>

        <p className="mb-4">
          Device information such as your operating system, app version, and technical performance details may also be recorded to help us monitor usage and improve game stability.
        </p>

        <p className="mb-4">
          Your information helps us deliver features, maintain functionality, troubleshoot issues, and provide relevant notifications or updates.
        </p>

        <p className="mb-4">
          We may also use third-party services for analytics, hosting, and performance monitoring. These partners may process limited data on our behalf under strict confidentiality agreements.
        </p>

        <p className="mb-4">
          Any user-generated content, including usernames, avatars, or match outcomes, may be visible to other players within the game.
        </p>

        <p className="mb-4">
          We do not knowingly allow children under the age of 8 to register or use CricLudo, and we strongly recommend parental supervision for minors under the age of 13.
        </p>

        <p className="mb-4">
          Players are not allowed to upload or share media that contains identifiable human faces or personal information, as CricLudo is focused purely on gameplay.
        </p>

        <p className="mb-4">
          Security measures are in place to protect your data, although no digital platform is entirely risk-free.
        </p>

        <p className="mb-4">
          We reserve the right to update this policy at any time, and significant changes will be communicated through the app. By continuing to use CricLudo, you accept any modifications made to this Privacy Policy.
        </p>

        <p className="mb-4">
          If you have any concerns or inquiries about how your data is handled, you may contact us at: <a href="mailto:info@9xtechnology.com" className="text-blue-400 underline">info@9xtechnology.com</a>
        </p>
      </div>
      <Navigation/>
    </div>
  );
}

export default PrivacyPolicy;
