import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CookieProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: CookieProduct[] = [
  {
    id: 'classic',
    name: 'Classic Chocolate Chip',
    description: 'Belgian dark chocolate chunks with flaky sea salt',
    price: '$4.50',
    image: '/images/product-classic.jpg',
  },
  {
    id: 'double-chocolate',
    name: 'Double Chocolate',
    description: 'Rich cocoa dough with melted chocolate centers',
    price: '$5.00',
    image: '/images/product-chocolate.jpg',
  },
  {
    id: 'pistachio',
    name: 'Pistachio & White Chocolate',
    description: 'Sicilian pistachios with creamy white chocolate',
    price: '$5.50',
    image: '/images/product-pistachio.jpg',
  },
];

const ProductGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;
    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        header,
        { x: '-8vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Cards animation
      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { y: '10vh', opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-cream py-20 lg:py-28 z-[102]"
    >
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div ref={headerRef} className="max-w-[640px] mb-14 lg:mb-20">
          <h2 className="heading-section text-teal-deep mb-5">
            Signature cookies
          </h2>
          <p className="body-text text-teal-deep/70">
            Small batches, real butter, no shortcuts. Baked in the morning, delivered the same day.
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card group bg-cream border border-teal-deep/8 rounded-sm overflow-hidden transition-all duration-500 hover:shadow-soft hover:border-teal/20"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5 lg:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-serif text-lg lg:text-xl text-teal-deep">
                    {product.name}
                  </h3>
                  <span className="font-serif text-lg text-teal whitespace-nowrap">
                    {product.price}
                  </span>
                </div>
                <p className="body-text text-teal-deep/60 mb-5">
                  {product.description}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-teal-deep/15 text-teal-deep text-sm font-medium rounded-full transition-all duration-300 hover:bg-teal-deep hover:text-cream hover:border-teal-deep">
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                  <button
                    onClick={scrollToOrder}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal text-cream text-sm font-medium rounded-full transition-all duration-300 hover:bg-teal-deep"
                  >
                    Order
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
