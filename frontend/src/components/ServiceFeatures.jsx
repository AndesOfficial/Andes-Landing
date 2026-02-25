import { FaTshirt, FaWater, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const ServiceFeatures = () => {
  return (
    <div className="text-center py-2 bg-transparent md:mb-4">
      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-slate-800 leading-tight">
        We Collect, Clean and Deliver
        <br className="hidden lg:inline" /> your laundry and dry cleaning.
      </motion.h2>

      {/* Icon Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mt-6">

        {/* Icon 1 */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaHeadset className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-slate-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            24/7 Support
          </span>
        </motion.div>

        {/* Vertical Divider (Desktop) */}
        <motion.div variants={itemVariants} className="hidden md:block h-12 w-px bg-slate-200"></motion.div>

        {/* Icon 2 */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaWater className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-slate-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            Free Pickup & Delivery
          </span>
        </motion.div>

        {/* Vertical Divider (Desktop) */}
        <motion.div variants={itemVariants} className="hidden md:block h-12 w-px bg-slate-200"></motion.div>

        {/* Icon 3 */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center gap-4 group">
          <div className="bg-brand/10 p-4 rounded-full group-hover:bg-brand/20 transition-colors">
            <FaTshirt className="text-brand text-3xl group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-slate-800 text-lg md:text-xl font-bold max-w-[200px] md:max-w-none">
            24Hr Turnaround
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ServiceFeatures;