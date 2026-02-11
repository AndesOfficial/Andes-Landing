import ItemCard from "./ItemCard.jsx";
import { FaRegComment, FaTshirt, FaSoap, FaShoePrints, FaShoppingBasket } from "react-icons/fa";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="bg-brand text-white py-8 px-4 transition-all duration-300 ease-in-out">
      <h2 className="text-3xl font-bold text-center mb-2">
        Explore our services
      </h2>
      <p className="text-center mb-6">
        We handle your clothes with care, giving them the attention they deserve.
      </p>
      <div className="flex justify-center gap-4 mb-6">
        <Link to="/services">
          <button
            className="bg-white text-brand px-4 py-2 rounded hover:bg-brand-dark hover:text-white hover:border hover:border-white transition-all duration-300 ease-in-out"
          >
            See price list
          </button>
        </Link>
        <a href="mailto:care@andes.co.in" className="no-underline">
          <button className="bg-transparent border border-white px-4 py-2 rounded flex items-center gap-2 hover:border-white hover:bg-white hover:text-brand transition-all duration-300 ease-in-out">
            <FaRegComment size={20} />
            Ask us anything
          </button>
        </a>
      </div>
      <div className="flex overflow-x-auto md:overflow-x-visible overflow-y-hidden space-x-4 md:space-x-0 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto pb-4 md:pb-0">
        <ItemCard
          title="Wash"
          price="₹55/Kg"
          description="For everyday laundry, bedsheets and towels."
          includes={["WASH", "TUMBLE-DRY"]}
          serviceTime="24H - 48H"
          returned="IN A LAUNDRY/ANDES BAG"
          icon={<FaShoppingBasket size={36} className="text-brand" />}
        />
        <ItemCard
          title="Wash & Iron"
          price="₹75/Kg"
          description="For everyday laundry & ironing."
          includes={["WASH", "TUMBLE-DRY", "IRONING"]}
          serviceTime="24H - 48H"
          returned="ON HANGERS"
          icon={<FaTshirt size={36} className="text-brand" />}
        />
        <ItemCard
          title="Dry Cleaning"
          price="45/Kg"
          description="For delicate items and fabrics."
          includes={["DRY CLEANING", "IRONING"]}
          serviceTime="24H - 48H"
          returned="ON HANGERS"
          icon={<FaSoap size={36} className="text-brand" />}
        />
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
  );
};

export default Services;