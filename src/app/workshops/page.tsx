import Link from 'next/link';
import Image from 'next/image';
import workshopsData from '../../data/workshops.json';

interface WorkshopData {
  type: string;
  name: string;
  image?: string;
  message: string | string[];
  url?: string;
  data?: string;
  hide?: boolean;
}

export default function WorkshopsPage() {
  const getWorkshopPhotoId = (workshop: WorkshopData): string => {
    if (workshop.data) {
      // Extract ID from data path like "mnh/mnh.json" -> "mnh"
      return workshop.data.split('/')[0];
    }
    return 'mnh'; // Default fallback
  };

  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Workshops</h1>
            <p className="text-xl">
              Let me know if you want to take part of the next workshops.{' '}
              <Link
                href="/subscribe"
                className="text-embroidery-surface p-3 hover:bg-embroidery-secondary transition-colors"
              >
                Click here.
              </Link>{' '}
            </p>
          </div>
        </div>
      </div>

      {/* Workshops Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workshopsData.workshops
            .filter((workshop) => !workshop.hide)
            .map((workshop, index) => (
              <div
                key={index}
                className={`bg-embroidery-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                  workshop.image ? 'h-auto' : 'min-h-64 relative'
                }`}
              >
                {workshop.image && (
                  <div className="mb-4">
                    <Image
                      src={workshop.image}
                      alt={workshop.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                )}
                <h3
                  className={`font-semibold text-embroidery-neutral mb-4 ${
                    workshop.image ? 'text-xl' : 'text-2xl'
                  }`}
                >
                  {workshop.name}
                </h3>
                <div
                  className={`text-embroidery-secondary ${
                    workshop.image ? 'mb-4' : 'mb-4'
                  }`}
                >
                  {Array.isArray(workshop.message)
                    ? workshop.message.map((line, idx) => (
                        <div key={idx} className="mb-2">
                          {line.includes('<') ? (
                            <span dangerouslySetInnerHTML={{ __html: line }} />
                          ) : (
                            line
                          )}
                        </div>
                      ))
                    : workshop.message}
                </div>
                <Link
                  href={
                    workshop.type === 'registration'
                      ? `/workshops/registration/${index}`
                      : `/workshops/photos/${getWorkshopPhotoId(workshop)}`
                  }
                  className={`inline-block bg-embroidery-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-embroidery-primary/90 transition-colors ${
                    workshop.image ? '' : 'absolute bottom-5 left-5'
                  }`}
                >
                  {workshop.type === 'registration'
                    ? 'Register'
                    : 'View Workshop'}
                </Link>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-white justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-2xl font-bold text-embroidery-primary mb-6 text-center">
          Thank you
        </h1>
        <div className="flex flex-col justify-center items-center gap-8 max-w-5xl mx-auto mb-4">
          <div className="flex justify-center items-center gap-12">
            <Link href="https://uwbc.ca" target="_blank">
              <Image
                src="/images/uweologo.png"
                alt="United Way"
                width={200}
                height={150}
              />
            </Link>
            <Link href="https://neighbourhoodsmallgrants.ca" target="_blank">
              <Image
                src="/images/nsglogo.svg"
                alt="Neighbourhood Small Grants"
                width={150}
                height={100}
              />
            </Link>
            <Link href="https://spotlightonmentalhealth.com/cif/" target="_blank">
              <Image
                src="/images/ciflogo.png"
                alt="Consumer Initiative Fund"
                width={150}
                height={100}
              />
            </Link>
          </div>
          <div className="flex justify-center items-center gap-12">
            <Link href="https://marpolenh.org" target="_blank">
              <Image
                src="/images/mnhlogo.png"
                alt="Marpole Neighbourhood House"
                width={200}
                height={150}
              />
            </Link>
            <Link href="https://arbutusnh.org" target="_blank">
              <Image
                src="/images/anhlogo.png"
                alt="Arbutus Neighbourhood House"
                width={160}
                height={100}
              />
            </Link>
            <Link href="https://www.bardonthebeach.org" target="_blank">
              <Image
                src="/images/bardlogo.png"
                alt="Bard on the Beach"
                width={90}
                height={68}
              />
            </Link>
            <Link href="https://www.vpl.ca" target="_blank">
              <Image
                src="/images/vpllogo.svg"
                alt="Vancouver Public Library"
                width={200}
                height={150}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
