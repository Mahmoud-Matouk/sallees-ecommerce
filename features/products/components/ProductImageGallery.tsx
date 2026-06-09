'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  variant?: 'gallery' | 'card';
  isHovered?: boolean;
}

export function ProductImageGallery({
  images,
  title,
  variant = 'gallery',
  isHovered = false,
}: ProductImageGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const isCard = variant === 'card';

  // Gallery variant: Sync selected thumbnail with carousel
  React.useEffect(() => {
    if (!api || isCard) {
      return;
    }

    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api, isCard]);

  // Card variant: Auto-play when hovered
  React.useEffect(() => {
    if (!api || !isCard || !isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 800);

    return () => clearInterval(interval);
  }, [api, isCard, isHovered]);

  // Card variant: Smoothly reset back to the cover image when hover ends
  React.useEffect(() => {
    if (!api || !isCard || isHovered) return;

    api.scrollTo(0);
  }, [api, isCard, isHovered]);

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!api) return;
      api.scrollTo(index);
      setSelectedIndex(index);
    },
    [api]
  );

  if (isCard) {
    return (
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square w-full">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative w-full">
        <Carousel setApi={setApi} opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-500"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <Button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:size-20 ${
                index === selectedIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
