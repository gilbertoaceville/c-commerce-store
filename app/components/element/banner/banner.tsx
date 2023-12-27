import Image from "next/image";

export default function Banner() {
  return (
    <aside className="relative bg-gradientPrimary mb-8">
      <div className="mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-center">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            Christmas sale
          </h1>
          <p className="text-lg md:text-xl text-primary mb-2">
            Enjoys discounts on all purchases
          </p>
          <p className="uppercase text-2xl md:text-5xl text-indigo-400 font-bold">
            Get 39% Off
          </p>
        </div>
        <div className="w-1/3 relative aspect-video">
          <Image
            src="/banner.png"
            alt="banner"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </aside>
  );
}
