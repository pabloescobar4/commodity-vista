
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 " style={{margin:"80px 30px"}}>
      <div className="container mx-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 ">
          {/* Left column - About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 ">Bitstore</h3>
            <p className="text-gray-400 mb-4">
              Ease of shopping is our main focus. With powerful
              search features and customizable filters, you can
              easily find the products you are looking for.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-theme-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-theme-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-theme-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Middle column - Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-medium mb-4">Get Started</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Platform</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Workout Library</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">App Design</a></li>
              </ul>
            </div>
          </div>

          {/* Right column - Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">Subscribe to Newsletter</h4>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Enter Your Email Here"
                className="bg-gray-800 px-4 py-2 rounded-l-md text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-theme-purple"
              />
              <button className="bg-theme-purple hover:bg-theme-purple-dark text-white px-4 py-2 rounded-r-md text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom copyright */}
        <div className="border-t border-gray-800 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">© 2024 Bitstore</p>
          <div className="flex space-x-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <span>—</span>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <span>—</span>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
