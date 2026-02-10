/* eslint-disable react/prop-types */
const ItemCard = ({
  title,
  price,
  description,
  includes,
  serviceTime,
  returned,
  icon,
}) => (
  <div className="bg-blue-500 p-5 rounded-lg shadow-md transform transition-transform duration-300 md:hover:scale-105 w-full md:w-auto flex-shrink-0 md:ml-4 h-full flex flex-col justify-between">
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-xs text-blue-100">from {price}</p>
        </div>
        <div className="text-white bg-blue-600 p-2 rounded-full">{icon}</div>
      </div>
      <p className="text-sm text-gray-100 mb-3 leading-snug">{description}</p>
      <div className="mb-3">
        <p className="text-[10px] font-bold text-blue-100 mb-1 tracking-wider">INCLUDES</p>
        <div className="flex flex-wrap gap-1">
          {includes.map((item, index) => (
            <span key={index} className="text-[10px] bg-blue-600/50 text-white px-2 py-1 rounded border border-blue-400">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="flex justify-between text-[10px] text-gray-100 mt-2 pt-3 border-t border-blue-400/30">
      <div>
        <p className="font-bold text-blue-100">SERVICE TIME</p>
        <p>{serviceTime}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-blue-100">RETURNED</p>
        <p>{returned}</p>
      </div>
    </div>
  </div>
);

export default ItemCard;