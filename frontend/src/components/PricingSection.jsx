import { FaShippingFast, FaMoneyBillWave, FaTags } from "react-icons/fa";

const PricingSection = () => {
  return (
    <section className="bg-brand text-white py-24 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-bold">Simple pricing</h2>
        <p className="text-lg text-white/80 mt-2">No hidden fees.</p>
      </div>

      <div className="bg-brand-dark py-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-center space-y-6 md:space-y-0 md:space-x-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              <FaShippingFast className="w-10 h-10 text-brand-light opacity-90" />
            </div>
            <p className="text-lg font-semibold">Free 48h delivery</p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              <FaMoneyBillWave className="w-10 h-10 text-brand-light opacity-90" />
            </div>
            <p className="text-lg font-semibold">₹50 minimum order</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 flex items-center justify-center">
              <FaTags className="w-10 h-10 text-brand-light opacity-90" />
            </div>
            <p className="text-lg font-semibold">Service fee from ₹8</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
