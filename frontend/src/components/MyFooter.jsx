import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const MyFooter = () => {
  return (
    <footer className="bg-[#0A1321] text-slate-400 py-16 font-sans">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link to="/" className="text-3xl font-bold text-white tracking-tight mb-4 block">Andes.</Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Premium laundry and dry cleaning delivered to your doorstep. We give you back your free time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand-blue transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link to="/working" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services & Pricing</Link></li>
              <li><Link to="/join-team" className="hover:text-white transition-colors">Join the Team</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal & Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe for exclusive offers and laundry tips.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 text-white px-4 py-3 rounded-l-xl w-full focus:outline-none focus:ring-2 focus:ring-brand-blue border border-transparent"
              />
              <button type="submit" className="bg-brand-blue text-white px-4 py-3 rounded-r-xl hover:bg-blue-600 transition-colors">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© 2024 Andes Laundry Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Made with ❤️ in Pune</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
