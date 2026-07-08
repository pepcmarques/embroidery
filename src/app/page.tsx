import { ProductGrid } from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="bg-embroidery-surface">
      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <div className="text-center">
            <p className="text-2xl text-embroidery-secondary mb-2">
              Handmade in Vancouver. ❤️
            </p>
            <p className="text-lg">
              Contact:{' '}
              <a
                href="mailto:racheltorres.uff@gmail.com"
                className="text-lg text-embroidery-primary hover:text-embroidery-primary/80 transition-colors"
              >
                racheltorres.uff@gmail.com
              </a>
            </p>
          </div>
        </div>
        <ProductGrid />
      </section>
    </div>
  );
}
