export const Footer = () => {
  return (
    <footer className="bg-embroidery-surface border-t border-embroidery-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-embroidery-secondary mb-2">
            Hand made with love. ❤️
          </p>
          <p className="text-sm">
            Contact:{' '}
            <a
              href="mailto:racheltorres.uff@gmail.com"
              className="text-embroidery-primary hover:text-embroidery-primary/80 transition-colors"
            >
              racheltorres.uff@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
