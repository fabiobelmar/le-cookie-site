import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PinnedSceneProps {
  id: string;
  image: string;
  headline: string;
  cta?: string;
  ctaLink?: string;
  zIndex: number;
}

const PinnedScene = ({ id, image, headline, cta, ctaLink, zIndex }: PinnedSceneProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const content = contentRef.current;
    const ctaButton = ctaRef.current;
    if (!section || !bg || !content) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=125%',
          pin: true,
          scrub: 0.7,
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bg,
        { scale: 1.1, y: '8vh', opacity: 0.7 },
        { scale: 1, y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        content,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      if (ctaButton) {
        scrollTl.fromTo(
          ctaButton,
          { y: '12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );
      }

      // SETTLE (30% - 70%): Hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        content,
        { y: 0, opacity: 1 },
        { y: '-16vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (ctaButton) {
        scrollTl.fromTo(
          ctaButton,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        bg,
        { scale: 1, y: 0 },
        { scale: 1.07, y: '-7vh', ease: 'none' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    if (ctaLink) {
      if (ctaLink.startsWith('#')) {
        const element = document.getElementById(ctaLink.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative w-full h-screen overflow-hidden"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <div ref={bgRef} className="absolute inset-0 z-[1]">
        <img
          src={image}
          alt={headline}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-[2] vignette-overlay" />

      {/* Content */}
      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-[980px]">
          <h2
            ref={contentRef}
            className="heading-display text-cream"
            style={{ marginTop: '4vh' }}
          >
            {headline}
          </h2>

          {cta && (
            <button
              ref={ctaRef}
              onClick={handleCtaClick}
              className="btn-primary mt-10 inline-flex items-center gap-2"
            >
              {cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PinnedScene;
