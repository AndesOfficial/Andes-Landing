import { FaClock, FaTruck, FaShieldAlt, FaMapMarkerAlt, FaPhoneAlt, FaFileContractAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const TermsAndConditions = () => {
    const sections = [
        {
            number: "01",
            title: "Contractual Relationship",
            icon: FaFileContractAlt,
            content: [
                "These Terms & Conditions ('Terms') govern your access to and use of services provided by ANDES Services Private Limited ('ANDES', 'we', 'us', 'our'), including our website, mobile applications, and offline services (collectively, the 'Services').",
                "By accessing or using our Services, you agree to be bound by these Terms. If you do not agree, you may not use our Services.",
                "ANDES reserves the right to modify these Terms at any time. Continued use of Services after updates constitutes acceptance of the revised Terms."
            ]
        },
        {
            number: "02",
            title: "Services",
            icon: FaTruck,
            content: [
                "ANDES provides professional laundry and garment care services including:",
                "✓ Laundry and washing",
                "✓ Dry cleaning",
                "✓ Ironing and finishing",
                "✓ Doorstep pickup and delivery",
                "All services are performed using standard industry practices. While we aim for high-quality results, outcomes may vary depending on fabric condition and garment characteristics."
            ]
        },
        {
            number: "03",
            title: "User Obligations",
            icon: FaShieldAlt,
            content: [
                "By using our Services, you agree that:",
                "• You will provide accurate information during order placement.",
                "• You will not use the Services for unlawful purposes.",
                "• You will ensure garments are suitable for cleaning.",
                "You are solely responsible for all activity conducted under your account or request."
            ]
        },
        {
            number: "04",
            title: "Orders, Pickup & Verification",
            icon: FaClock,
            content: [
                "• All garments/items are counted at the time of pickup.",
                "• The quantity recorded digitally or on the pickup receipt shall be considered final and binding.",
                "• Customers must verify the count at pickup.",
                "ANDES shall not be responsible for any discrepancies reported after pickup confirmation."
            ]
        },
        {
            number: "05",
            title: "Pricing & Billing",
            icon: FaTruck,
            content: [
                "• Prices vary depending on garment type, fabric, and treatment required.",
                "• Final pricing is determined after inspection at our facility.",
                "• Customers will be informed of any changes, if applicable.",
                "Accepted payment methods: UPI | Debit/Credit Cards | Wallets | Cash",
                "ANDES reserves the right to revise pricing without prior notice."
            ]
        },
        {
            number: "06",
            title: "Delivery Terms",
            icon: FaClock,
            content: [
                "• Standard delivery timelines: 24–48 hours.",
                "• Timelines may vary based on service type and operational conditions.",
                "Delivery Attempts: Up to three (3) attempts will be made. If unsuccessful due to customer unavailability, the order may be marked as completed and additional charges may apply."
            ]
        },
        {
            number: "07",
            title: "Cleaning Process & Limitations",
            icon: FaShieldAlt,
            content: [
                "Garment cleaning is a technical process. While ANDES uses professional methods:",
                "• Stain removal is not guaranteed.",
                "• Certain stains may be permanent due to fabric nature, chemical reactions, or prior damage/treatment.",
                "We will notify customers where possible if risks are identified."
            ]
        },
        {
            number: "08",
            title: "Damage, Loss & Compensation",
            icon: FaShieldAlt,
            content: [
                "ANDES handles all garments with care. However, in case of damage or loss attributable to our processing:",
                "▪ Maximum Compensation: 5x the service charge OR Rs. 3,000 per item (whichever is lower)",
                "▪ Claim Window: 48-72 hours of delivery",
                "▪ Garment Retention: ANDES may retain the garment upon compensation"
            ]
        },
        {
            number: "09",
            title: "Exclusions of Liability",
            icon: FaShieldAlt,
            content: [
                "ANDES shall not be liable for:",
                "• Color bleeding, shrinkage, or fabric deterioration.",
                "• Pre-existing damage or weak fabrics.",
                "• Damage to embellishments (buttons, zippers, embroidery, etc.).",
                "• Items left inside garments (cash, valuables, accessories).",
                "All garments are processed at the customer's risk for inherent defects."
            ]
        },
        {
            number: "10",
            title: "Customer Responsibilities",
            icon: FaShieldAlt,
            content: [
                "Customers are required to:",
                "• Inspect garments at the time of delivery.",
                "• Report issues immediately.",
                "• Remove valuables before handing over garments.",
                "• Provide accurate contact and delivery details.",
                "Failure to comply may result in denial of claims."
            ]
        },
        {
            number: "11",
            title: "Storage & Unclaimed Items",
            icon: FaClock,
            content: [
                "• Orders not collected within 15 days may attract storage charges.",
                "• After 30 days, ANDES shall not be responsible for loss, damage, or deterioration."
            ]
        },
        {
            number: "12",
            title: "Cancellation & Rescheduling",
            icon: FaClock,
            content: [
                "• Orders may be cancelled free of charge before pickup.",
                "• Late cancellations or rescheduling may incur charges."
            ]
        },
        {
            number: "13",
            title: "Refund Policy",
            icon: FaTruck,
            content: [
                "Refunds may be provided in cases of service failure, incorrect billing, or duplicate payments.",
                "Refund processing timeline: 7-10 working days (for online payments). All refunds are subject to internal verification."
            ]
        },
        {
            number: "14",
            title: "Force Majeure",
            icon: FaShieldAlt,
            content: [
                "ANDES shall not be liable for delays or service failures caused by events beyond its control, including:",
                "• Natural disasters",
                "• Government restrictions",
                "• Power or water shortages",
                "• Transport disruptions"
            ]
        },
        {
            number: "15",
            title: "Termination",
            icon: FaShieldAlt,
            content: [
                "ANDES reserves the right to suspend or terminate Services in case of:",
                "• Violation of Terms",
                "• Non-payment of dues",
                "• Misuse or abuse of Services"
            ]
        },
        {
            number: "16",
            title: "Privacy",
            icon: FaShieldAlt,
            content: [
                "Customer information is collected and used only for order processing, communication, and service improvement.",
                "We do not sell or share personal data with unauthorized third parties."
            ]
        },
        {
            number: "17",
            title: "Intellectual Property",
            icon: FaFileContractAlt,
            content: [
                "All content, trademarks, branding, and materials related to ANDES are owned by the company. Unauthorized use is strictly prohibited."
            ]
        },
        {
            number: "18",
            title: "Limitation of Liability",
            icon: FaShieldAlt,
            content: [
                "To the maximum extent permitted by law, ANDES shall not be liable for:",
                "• Indirect or consequential damages.",
                "• Loss of profits, revenue, or business.",
                "• Delays beyond reasonable control."
            ]
        },
        {
            number: "19",
            title: "Governing Law & Jurisdiction",
            icon: FaFileContractAlt,
            content: [
                "These Terms shall be governed by the laws of India.",
                "All disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra."
            ]
        },
        {
            number: "20",
            title: "Contact Information",
            icon: FaPhoneAlt,
            content: [
                "Email: care@andes.co.in",
                "Phone: +91 86260 76578",
                "Address: Survey No 124, Paud Rd, Kothrud, Pune 411038"
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>ANDES Services - Terms & Conditions</title>
                <meta 
                    name="description" 
                    content="Read the Terms & Conditions for ANDES Services Pvt. Ltd. professional laundry and garment care services. Version 1.0, Effective March 2025."
                />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                {/* Header Section */}
                <div className="bg-brand text-white py-12 md:py-16 px-4">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
                        <p className="text-lg text-gray-100 mb-2">ANDES Services Pvt. Ltd.</p>
                        <p className="text-sm text-gray-200">Professional Laundry & Garment Care Services</p>
                        <div className="flex justify-center gap-6 mt-4 text-sm">
                            <span>Version 1.0</span>
                            <span>•</span>
                            <span>Effective Date: March 2025</span>
                            <span>•</span>
                            <span>Pune, Maharashtra</span>
                        </div>
                    </div>
                </div>

                {/* Intro Section */}
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            These Terms & Conditions constitute a legally binding agreement between you and <strong>ANDES Services Private Limited</strong>. 
                            Please read them carefully before using our services. By accessing or using any of our services, you acknowledge that you have 
                            read, understood, and agree to be bound by these Terms.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 pb-12">
                    {sections.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand text-white text-xl font-bold">
                                            {section.number}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <IconComponent className="text-brand" />
                                            {section.title}
                                        </h2>
                                        <div className="space-y-3">
                                            {section.content.map((paragraph, pIndex) => (
                                                <p 
                                                    key={pIndex}
                                                    className="text-gray-700 leading-relaxed"
                                                >
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Section */}
                <div className="bg-gray-900 text-white py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-300">
                            © 2025 ANDES Services Private Limited. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            This document is subject to change without notice.
                        </p>
                        <p className="text-gray-500 text-sm mt-4">
                            Governed by the laws of India | Jurisdiction: Pune, Maharashtra
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
