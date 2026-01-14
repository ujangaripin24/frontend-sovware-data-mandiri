import React, { useCallback, useEffect, useState } from 'react'
import Image1 from './../assets/carousel/carousel-1.png'
import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Image } from '@heroui/react';

const IMAGES = [
  Image1,
  Image1,
  Image1,
];
const LoginCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000, stopOnInteraction: false })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);
  return (
    <>
      <div className='flex flex-col items-center w-full gap-y-6'>
        <div className="w-full overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {IMAGES.map((src, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] min-w-0 h-64 md:h-[400px]"
              >
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="object-contain w-full h-full"
                  radius="none"
                  removeWrapper
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-3 mt-4">
          {IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-black/50 scale-125" : "bg-white/50"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="text-center text-white">
          <h2 className="text-[24px] font-semibold">Building Happiness, Shaping Futures</h2>
          <p className="text-sm opacity-90">Where joy meets learning, and dreams take flight...</p>
        </div>
      </div>
    </>
  )
}

export default LoginCarousel