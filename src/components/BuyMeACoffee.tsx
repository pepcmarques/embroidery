'use client';
import Image from 'next/image';

export default function BuyMeACoffeeButton() {
  return (
    <a
      href="https://www.buymeacoffee.com/embroideringwords"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        //src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        src="/images/support-us.png"
        alt="Support Us"
        width={250}
        height={100}
      />
    </a>
  );
}
