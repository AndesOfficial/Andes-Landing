import { motion } from "framer-motion";
import { FaBriefcase, FaHandshake, FaCarSide, FaHotel } from "react-icons/fa";

const WorkWithUs = () => {
  const items = [
    {
      title: "Careers",
      description: "Check open positions and join our rapidly growing operations team.",
      linkText: "View Openings",
      href: "mailto:care@andes.co.in",
      icon: <FaBriefcase />,
      color: "from-blue-500 to-cyan-500",
      bgHover: "hover:bg-blue-50"
    },
    {
      title: "Cleaning Partners",
      description: "Want to grow your customer base completely hassle free? Partner with Andes.",
      linkText: "Become a Partner",
      href: "mailto:care@andes.co.in",
      icon: <FaHandshake />,
      color: "from-brand to-indigo-500",
      bgHover: "hover:bg-indigo-50"
    },
    {
      title: "Partner Drivers",
      description: "Get flexible slots, fair competitive fees, and be your own boss on the road.",
      linkText: "Join the Fleet",
      href: "mailto:care@andes.co.in",
      icon: <FaCarSide />,
      color: "from-emerald-400 to-teal-500",
      bgHover: "hover:bg-emerald-50"
    },
    {
      title: "Hotel Partnerships",
      description: "Offer premium laundry, ironing & dry cleaning services directly to your guests.",
      linkText: "Explore Opportunities",
      href: "mailto:care@andes.co.in",
      icon: <FaHotel />,
      color: "from-amber-400 to-orange-500",
      bgHover: "hover:bg-orange-50"
    },
  ];

  return (
    <div className="py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand font-extrabold uppercase tracking-widest text-xs md:text-sm mb-4 block bg-blue-50 w-max mx-auto px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
            Opportunities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Want to work with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">us?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`block bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden ${item.bgHover}`}
              whileHover={{ scale: 1.02 }}
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${item.color} opacity-80 group-hover:opacity-100 transition-opacity`} />

              <div className="mb-6 flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <div className={`text-2xl bg-clip-text text-transparent bg-gradient-to-br ${item.color}`}>
                  {/* We hack the icon color by rendering it twice or setting color natively, but standard icons inherit `fill`. Let's use a wrapper for easy colored icons: */}
                  <div style={{ color: 'inherit' }} className={`bg-clip-text text-transparent bg-gradient-to-r ${item.color} [&>svg]:fill-[url(#gradient)]`}>
                    {/* For simplicity we'll just give the icon container a text color representing the brand since standard react-icons don't easily do text gradients without SVG hacking. */}
                  </div>
                  <div className="text-slate-800 group-hover:text-brand transition-colors">
                    {item.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 mb-6 text-sm font-medium leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-center text-sm font-bold text-brand uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                {item.linkText}
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
