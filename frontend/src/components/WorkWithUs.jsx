import { motion } from "framer-motion";
import { FaBriefcase, FaHandshake, FaCarSide, FaHotel, FaArrowRight } from "react-icons/fa";

const WorkWithUs = () => {
  const items = [
    {
      title: "Careers",
      description: "Check open positions and join our rapidly growing operations & tech teams.",
      linkText: "View Openings",
      href: "mailto:care@andes.co.in",
      icon: <FaBriefcase />,
      gradient: "from-blue-500 to-cyan-400",
      shadowColor: "group-hover:shadow-blue-500/20"
    },
    {
      title: "Cleaning Partners",
      description: "Grow your reach completely hassle free. Become an Andes certified partner.",
      linkText: "Become a Partner",
      href: "mailto:care@andes.co.in",
      icon: <FaHandshake />,
      gradient: "from-brand to-indigo-500",
      shadowColor: "group-hover:shadow-brand/20"
    },
    {
      title: "Partner Drivers",
      description: "Get flexible slots, fair competitive fees, and be your own boss on the road.",
      linkText: "Join the Fleet",
      href: "mailto:care@andes.co.in",
      icon: <FaCarSide />,
      gradient: "from-emerald-400 to-teal-500",
      shadowColor: "group-hover:shadow-emerald-500/20"
    },
    {
      title: "Hotel Partnerships",
      description: "Offer premium laundry, ironing & dry cleaning directly to your hotel guests.",
      linkText: "Explore Opportunities",
      href: "mailto:care@andes.co.in",
      icon: <FaHotel />,
      gradient: "from-amber-400 to-orange-500",
      shadowColor: "group-hover:shadow-orange-500/20"
    },
  ];

  return (
    <div className="py-12 md:py-20 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-brand font-extrabold uppercase tracking-widest text-xs md:text-sm mb-4 block bg-blue-50 w-max mx-auto px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
            Opportunities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Want to work with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-blue-400">us?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              className={`block bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-soft hover:shadow-2xl transition-all duration-500 group relative overflow-hidden ${item.shadowColor}`}
              whileHover={{ y: -5 }}
            >
              {/* Subtle Animated Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

              <div className="relative z-10">
                <div className={`mb-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}>
                  <div className="text-2xl">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-600 mb-8 text-sm font-medium leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center text-sm font-bold text-slate-800 uppercase tracking-wider group-hover:text-brand transition-colors duration-300">
                  {item.linkText}
                  <FaArrowRight className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
