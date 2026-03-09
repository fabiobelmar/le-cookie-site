import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;
    if (!footer || !content) return;

    const ctx = gsap.context(() => {
      const elements = content.querySelectorAll('.footer-item');
      gsap.fromTo(
        elements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-cream py-16 lg:py-20 z-[110] border-t border-teal-deep/8"
    >
      <div ref={contentRef} className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 lg:gap-16">
          {/* Brand */}
          <div className="footer-item">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-serif text-2xl lg:text-3xl text-teal-deep tracking-tight hover:text-teal transition-colors mb-4 block"
            >
              Le Cookie
            </button>
            <p className="body-text text-teal-deep/60 max-w-[280px]">
              Gourmet cookies, baked with patience and passion.
            </p>
          </div>

          {/* Links */}
          <div className="footer-item flex flex-wrap gap-10 lg:gap-16">
            <div>
              <h4 className="label-text text-teal-deep mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => scrollToSection('products')}
                    className="body-text text-teal-deep/70 hover:text-teal transition-colors"
                  >
                    Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('order')}
                    className="body-text text-teal-deep/70 hover:text-teal transition-colors"
                  >
                    Order
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('footer')}
                    className="body-text text-teal-deep/70 hover:text-teal transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="label-text text-teal-deep mb-4">Social</h4>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 body-text text-teal-deep/70 hover:text-teal transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @lecookie
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item mt-14 pt-8 border-t border-teal-deep/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-teal-deep/50">
            &copy; {new Date().getFullYear()} Le Cookie. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-xs text-teal-deep/50 hover:text-teal transition-colors">
              Privacy Policy
            </button>
            <button className="text-xs text-teal-deep/50 hover:text-teal transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
