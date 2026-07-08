import Link from 'next/link';

export default function Resources() {
  const resources = [
    {
      name: 'Vancouver Public Library - Craft & Hobby Digital Resources',
      url: 'https://www.vpl.ca/digital-library/craft-hobby',
    },
    {
      name: 'Vancouver Public Library - Embroidery Resources List',
      url: 'https://vpl.bibliocommons.com/v2/list/display/534329910/3006299297',
    },
    {
      name: 'Embroidering Words Instructions (PDF)',
      url: '/EmbroideringWordsInstructions.pdf',
    },
  ];

  return (
    <div
      className="bg-embroidery-surface"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      {/* Resources Section */}
      <section id="resources" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-embroidery-primary mb-4">
            Resources
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {resources.map((resource, index) => (
            <Link
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-embroidery-secondary hover:text-embroidery-primary transition-colors"
            >
              <div
                className="bg-embroidery-background rounded-lg shadow-md p-6 mb-8"
              >
                {resource.name}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
