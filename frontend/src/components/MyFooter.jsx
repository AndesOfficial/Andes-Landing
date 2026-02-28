import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaGooglePlay, FaApple, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
// import appQr from "../assets/appqr.jpeg"; // You can comment this out or keep it if you want to add it back later

const MyFooter = () => {

  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1321] text-slate-400 font-sans border-t border-slate-800/60">

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="container mx-auto px-6 md:px-12 py-10 md:py-12">

        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* ── COLUMN 1: Brand & Contact (Takes up more space) ── */}
          <div className="lg:col-span-4">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight mb-4 inline-block">Andes.</Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Premium laundry and dry cleaning delivered to your doorstep. We give you back your free time.
            </p>

            {/* Contact Info */}
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-slate-500 mt-1 flex-shrink-0" />
                <span className="text-sm">Survey No 124, Paud Rd, Kothrud, Pune 411038</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-slate-500 flex-shrink-0" />
                <a href="tel:+918626076578" className="text-sm hover:text-brand transition-colors">+91 86260 76578</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-slate-500 flex-shrink-0" />
                <a href="mailto:care@andes.co.in" className="text-sm hover:text-brand transition-colors">care@andes.co.in</a>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/andes.now/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand hover:text-white transition-all">
                <FaInstagram size={14} />
              </a>
              <a href="https://www.linkedin.com/company/andesnow/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand hover:text-white transition-all">
                <FaLinkedin size={14} />
              </a>
              <a href="https://wa.me/918626076578" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand hover:text-white transition-all">
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: Company Links ── */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-brand transition-colors">About us</Link></li>
              <li><Link to="/working" className="hover:text-brand transition-colors">How it works</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Services & Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-brand transition-colors">Join the Team</Link></li>
            </ul>
          </div>

          {/* ── COLUMN 3: Legal Links ── */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-5">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/other" className="hover:text-brand transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link to="/other" className="hover:text-brand transition-colors">Damage Policy</Link></li>
              <li><Link to="/andes-assured" className="hover:text-brand transition-colors">Andes Assured</Link></li>
            </ul>
          </div>

          {/* ── COLUMN 4: Newsletter & Apps ── */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe for exclusive offers and laundry tips.</p>

            <form className="flex mb-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800/50 text-white px-4 py-2.5 rounded-l-lg w-full text-sm focus:outline-none focus:ring-1 focus:ring-brand border border-slate-700/50 placeholder:text-slate-500"
                required
              />
              <button type="submit" className="bg-brand text-white px-5 py-2.5 rounded-r-lg hover:bg-brand-dark transition-colors flex-shrink-0">
                <FaPaperPlane size={12} />
              </button>
            </form>
            <p className="text-xs text-slate-500 mb-8">No spam. Unsubscribe anytime.</p>

            {/* Compact App Buttons */}
            <h4 className="text-white font-semibold mb-3 text-sm">Get the App</h4>
            <div className="flex gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.andes.laundry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-brand/50 hover:text-white transition-all">
                <FaGooglePlay size={14} />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] leading-none uppercase text-slate-400">Get it on</span>
                  <span className="text-xs font-semibold leading-tight">Google Play</span>
                </div>
              </a>
              <a href="https://apps.apple.com/in/app/andes/id6747010488" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 hover:border-brand/50 hover:text-white transition-all">
                <FaApple size={16} />
                <div className="flex flex-col text-left">
                  <span className="text-[9px] leading-none uppercase text-slate-400">Download on the</span>
                  <span className="text-xs font-semibold leading-tight">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-slate-800/60 bg-[#070D18]">
        <div className="container mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {currentYear} Andes Laundry Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-500">Made with <FaHeart className="inline text-red-500 text-[10px] mx-0.5" /> in Pune, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;