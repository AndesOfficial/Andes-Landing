/* eslint-disable react/prop-types */
// src/components/PricingCard.js

const PricingCard = ({ icon, title, description, actualPrice, fakePrice, linkText, linkUrl }) => {
  const discountPercentage = Math.round(((fakePrice - actualPrice) / fakePrice) * 100);

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-brand/20">
      <div className="flex items-center mb-4">
        <img src={icon} alt={title} className="w-12 h-12 mr-4" />
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="text-xl font-bold text-brand">₹{actualPrice}</span>
        <span className="line-through text-red-500 ml-2">₹{fakePrice}</span>
        <span className="text-green-500 ml-2">{discountPercentage}% off</span>
      </div>
      <a href={linkUrl} className="text-brand hover:underline">{linkText}</a>
    </div>
  );
};

export default PricingCard;