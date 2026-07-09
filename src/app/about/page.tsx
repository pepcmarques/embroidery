import Image from 'next/image';
import BuyMeACoffeeButton from '@/components/BuyMeACoffee';

export default function About() {
  return (
    <div
      className="bg-embroidery-surface"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      {/* About Section */}
      <section id="about" className="py-16 gap-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-embroidery-primary mb-4">
            About Us
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {/* Rachel */}
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
                <p className="text-embroidery-primary text-xl font-bold mt-2">
                  Rachel
                </p>
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

          {/* Giulia */}
          <div className="flex gap-6 bg-embroidery-background rounded-lg shadow-md p-6 mb-8">
            {/* Profile Image - Floated Left */}
            <div className="relative">
              <div className="float-left mr-6 mb-4">
                <div className="relative w-44 h-44 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/images/Giulia-Embroidery2.png"
                    alt="Giulia - Embroidery Artist"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
                <p className="text-embroidery-primary text-xl font-bold mt-2">
                  Giulia
                </p>
              </div>

              {/* About Text - Wraps Around Image */}
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                Embroidery is my way of slowing down and finding calm in the
                middle of busy days. Every stitch reminds me to be patient,
                embrace imperfections, and enjoy the process as much as the
                finished piece.
              </p>
              <p className="text-embroidery-secondary text-2xl leading-relaxed">
                I hope each piece carries a little warmth, comfort, and joy into
                your home. When I’m not embroidering, you’ll usually find me
                spending time with my husband and our dog, enjoying nature, or
                being with family and friends. I live in Vancouver, where I work
                in supportive housing, helping people rebuild stability and
                hope. I’m also working toward my dream of becoming a physician.
                Creating with my hands is one of the ways I recharge, and I’m
                grateful to share that part of myself with you.
              </p>
            </div>
          </div>

          {/* Juliana */}
          <div className="flex gap-6 bg-embroidery-background rounded-lg shadow-md p-6 mb-8">
            {/* Profile Image - Floated Left */}
            <div className="relative">
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
                <p className="text-embroidery-primary text-xl font-bold mt-2">
                  Juliana
                </p>
              </div>

              {/* About Text - Wraps Around Image */}
              <p className="text-embroidery-secondary text-2xl leading-relaxed"></p>
              <p className="text-embroidery-secondary text-2xl leading-relaxed"></p>
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
