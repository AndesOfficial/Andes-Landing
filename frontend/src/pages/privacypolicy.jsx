import {
    faClock,
    faTruck,
    faShieldAlt,
    faMapMarkerAlt,
    faPhoneAlt,
  } from "@fontawesome/free-solid-svg-icons";
import {Helmet} from "react-helmet-async";
const privacypolicy = () => {
  return (
    <>
    <Helmet>
        <title>Andes Laundry - Privacy Policy</title>
        <meta name="description" content="Read our privacy policy for using Andes Laundry services." />
      </Helmet>
    <div className="container mx-auto p-6 md:p-12 md:mt-6 mt-20">
        <h1 className="bg-blue-700 text-white text-4xl font-bold mb-8 text-center p-4 rounded underline">
            Terms & Conditions
        </h1>
        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Delivery Timeframes
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Laundry Deliveries: Will be made within 48 hours.</li>
                <li>Ironing Services: Will be delivered within 48 hours.</li>
                <li>
                    Ultra-Fast Delivery: Available in 120 minutes for ironing
                    services, with a minimal delivery fee.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Minimum Order Value
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Free Delivery: Available for orders above ₹50.</li>
                <li>Minimum Order Value: ₹50.</li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Claims for Damages
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Report Issues: If any damage occurs to your clothes after ironing
                    or any service, please inform us within 24 hours of delivery to
                    initiate a claim.
                </li>
                <li>
                    Verification Process: We will verify the claim to determine the
                    cause of damage before proceeding with a refund.
                </li>
                <li>
                    Refund Policy: Refunds will only be processed if claims are made
                    within 24 hours.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Return & Exchange Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Returns & Exchanges: Completely disabled. Refunds are only
                    applicable for reported damages within the specified time.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                General Information
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Headquarters: Andes is headquartered in Khur, Pune, Maharashtra,
                    India.
                </li>
                <li>
                    Contact for Queries: For any queries or concerns, please reach out
                    to our customer care.
                </li>
            </ul>
        </section>

        <h1 className="bg-blue-700 text-white text-4xl font-bold mb-8 text-center p-4 rounded underline">
            Privacy Policy
        </h1>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Information Collection
            </h2>
            <p className="text-gray-700">
                We collect personal information from our customers through various
                sources, including:
            </p>
            <ul className="list-disc list-inside text-gray-700">
                <li>Customer Registration: At our store or mobile application.</li>
                <li>Call Center: Information provided during support calls.</li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Usage of Information
            </h2>
            <p className="text-gray-700">
                Any information shared with us is done so with your consent and is
                used for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Order Status Updates: To keep you informed about your order.
                </li>
                <li>
                    Service Notifications: To share new services and promotions.
                </li>
                <li>
                    Feedback Collection: To gather your thoughts and suggestions on
                    our services.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
                Communication Channels
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

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Data Protection
            </h2>
            <p className="text-gray-700">
                We implement strict security measures to protect your information
                from unauthorized access, disclosure, alteration, or destruction.
            </p>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Consent
            </h2>
            <p className="text-gray-700">
                By providing your personal information, you expressly consent to its
                use in accordance with this Privacy Policy.
            </p>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Updates to the Privacy Policy
            </h2>
            <p className="text-gray-700">
                We may update this policy periodically. Any changes will be
                communicated through our usual channels.
            </p>
        </section>

        <h1 className="bg-blue-700 text-white text-4xl font-bold mb-8 text-center p-4 rounded underline">
            Refund and Cancellation Policy
        </h1>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                Delivery Timeframes
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Laundry Deliveries: Will be made within 48 hours.</li>
                <li>Ironing Services: Will be delivered within 48 hours.</li>
                <li>
                    Ultra-Fast Delivery: Available in 120 minutes for ironing
                    services, with a minimal delivery fee.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Minimum Order Value
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>Free Delivery: Available for orders above ₹50.</li>
                <li>Minimum Order Value: ₹50.</li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Claims for Damages
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Report Issues: If any damage occurs to your clothes after ironing
                    or any service, please inform us within 24 hours of delivery to
                    initiate a claim.
                </li>
                <li>
                    Verification Process: We will verify the claim to determine the
                    cause of damage before proceeding with a refund.
                </li>
                <li>
                    Refund Policy: Refunds will only be processed if claims are made
                    within 24 hours.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faShieldAlt} className="mr-2" />
                Return & Exchange Policy
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Returns & Exchanges: Not applicable. Refunds are only applicable
                    for reported damages within the specified time.
                </li>
            </ul>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 underline">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                General Information
            </h2>
            <ul className="list-disc list-inside text-gray-700">
                <li>
                    Headquarters: Andes is headquartered in Khur, Pune, Maharashtra,
                    India.
                </li>
                <li>
                    Contact for Queries: For any queries or concerns, please reach out
                    to our customer care at  +91-8626076578.
                </li>
            </ul>
        </section>
    </div>
</>
  )
}

export default privacypolicy
