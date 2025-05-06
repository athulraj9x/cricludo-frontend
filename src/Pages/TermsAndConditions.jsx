import React from "react";
import image from "../assets/playground.png";
import { Link } from "react-router-dom";
import Navigation from "../Components/Navigation";

function TermsAndConditions() {
  return (
    <div
      className="relative w-full mx-auto text-white bg-cover bg-center bg-no-repeat h-[100dvh]"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Content */}
      <div className=" px-14 py-12 lg:px-40 lg:py-20 flex justify-center flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Terms and Conditions</h1>
        </div>

        <p className="mb-4">
          By downloading or using <strong>CricLudo</strong>, you agree to the
          following terms and conditions:
        </p>

        <p className="mb-4">
          <span className="font-bold">Use of the App:&nbsp;&nbsp;</span> CricLudo is
          designed for entertainment purposes only. You agree to use the app
          lawfully and respectfully, without exploiting, disrupting, or harming
          the experience for others.
        </p>

        <p className="mb-4">
          <span className="font-bold">Account Responsibility:&nbsp;&nbsp;</span> You are
          responsible for maintaining the confidentiality of your account
          information and ensuring that your activity within the app complies
          with these terms.
        </p>

        <p className="mb-4">
          <span className="font-bold">Intellectual Property:&nbsp;&nbsp;</span> All game
          content, including visuals, logos, gameplay mechanics, and code, is
          protected by intellectual property laws. You may not copy, modify,
          distribute, or reuse any part of the app without written permission.
        </p>

        <p className="mb-4">
          <span className="font-bold">In-App Purchases:&nbsp;&nbsp;</span> All purchases
          made within the app are final and non-refundable unless required by
          local law or the app store’s refund policy.
        </p>

        <p className="mb-4">
          <span className="font-bold">Third-Party Content:&nbsp;&nbsp;</span> CricLudo
          may include ads or links to third-party services. We are not
          responsible for the content, availability, or practices of these
          third-party providers.
        </p>

        <p className="mb-4">
          <span className="font-bold">User Conduct:&nbsp;&nbsp;</span> Users are
          prohibited from posting or sharing any content that is offensive,
          misleading, abusive, illegal, or violates any applicable laws. Sharing
          of images containing identifiable people is strictly not allowed.
        </p>

        <p className="mb-4">
          <span className="font-bold">Age Restrictions:&nbsp;&nbsp;</span> CricLudo is
          intended for users aged 8 and above. Children under 13 should use the
          app under the supervision of a parent or guardian.
        </p>

        <p className="mb-4">
          <span className="font-bold">Data and Privacy:&nbsp;&nbsp;</span> Use of
          CricLudo is subject to our Privacy Policy. By using the app, you
          consent to the collection and use of information as outlined in the
          policy.
        </p>

        <p className="mb-4">
          <span className="font-bold">Service Availability:&nbsp;&nbsp;</span> We strive
          to keep CricLudo functional and enjoyable, but we do not guarantee
          uninterrupted access or that the app will be free from errors or bugs.
        </p>

        <p className="mb-4">
          <span className="font-bold">Termination of Access:&nbsp;&nbsp;</span> We
          reserve the right to suspend or terminate any account found violating
          these terms or engaging in harmful behavior.
        </p>

        <p className="mb-4">
          <span className="font-bold">Modifications to Terms:&nbsp;&nbsp;</span> These
          terms may be updated over time. Continued use of CricLudo after
          changes have been made indicates your acceptance of the updated terms.
        </p>

        <p className="mb-4">
          <span className="font-bold">Contact Us:&nbsp;&nbsp;</span> If you have any
          questions about these Terms and Conditions, please contact us at:
          <a
            href="mailto:info@9xtechnology.com"
            className="text-blue-400 underline ml-1"
          >
            info@9xtechnology.com
          </a>
        </p>
      </div>

      <Navigation />
    </div>
  );
}

export default TermsAndConditions;
