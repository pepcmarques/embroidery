import { WorkshopGrid } from '../../components/WorkshopGrid';

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen bg-embroidery-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Marpole Neighbourhood House
            </h1>
          </div>
        </div>
      </div>

      {/* Workshops Grid */}
      <WorkshopGrid />
    </div>
  );
}
