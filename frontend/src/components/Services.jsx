import ItemCard from "./ItemCard.jsx";
import { FaRegComment, FaTshirt, FaUserTie, FaShoePrints, FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";

import Button from "./common/Button";

const Services = () => {
  return (
    <div id="pricing-section" className="bg-brand text-white py-12 px-4 rounded-[2.5rem] md:rounded-[3.5rem] shadow-xl shadow-brand/20 transition-all duration-300 ease-in-out mx-auto max-w-7xl relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2">
          Explore our services
        </h2>
        <p className="text-center mb-6">
          We handle your clothes with care, giving them the attention they deserve.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <Link to="/services">
            <Button variant="white" className="px-4 py-2">
              See price list
            </Button>
          </Link>
          <a href="mailto:care@andes.co.in" className="no-underline">
            <Button variant="outline-white" className="px-4 py-2 flex items-center gap-2">
              <FaRegComment size={20} />
              Ask us anything
            </Button>
          </a>
        </div>
        <div className="relative">
          <div className="flex overflow-x-auto md:overflow-x-visible overflow-y-hidden snap-x snap-mandatory scrollbar-hide space-x-4 md:space-x-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto pb-4 md:pb-0 px-4 md:px-0">
            <div className="snap-center shrink-0 w-64 sm:w-[350px] md:w-auto h-full">
              <ItemCard
                title="Wash"
                price="69/Kg"
                description="For everyday laundry, bedsheets and towels."
                includes={["WASH", "TUMBLE-DRY", "FOLD"]}
                serviceTime="24H - 48H"
                returned="IN A LAUNDRY/ANDES BAG"
                icon={<FaShoppingBasket size={36} className="text-brand" />}
              />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[350px] md:w-auto h-full">
              <ItemCard
                title="Wash & Iron"
                price="89/Kg"
                description="For everyday laundry & ironing."
                includes={["WASH", "TUMBLE-DRY", "IRONING"]}
                serviceTime="24H - 48H"
                returned="ON HANGERS"
                icon={<FaTshirt size={36} className="text-brand" />}
              />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[350px] md:w-auto h-full">
              <ItemCard
                title="Wash & Fold"
                price="69/Kg"
                description="For delicate items and fabrics."
                includes={["WASH", "FOLD"]}
                serviceTime="24H - 48H"
                returned="ON HANGERS"
                icon={<FaUserTie size={36} className="text-brand" />}
              />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[350px] md:w-auto h-full">
              <ItemCard
                title="Shoes Cleaning"
                price="125/Pair"
                description="For all types of shoes."
                includes={["CUSTOM CLEANING"]}
                serviceTime="24H - 48H"
                returned="IN A LAUNDRY/ANDES BAG"
                icon={<FaShoePrints size={36} className="text-brand" />}
              />
            </div>
          </div>
          {/* Scroll Hint Overlay */}
          <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-brand to-transparent pointer-events-none md:hidden rounded-r-[2.5rem]" />
        </div>
      </div>
    </div>
  );
};

export default Services;