import React from 'react';

interface FooterProps {
  onTrackOrderClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTrackOrderClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {`
          /* Base styles for the footer - often overridden by Tailwind directly on elements */
          .footer {
            position: relative;
            background: linear-gradient(to bottom, #f5f3ff, #faf5ff, #ffffff); /* Using Tailwind equivalent for gradient if possible, otherwise keep hex */
            border-top: 1px solid #ede9fe; /* Tailwind equivalent: border-t border-purple-100 */
          }
          
          .footer-container {
            max-width: 1600px;
            margin: 0 auto;
            padding: 2rem 1rem 5rem;
          }
          
          /* Mobile Layout (default for Tailwind) */
          .footer-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
          }
          
          .footer-desktop {
            display: none;
          }
          
          /* Desktop Layout */
          @media (min-width: 1024px) {
            .footer-container {
                padding: 2rem 3.5rem 3rem;
            }
            
            .footer-mobile {
                display: none;
            }
            
            .footer-desktop {
                display: block;
            }
            
            .footer-main {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 3rem;
                padding-bottom: 3rem;
                border-bottom: 1px solid #e5e7eb; /* Tailwind equivalent: border-b border-gray-200 */
            }
            
            .footer-brand {
                flex-shrink: 0;
                width: 20rem;
            }
            
            .footer-brand-logo {
                display: inline-block;
                margin-bottom: 1rem;
            }
            
            .footer-brand-text {
                font-size: 1.5rem;
                font-weight: 900;
                letter-spacing: -0.02em;
                color: #111827; /* Tailwind equivalent: text-ink */
                font-family: 'Outfit', 'sans-serif'; /* Using app's default font */
            }
            
            .footer-brand-description {
                font-size: 1rem;
                color: #4b5563; /* Tailwind equivalent: text-gray-600 */
                line-height: 1.625;
            }
            
            .footer-links-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 3rem;
                flex: 1;
            }
            
            .footer-column {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            
            .footer-column-title {
                font-size: 0.875rem;
                font-weight: 700;
                color: #111827; /* Tailwind equivalent: text-ink */
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 1rem;
            }
            
            .footer-column-list {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .footer-column-link {
                font-size: 0.875rem;
                color: #4b5563; /* Tailwind equivalent: text-gray-600 */
                text-decoration: none;
                display: block;
                transition: color 0.2s;
                cursor: pointer;
            }
            
            .footer-column-link:hover {
                color: #FF7F32; /* Tailwind equivalent: text-primary (purple was #7c3aed, changed to primary) */
            }
            
            .footer-social-title {
                font-size: 0.875rem;
                font-weight: 600;
                color: #111827; /* Tailwind equivalent: text-ink */
                margin-bottom: 0.75rem;
                padding-top: 0.5rem;
            }
            
            .footer-social-desktop {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            
            .footer-social-desktop-link {
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 0.5rem;
                border: 2px solid #d1d5db; /* Tailwind equivalent: border-gray-300 */
                display: flex;
                align-items: center;
                justify-content: center;
                color: #4b5563; /* Tailwind equivalent: text-gray-600 */
                text-decoration: none;
                transition: all 0.3s;
            }
            
            .footer-social-desktop-link:hover {
                border-color: #FF7F32; /* Tailwind equivalent: border-primary (purple was #7c3aed, changed to primary) */
                color: #FF7F32; /* Tailwind equivalent: text-primary */
            }
            
            .footer-bottom {
                padding-top: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .footer-bottom-copyright {
                font-size: 0.875rem;
                color: #4b5563; /* Tailwind equivalent: text-gray-600 */
            }
            
            .footer-bottom-links {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                font-size: 0.875rem;
            }
            
            .footer-bottom-link {
                color: #4b5563; /* Tailwind equivalent: text-gray-600 */
                text-decoration: none;
                transition: color 0.2s;
            }
            
            .footer-bottom-link:hover {
                color: #FF7F32; /* Tailwind equivalent: text-primary */
            }
          }
        `}
      </style>
      <footer className="footer bg-gradient-to-b from-purple-50 to-white border-t border-purple-100 mt-10 md:mt-16">
        <div className="footer-container max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
          {/* Mobile Layout */}
          <div className="flex flex-col items-center text-center gap-6 lg:hidden">
            <a href="/" className="footer-logo inline-block">
              <h2 className="footer-logo-text text-2xl font-black tracking-tight text-ink font-sans">
                Lumina<span className="text-primary">.</span>
              </h2>
            </a>

