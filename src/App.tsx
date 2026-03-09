import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ProductGrid from './sections/ProductGrid';
import PinnedScene from './sections/PinnedScene';
import OrderSection from './sections/OrderSection';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global snap configuration for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;

            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: "power2.out"
        }
      });
    };

    // Delay to ensure all ScrollTriggers are created
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Product Grid */}
        <ProductGrid />
        
        {/* Section 3: Texture Scene */}
        <PinnedScene
          id="texture-scene"
          image="/images/cookie-macro.jpg"
          headline="Crisp edges. Soft centers. Real chocolate."
          zIndex={103}
        />
        
        {/* Section 4: Stack Scene */}
        <PinnedScene
          id="stack-scene"
          image="/images/cookie-stack.jpg"
          headline="Baked in small batches. Delivered fresh."
          zIndex={104}
        />
        
        {/* Section 5: Ritual Scene */}
        <PinnedScene
          id="ritual-scene"
          image="/images/cookie-coffee.jpg"
          headline="The best cookies are the ones you share."
          cta="Order for delivery"
          ctaLink="#order"
          zIndex={105}
        />
        
        {/* Section 6: Gifting Scene */}
        <PinnedScene
          id="gifting-scene"
          image="/images/gift-box.jpg"
          headline="A little box of happiness."
          zIndex={106}
        />
        
        {/* Section 7: Packaging Scene */}
        <PinnedScene
          id="packaging-scene"
          image="/images/packaging.jpg"
          headline="Packaged with care. Personalized by hand."
          zIndex={107}
        />
        
        {/* Section 8: Bite Scene */}
        <PinnedScene
          id="bite-scene"
          image="/images/cookie-bite.jpg"
          headline="One bite is never enough."
          zIndex={108}
        />
        
        {/* Section 9: Order */}
        <OrderSection />
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
