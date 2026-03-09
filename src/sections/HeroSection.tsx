import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.7'
      );

      // Headline (word by word)
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06 },
          '-=0.4'
        );
      }

      // CTA
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.7, duration: 0.5 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([eyebrowRef.current, headlineRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0% - 30%): Hold - already animated on load
      // SETTLE (30% - 70%): Hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-6vh' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headlineText = 'Cookies made slowly, meant to be savored.';
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden z-[100]"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0 }}
      >
        <img
          src="/images/hero-lifestyle.jpg"
          alt="Artisan cookies with coffee"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette-overlay" />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-6"
      >
        <div className="text-center max-w-[980px]" style={{ marginTop: '2vh' }}>
          {/* Eyebrow */}
          <span
            ref={eyebrowRef}
            className="label-text text-cream/90 block mb-6"
            style={{ opacity: 0 }}
          >
            Artisan Cookies
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="heading-display text-cream mb-10"
          >
            {words.map((word, index) => (
              <span key={index} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToProducts}
            className="btn-primary"
            style={{ opacity: 0 }}
          >
            View the menu
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="label-text text-cream/70 text-[10px]">Scroll</span>
        <ChevronDown className="w-4 h-4 text-cream/70 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
