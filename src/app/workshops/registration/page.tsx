import Link from 'next/link';
import workshopsData from '../../../data/workshops.json';

export default function RegistrationPage() {
  const registrationItem = workshopsData.workshops.find(
    (item) => item.type === 'registration'
  );
  const registrationUrl = registrationItem?.url || '#';

  return (
    <div className="min-h-screen bg-embroidery-surface">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-embroidery-primary to-embroidery-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Workshop Registration
            </h1>
            <p className="text-xl">Sign up for our embroidery workshops</p>
          </div>
        </div>
      </div>

      {/* Registration Section */}
        <div className="bg-embroidery-surface rounded-lg shadow-md p-8">
          <div className="w-full">
            <iframe
              src={`${registrationUrl}?embedded=true`}
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-md"
            >
              Loading registration form...
            </iframe>
          </div>
        </div>
    </div>
  );
}
