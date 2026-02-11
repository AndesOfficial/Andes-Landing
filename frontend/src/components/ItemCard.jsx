/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
const ItemCard = ({
  title,
  price,
  description,
  includes,
  serviceTime,
  returned,
  icon,
}) => (
  <div className="bg-white hover:bg-slate-50 p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(8,144,241,0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] w-full md:w-auto flex-shrink-0 flex flex-col justify-between h-full border border-slate-100 hover:border-brand/30 group">
    <div className="flex justify-between items-start mb-4">
      <div className="text-4xl text-brand bg-brand/10 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand group-hover:text-white">
        {icon}
      </div>
      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Available</span>
    </div>

    <div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-brand transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {description}
      </p>

      <div className="mb-3">
        <p className="text-[10px] font-bold text-gray-400 mb-2 tracking-wider uppercase">INCLUDES</p>
        <div className="flex flex-wrap gap-1">
          {includes.map((item, index) => (
            <span key={index} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100 group-hover:border-brand/20 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
      <div>
        <span className="text-xs text-gray-400 block font-medium">Starting from</span>
        <span className="text-xl font-black text-gray-900">₹{price}</span>
      </div>
      <Link to="/order" className="w-full md:w-auto">
        <button className="text-white font-bold text-sm bg-brand px-5 py-2.5 rounded-xl shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:bg-brand-dark active:scale-95 transition-all whitespace-nowrap w-full md:w-auto">
          Book Now
        </button>
      </Link>
    </div>
  </div>
);

export default ItemCard;