import { ProductGrid } from '../components/ProductGrid';

export default function Home() {
  return (
    <div className="bg-embroidery-surface">
      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-embroidery-primary mb-4">
            Products
          </h2>
        </div>
        <ProductGrid />
      </section>
    </div>
  );
}
