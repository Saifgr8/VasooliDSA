// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link'; // Import Link for navigation

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year dynamically

  return (
    <footer
      className="w-full py-6 mt-auto
                 bg-gray-800 text-white text-center
                 dark:bg-gray-950 dark:text-gray-300
                 shadow-inner" // Added shadow-inner for a subtle effect
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} Vasooli Inc DSA platform.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="text-sm hover:underline text-blue-300 dark:text-blue-400">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:underline text-blue-300 dark:text-blue-400">
            Terms of Service
          </Link>
          <Link href="/about" className="text-sm hover:underline text-blue-300 dark:text-blue-400">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;