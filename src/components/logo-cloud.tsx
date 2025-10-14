import Image from "next/image";
import { InfiniteSlider } from "./motion-primitives/infinite-slider";
import { ProgressiveBlur } from "./motion-primitives/progressive-blur";

export const LogoCloud = () => {
  return (
    <section className="py-8 md:py-16" aria-label="Partner and sponsor logos">
      <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="inline md:max-w-44 md:border-r md:pr-6">
            <p className="text-end text-sm">Powering the best Deejays</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <div className="flex">
                <Image
                  className="mx-auto h-12 w-auto object-contain"
                  src="/images/fightology.webp"
                  alt="Fightology logo"
                  height="48"
                  width="200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex">
                <Image
                  className="mx-auto h-12 w-auto object-contain"
                  src="/images/reborn_logo.png"
                  alt="Reborn logo"
                  height="48"
                  width="200"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </InfiniteSlider>

            <div className="from-background absolute inset-y-0 left-0 w-20"></div>
            <div className="from-background absolute inset-y-0 right-0 w-20"></div>
            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
