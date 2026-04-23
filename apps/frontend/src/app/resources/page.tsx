export default function Resources() {
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
          <div className="bg-embroidery-background rounded-lg shadow-md p-6">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.vpl.ca/digital-library/craft-hobby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-embroidery-secondary hover:text-embroidery-primary transition-colors"
                >
                  Vancouver Public Library - Craft & Hobby Digital Resources
                </a>
              </li>
              <li>
                <a
                  href="https://vpl.bibliocommons.com/v2/list/display/534329910/3006299297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-embroidery-secondary hover:text-embroidery-primary transition-colors"
                >
                  Vancouver Public Library - Embroidery Resources List
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
