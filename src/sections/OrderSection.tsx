import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Download, Mail, Phone, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OrderSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const ctx = gsap.context(() => {
      // Left content
      gsap.fromTo(
        left,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Right card
      gsap.fromTo(
        right,
        { x: '6vw', opacity: 0, rotate: 1 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { icon: Mail, text: 'hello@lecookie.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Pastry Lane, New York, NY' },
    { icon: Clock, text: 'Mon–Sat • 09:00–18:00' },
  ];

  return (
    <section
      ref={sectionRef}
      id="order"
      className="relative bg-teal-mist py-20 lg:py-28 z-[109]"
    >
      <div className="px-6 lg:px-[6vw]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left Content */}
          <div ref={leftRef} className="max-w-[640px]">
            <h2 className="heading-section text-teal-deep mb-5">
              Order today
            </h2>
            <p className="body-text text-teal-deep/70 mb-8">
              Pick up from the kitchen or get them delivered to your door. Same-day delivery available in select areas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-teal text-cream font-sans font-medium text-sm rounded-full transition-all duration-300 hover:bg-teal-deep"
              >
                <MessageCircle className="w-4 h-4" />
                Order via WhatsApp
              </a>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-teal-deep/20 text-teal-deep font-sans font-medium text-sm rounded-full transition-all duration-300 hover:bg-teal-deep hover:text-cream hover:border-teal-deep">
                <Download className="w-4 h-4" />
                Download menu PDF
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div
            ref={rightRef}
            className="w-full lg:w-[420px] bg-cream/85 backdrop-blur-sm border border-teal-deep/8 p-6 lg:p-8 rounded-sm"
          >
            <h3 className="font-serif text-xl text-teal-deep mb-6">
              Contact us
            </h3>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-teal flex-shrink-0" />
                  <span className="body-text text-teal-deep/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSection;
