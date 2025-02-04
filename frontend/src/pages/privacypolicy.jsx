import React from "react";
import {
  faClock,
  faTruck,
  faShieldAlt,
  faMapMarkerAlt,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MyFooter from "../components/MyFooter";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mx-auto p-6 md:p-12 md:mt-6 mt-20">
        {/* Privacy Policy Title */}
        <h1 className="bg-blue-700 text-white text-4xl font-bold mb-8 text-center p-4 rounded underline">
          Privacy Policy for Andes
        </h1>

        {/* Introduction Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            1. Introduction
          </h2>
          <p className="text-gray-700">
            Welcome to Andes ("App"), developed by Andes ("We," "Us," "Our"). Your privacy is important to us, and we are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and protect your information.
          </p>
        </section>

        {/* Information Collection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            2. Information Collection
          </h2>
          <p className="text-gray-700">
            We collect personal information from our customers through various sources, including:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Customer Registration</strong>: Information provided at our store or through our mobile application.
            </li>
            <li>
              <strong>Call Center</strong>: Information provided during support calls.
            </li>
            <li>
              <strong>App Usage</strong>: Data collected during interactions with the App.
            </li>
            <li>
              <strong>Location Data</strong>: We may access your device’s location data to provide location-based services, such as personalized recommendations, delivery tracking, or location-specific features. This data is collected only with your explicit consent and is not stored beyond the required duration for service fulfillment.
            </li>
            <li>
              <strong>Device Information</strong>: We may collect information about your device, including its model, operating system, and unique identifiers.
            </li>
          </ul>
        </section>

        {/* Usage Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            3. Usage Information
          </h2>
          <p className="text-gray-700">
            Any information shared with us is done so with your consent and is used for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Order Status Updates</strong>: To keep you informed about the status of your order.
            </li>
            <li>
              <strong>Service Notifications</strong>: To share updates, new services, and promotions.
            </li>
            <li>
              <strong>Feedback Collection</strong>: To gather your thoughts and suggestions on our services.
            </li>
            <li>
              <strong>Personalized User Experience</strong>: To improve the app's performance and user interactions.
            </li>
            <li>
              <strong>Security and Fraud Prevention</strong>: To maintain data integrity and protect against unauthorized access.
            </li>
            <li>
              <strong>Legal Compliance</strong>: To comply with legal obligations.
            </li>
            <li>
              <strong>Location-Based Services</strong>: If enabled, location data is used to enhance app functionality, such as providing relevant recommendations or tracking deliveries.
            </li>
          </ul>
        </section>

        {/* Communication Channels Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            4. Communication Channels
          </h2>
          <p className="text-gray-700">
            We may reach out to you using the following methods:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Telephone Calls</li>
            <li>WhatsApp Messages</li>
            <li>Text Messages</li>
            <li>Email Communications</li>
            <li>Direct Mailers</li>
          </ul>
        </section>

        {/* Data Sharing and Disclosure Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            5. Data Sharing and Disclosure
          </h2>
          <p className="text-gray-700">
            We do not sell, trade, or rent your personal data to third parties. However, we may share your information in the following cases:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <strong>Service Providers</strong>: With companies that assist in operating our App.
            </li>
            <li>
              <strong>Legal Requirements</strong>: When required by law or to protect our legal rights.
            </li>
            <li>
              <strong>Business Transactions</strong>: In the event of a merger, acquisition, or asset sale.
            </li>
            <li>
              <strong>Third-Party Services</strong>: With services supporting location-based features, such as delivery tracking. These third parties are bound by strict data protection agreements.
            </li>
          </ul>
        </section>

        {/* Data Protection Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            6. Data Protection
          </h2>
          <p className="text-gray-700">
            We implement strict security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
          </p>
        </section>

        {/* Data Retention and Deletion Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            7. Data Retention and Deletion
          </h2>
          <p className="text-gray-700">
            We retain your personal data only as long as necessary for the purposes stated in this Privacy Policy. Location data, if collected, is stored temporarily and deleted once it is no longer required for service fulfillment. You may request deletion of your data by contacting us at andesnow1604@gmail.com.
          </p>
        </section>

        {/* User Rights Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            8. User Rights
          </h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Access, correct, or delete your personal data.</li>
            <li>Withdraw consent for data collection (e.g., disabling location services in your device settings).</li>
            <li>Request information on how your data is processed.</li>
          </ul>
        </section>

        {/* Privacy Policy Updates Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
            9. Privacy Policy Updates
          </h2>
          <p className="text-gray-700">
            We may update this Privacy Policy periodically. Any changes will be communicated through our usual channels and will be posted within the App and on our website.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 underline">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            10. Contact Us
          </h2>
          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, you may contact us at:
          </p>
          <p className="text-gray-700">Email: andesnow1604@gmail.com</p>
        </section>
      </div>

      <MyFooter />
    </>
  );
};

export default PrivacyPolicy;
