
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, ShoppingBag } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-beige-100 py-12 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-peach-600" />
              <div className="flex items-baseline">
                <span className="text-xl font-bold text-gray-900">Nexus</span>
                <span className="text-xl font-cursive ml-1 text-peach-600">Store</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Finding the best deals across all your favorite e-commerce sites.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-peach-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-peach-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-peach-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-peach-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/clothing" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/category/top-deals" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Top Deals
                </Link>
              </li>
              <li>
                <Link to="/category/skincare" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link to="/category/smart-watches" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Smart Watches
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-peach-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-peach-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">123 Shopping Street</p>
              <p className="mb-2">Deal City, DC 12345</p>
              <p className="mb-2">Email: info@nexusstore.com</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {currentYear} Nexus Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
