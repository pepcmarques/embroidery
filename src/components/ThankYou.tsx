import Image from 'next/image';
import Link from 'next/link';

export function ThankYou() {
  return (
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
              src="/images/CIFLogo.png"
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
          <Link href="https://www.kitshouse.org" target="_blank">
            <Image
              src="/images/kitslogo.png"
              alt="Kitsilano Neighbourhood House"
              width={170}
              height={150}
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
  );
}
