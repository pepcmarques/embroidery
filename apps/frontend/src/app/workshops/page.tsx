import Link from 'next/link';
import Image from 'next/image';
import workshopsData from '../../data/workshops.json';

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Workshops</h1>
            <p className="text-xl">
              Discover our embroidery workshops and registration options
            </p>
          </div>
        </div>
      </div>

      {/* Workshops Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopsData.workshops.map((workshop, index) => (
            <div
              key={workshop.id || index}
              className="bg-embroidery-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">
                <Image
                  src={workshop.image}
                  alt={workshop.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-embroidery-neutral mb-4">
                {workshop.name}
              </h3>
              <p className="text-embroidery-secondary mb-6">
                {workshop.message}
              </p>
              <Link
                href={
                  workshop.type === 'registration'
                    ? '/workshops/registration'
                    : '/workshops/mnh'
                }
                className="inline-block bg-embroidery-primary text-white px-4 py-2 rounded-md font-medium hover:bg-embroidery-primary/90 transition-colors"
              >
                {workshop.type === 'registration'
                  ? 'Register'
                  : 'View Workshop'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