            <p className="footer-slogan text-sm text-gray-600 max-w-xs">
              Your fresh daily essentials delivered to your doorstep.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button onClick={onTrackOrderClick} className="footer-link text-gray-600 hover:text-primary transition-colors font-medium">Track Order</button>
              <span className="footer-separator text-gray-300">•</span>
              <a href="#" className="footer-link text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              <span className="footer-separator text-gray-300">•</span>
              <a href="#" className="footer-link text-gray-600 hover:text-primary transition-colors">Terms</a>
            </div>

            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="footer-social-link w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" aria-label="Messenger" className="footer-social-link w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                <i className="ri-messenger-fill text-lg"></i>
              </a>
              <a href="#" aria-label="WhatsApp" className="footer-social-link w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                <i className="ri-whatsapp-fill text-lg"></i>
              </a>
              <a href="#" aria-label="Phone" className="footer-social-link w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                <i className="ri-phone-fill text-lg"></i>
              </a>
            </div>

            <p className="footer-copyright text-xs text-gray-600">
              © {currentYear} <span className="font-semibold text-ink">Lumina Inc.</span> All rights reserved.
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="footer-main flex items-start justify-between gap-12 pb-12 border-b border-gray-200">
              <div className="footer-brand flex-shrink-0 w-80">
                <a href="/" className="footer-brand-logo inline-block mb-4">
                  <h2 className="footer-brand-text text-2xl font-black tracking-tight text-ink font-sans">
                    Lumina<span className="text-primary">.</span>
                  </h2>
                </a>
                <p className="footer-brand-description text-base text-gray-600 leading-relaxed">
                  Your fresh daily essentials delivered to your doorstep. Quality produce for healthy living.
                </p>
              </div>

              <div className="footer-links-grid grid grid-cols-3 gap-12 flex-1">
                <div className="footer-column flex flex-col gap-4">
                  <h4 className="footer-column-title text-sm font-bold text-ink uppercase tracking-wider mb-4">Explore</h4>
                  <ul className="footer-column-list list-none flex flex-col gap-3">
                    <li><button onClick={onTrackOrderClick} className="footer-column-link text-left">Track My Order</button></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">All Products</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Categories</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">New Arrivals</a></li>
                  </ul>
                </div>

                <div className="footer-column flex flex-col gap-4">
                  <h4 className="footer-column-title text-sm font-bold text-ink uppercase tracking-wider mb-4">Policies</h4>
                  <ul className="footer-column-list list-none flex flex-col gap-3">
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Refund Policy</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Shipping Info</a></li>
                  </ul>
                </div>

                <div className="footer-column flex flex-col gap-4">
                  <h4 className="footer-column-title text-sm font-bold text-ink uppercase tracking-wider mb-4">Contact Us</h4>
                  <ul className="footer-column-list list-none flex flex-col gap-3">
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Help Center</a></li>
                    <li><a href="#" className="footer-column-link text-gray-600 hover:text-primary transition-colors">Email Support</a></li>
                  </ul>
                  <div className="mt-2">
                    <p className="footer-social-title text-sm font-semibold text-ink mb-3 pt-2">Follow Us</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="#" aria-label="Facebook" className="footer-social-desktop-link w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                        <i className="ri-facebook-fill text-lg"></i>
                      </a>
                      <a href="#" aria-label="Messenger" className="footer-social-desktop-link w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                        <i className="ri-messenger-fill text-lg"></i>
                      </a>
                      <a href="#" aria-label="WhatsApp" className="footer-social-desktop-link w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                        <i className="ri-whatsapp-fill text-lg"></i>
                      </a>
                      <a href="#" aria-label="Phone" className="footer-social-desktop-link w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-all duration-300">
                        <i className="ri-phone-fill text-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-bottom pt-8 flex justify-between items-center">
              <p className="footer-bottom-copyright text-sm text-gray-600">
                © {currentYear} <span className="font-semibold text-ink">Lumina Inc.</span> All rights reserved.
              </p>
              <div className="footer-bottom-links flex items-center gap-6 text-sm">
                <a href="#" className="footer-bottom-link text-gray-600 hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="footer-bottom-link text-gray-600 hover:text-primary transition-colors">Terms</a>
                <a href="#" className="footer-bottom-link text-gray-600 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};