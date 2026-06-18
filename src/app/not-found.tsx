export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-embroidery-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-embroidery-neutral mb-4">
          Not Found
        </h2>
        <p className="text-embroidery-secondary mb-6">
          Could not find requested resource
        </p>
        <a
          href="/"
          className="bg-embroidery-primary text-white px-4 py-2 rounded-md hover:bg-embroidery-primary-hover transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
