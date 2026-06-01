import Link from 'next/link';
import Image from 'next/image';
import ExhibitionsData from '../../data/exhibitions.json';

interface ExhibitionData {
  id: number;
  type: string;
  name: string;
  image?: string;
  message: string | string[];
  url?: string;
  data?: string;
}

export default function ExhibitionsPage() {
  const getExhibitionPhotoId = (Exhibition: ExhibitionData): string => {
    if (Exhibition.data) {
      // Extract the exhibition slug from paths like "exhibitions/mnh/mnh.json" or "mnh/mhn.json".
      const parts = Exhibition.data.split('/').filter(Boolean);
      return parts.length >= 2 ? parts[parts.length - 2] : parts[0];
    }
    return 'mnh'; // Default fallback
  };

  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exhibitions</h1>
            <p className="text-xl">
              Discover our embroidery Exhibitions and registration options
            </p>
          </div>
        </div>
      </div>

      {/* Exhibitions Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ExhibitionsData.exhibitions.map((Exhibition, index) => (
            <div
              key={Exhibition.id || index}
              className={`bg-embroidery-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${
                Exhibition.image ? 'h-auto' : 'min-h-64 relative'
              }`}
            >
              {Exhibition.image && (
                <div className="mb-4">
                  <Image
                    src={Exhibition.image}
                    alt={Exhibition.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <h3
                className={`font-semibold text-embroidery-neutral mb-4 ${
                  Exhibition.image ? 'text-xl' : 'text-2xl'
                }`}
              >
                {Exhibition.name}
              </h3>
              <div
                className={`text-embroidery-secondary ${
                  Exhibition.image ? 'mb-4' : 'mb-4'
                }`}
              >
                {Array.isArray(Exhibition.message)
                  ? Exhibition.message.map((line, idx) => (
                      <div key={idx} className="mb-2">
                        {line.includes('<') ? (
                          <span dangerouslySetInnerHTML={{ __html: line }} />
                        ) : (
                          line
                        )}
                      </div>
                    ))
                  : Exhibition.message}
              </div>
              <Link
                href={`/exhibitions/photos/${getExhibitionPhotoId(Exhibition)}`}
                className={`inline-block bg-embroidery-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-embroidery-primary/90 transition-colors ${
                  Exhibition.image ? '' : 'absolute bottom-5 left-5'
                }`}
              >
                View Exhibition
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
