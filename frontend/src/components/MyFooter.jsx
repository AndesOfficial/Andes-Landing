
import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane } from "react-icons/fa";

const MyFooter = () => {

  // This function handles the newsletter subscription.
  // We use e.preventDefault() so the page doesn't reload when the user clicks the button.
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Show a friendly alert to let the user know it worked!
    alert("Thanks for subscribing! We'll keep you updated.");
  };

  // Getting the current year dynamically so we don't have to update it manually every New Year's Eve!
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1321] text-slate-400 py-16 font-sans">
      <div className="container mx-auto px-6 md:px-12">

        {/* Main Footer Layout */}
        {/* I changed this to be 1 column on mobile, 2 on tablet, and 4 on desktop so it doesn't look squashed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* 1. Brand & Social Media Section */}
          <div className="md:col-span-1">
            <Link to="/" className="text-3xl font-bold text-white tracking-tight mb-4 block">Andes.</Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Premium laundry and dry cleaning delivered to your doorstep. We give you back your free time.
            </p>

            {/* Social Icons Container */}
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/andes.now/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/andesnow/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://wa.me/918626076578" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-brand transition-colors">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* 2. Company Links Section */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><Link to="/working" className="hover:text-white transition-colors">How it works</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services & Pricing</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Join the Team</Link></li>
            </ul>
          </div>

          {/* 3. Legal & Support Links Section */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal & Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/other" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacypolicy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/other" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><a href="mailto:care@andes.co.in" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* 4. Newsletter Subscription Section */}
          <div>
            <h4 className="text-white font-bold mb-6">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe for exclusive offers and laundry tips.</p>

            {/* Newsletter Form */}
            <form className="flex" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email"
                className="bg-slate-800 text-white px-4 py-3 rounded-l-xl w-full focus:outline-none focus:ring-2 focus:ring-brand border border-transparent"
                required
              />
              <button type="submit" className="bg-brand text-white px-4 py-3 rounded-r-xl hover:bg-brand-dark transition-colors">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>© {currentYear} Andes Laundry Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {/* Extra footer links could go here later if we need them */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
