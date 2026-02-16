import PricingSection from "../components/PricingSection";
import PricingCard from "../components/PricingCard";
import MyFooter from "../components/MyFooter";
import washicon from "../assets/washicon.svg";
import drycleaning from "../assets/drycleaningicon.svg";
import bulkyicon from "../assets/bulkyicon.jpg";
import ironicon from "../assets/ironicon.svg";
import shoeicon from "../assets/shoeicon.svg";

import { servicesPricingData } from "../data/servicesData";
import { Helmet } from "react-helmet-async";

const ServicesPage = () => {
  return (
    <div>
      <Helmet>
        <title>Services & Pricing | Andes Laundry</title>
        <meta name="description" content="Affordable laundry services in Pune. Wash & Fold starts at ₹59/kg. Pickup & delivery included." />
      </Helmet>
      <PricingSection actualPrice={59} fakePrice={79} />
      <div className="bg-gray-100 min-h-[100dvh] flex flex-col items-center py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {servicesPricingData.map((item, index) => (
            <PricingCard key={index} {...item} />
          ))}
        </div>
      </div>
      <MyFooter /> {/* Footer stays at the bottom of the page */}
    </div>
  );
};

export default ServicesPage;