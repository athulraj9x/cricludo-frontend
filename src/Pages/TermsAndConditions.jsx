import React from 'react';
import image from '../assets/cricludo_logo_final.jpg';

function TermsAndConditions() {
  return (
    <div
      className="relative p-6 w-full mx-auto text-white bg-cover bg-center bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-[.50] z-0"></div>

      {/* Content */}
      <div className="relative z-10 px-40 py-20">
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

        <p className="mb-4">
          By downloading or using <strong>CricLudo</strong>, you agree to the following terms and conditions:
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">1. Use of the App</h2>
        <p className="mb-4">
          CricLudo is designed for entertainment purposes only. You agree to use the app lawfully and respectfully, without exploiting, disrupting, or harming the experience for others.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">2. Account Responsibility</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account information and ensuring that your activity within the app complies with these terms.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">3. Intellectual Property</h2>
        <p className="mb-4">
          All game content, including visuals, logos, gameplay mechanics, and code, is protected by intellectual property laws. You may not copy, modify, distribute, or reuse any part of the app without written permission.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">4. In-App Purchases</h2>
        <p className="mb-4">
          All purchases made within the app are final and non-refundable unless required by local law or the app store’s refund policy.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">5. Third-Party Content</h2>
        <p className="mb-4">
          CricLudo may include ads or links to third-party services. We are not responsible for the content, availability, or practices of these third-party providers.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">6. User Conduct</h2>
        <p className="mb-4">
          Users are prohibited from posting or sharing any content that is offensive, misleading, abusive, illegal, or violates any applicable laws. Sharing of images containing identifiable people is strictly not allowed.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">7. Age Restrictions</h2>
        <p className="mb-4">
          CricLudo is intended for users aged 8 and above. Children under 13 should use the app under the supervision of a parent or guardian.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">8. Data and Privacy</h2>
        <p className="mb-4">
          Use of CricLudo is subject to our Privacy Policy. By using the app, you consent to the collection and use of information as outlined in the policy.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">9. Service Availability</h2>
        <p className="mb-4">
          We strive to keep CricLudo functional and enjoyable, but we do not guarantee uninterrupted access or that the app will be free from errors or bugs.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">10. Termination of Access</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate any account found violating these terms or engaging in harmful behavior.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">11. Modifications to Terms</h2>
        <p className="mb-4">
          These terms may be updated over time. Continued use of CricLudo after changes have been made indicates your acceptance of the updated terms.
        </p>

        <h2 className="text-lg font-semibold mt-6 mb-2">12. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms and Conditions, please contact us at: <a href="mailto:info@9xtechnology.com" className="text-blue-400 underline">info@9xtechnology.com</a>
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
