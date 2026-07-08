import Image from 'next/image';
import BuyMeACoffeeButton from '@/components/BuyMeACoffee';

export default function About() {
  return (
    <div
      className="bg-embroidery-surface"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-embroidery-primary mb-4">
            About Us
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="bg-embroidery-background rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
              {/* Profile Image - Floated Left */}
              <div className="float-left mr-6 mb-4">
                <div className="relative w-44 h-44 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/Rachel-Embroidery1.jpg"
                    alt="Rachel - Embroidery Artist"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>

              {/* About Text - Wraps Around Image */}
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                My art is my way of connecting with my anxiety. It gives me
                space to be fully present and to understand that imperfections
                are what make it beautiful. Thank you for taking the time to
                appreciate it.
              </p>
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                I welcome you to carry with you the feelings I've gently woven
                into my art. Besides embroidering, I enjoy spending time with my
                family and friends, as well as connecting with colleagues and
                patrons at my work. I live in Vancouver with my husband and my
                son. I work at Vancouver Public Library.
              </p>
            </div>
          </div>

          <div className="bg-embroidery-background rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
              {/* Profile Image - Floated Left */}
              <div className="float-left mr-6 mb-4">
                <div className="relative w-44 h-44 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/Giulia-Embroidery1.jpg"
                    alt="Giulia - Embroidery Artist"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>

              {/* About Text - Wraps Around Image */}
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                Giulia is a passionate embroidery artist who finds solace and
                inspiration in the art of stitching. Canvas and thread become
                her medium for rich narratives, as she draws inspiration from
                the subtle beauty of nature and human experiences.
              </p>
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                By translating fleeting emotions into intricately detailed
                designs, Giulia transforms traditional stitching into a unique
                visual diary where every piece tells a distinct, vibrant story.
              </p>
            </div>
          </div>

          <div className="bg-embroidery-background rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
              {/* Profile Image - Floated Left */}
              <div className="float-left mr-6 mb-4">
                <div className="relative w-44 h-44 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/Juliana-Embroidery1.jpg"
                    alt="Juliana - Embroidery Artist"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>

              {/* About Text - Wraps Around Image */}
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                Juliana is an embroidery artist whose work is characterized by
                its delicate craftsmanship and expressive storytelling. Canvas
                and thread become her medium for rich narratives, as she draws
                inspiration from the subtle beauty of her surroundings and
                personal experiences.
              </p>
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                By translating fleeting memories into intricately detailed
                designs, Juliana transforms traditional stitching into a unique
                visual diary where every piece tells a distinct, heartfelt
                story.
              </p>
            </div>
          </div>

          <div className="bg-embroidery-background rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-embroidery-neutral mb-4">
              Contact
            </h2>
            <p className="text-embroidery-secondary">
              Have questions? Reach out at{' '}
              <a
                href="mailto:racheltorresmail@gmail.com"
                className="text-embroidery-primary hover:underline"
              >
                racheltorresmail@gmail.com
              </a>
              .
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <BuyMeACoffeeButton />
          </div>
        </div>
      </section>
    </div>
  );
}
