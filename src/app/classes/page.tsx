import Link from 'next/link';
import classesData from '../../data/classes.json';
import Image from 'next/image';

interface ClassData {
  type: string;
  name: string;
  image?: string;
  message: string | string[];
  url?: string;
  data?: string;
  hide?: boolean;
}

export default function ClassesPage() {
  const getClassPhotoId = (workshop: ClassData): string => {
    if (workshop.data) {
      // Extract ID from data path like "mnh/mnh.json" -> "mnh"
      return workshop.data.split('/')[0];
    }
    return 'mnh'; // Default fallback
  };

  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-linear-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Classes</h1>
            <p className="text-xl">
              Let me know if you want to take part of the next classes.{' '}
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

      {/* Classes Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classesData.classes
            .filter((workshop) => !workshop.hide)
            .map((workshop, index) => (
              <div
                key={index}
                className={
                  'bg-embroidery-background rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow min-h-64 relative'
                }
              >
                <h3
                  className={
                    'font-semibold text-embroidery-neutral mb-4 text-2xl'
                  }
                >
                  {workshop.name}
                </h3>
                <div className={'text-embroidery-secondary mb-4'}>
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
                    workshop.newTab === true
                      ? workshop.url || '#'
                      : workshop.type === 'registration'
                        ? `/classes/registration/${index}`
                        : `/classes/photos/${getClassPhotoId(workshop)}`
                  }
                  className={
                    'inline-block bg-embroidery-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-embroidery-primary/90 transition-colors absolute bottom-5 left-5'
                  }
                  target={workshop.newTab ? '_blank' : '_self'}
                >
                  {workshop.type === 'registration' ? 'Register' : 'View Class'}
                </Link>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-72">
        <h1 className="text-2xl font-bold text-embroidery-primary mb-6 text-center">
          Thank you
        </h1>
        <div className="flex flex-col justify-center items-center gap-8 max-w-5xl mx-auto mb-4">
          <div className="flex justify-center items-center gap-12">
            <Link href="https://uwbc.ca" target="_blank">
              <Image
                src="/images/kcclogo.jpg"
                alt="Kerrisdale Community Centre"
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
