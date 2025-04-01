import { Link } from "react-router-dom";

const MyFooter = () => {
  return (
    <footer className="bg-[#0A1321] text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row justify-center items-center border-b border-gray-600 pb-6 mb-6">
          <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-center">
            <Link to="/book-now" className="hover:text-blue-400">
              Book now
            </Link>
            <Link to="/working" className="hover:text-blue-400">
              How it works
            </Link>
            <Link to="/services" className="hover:text-blue-400">
              Pricing
            </Link>
            <Link to="/about" className="hover:text-blue-400">
              About us
            </Link>
            <Link to="/other" className="hover:text-blue-400">
              Terms & Conditions
            </Link>
            <Link to="/other" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/other" className="hover:text-blue-400">
              Contact
            </Link>
            <Link to="/other" className="hover:text-blue-400">
              Return and Refund Policy
            </Link>
          </nav>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <i className="fab fa-instagram"></i> Mail
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <i className="fab fa-linkedin"></i> Linkedin
          </a>
          <a
            href="https://whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 Andes Inc.</p>
          <p>Powered by Andes.</p>
        </div>
      </div>
    </footer>
  );
};

export default MyFooter;
