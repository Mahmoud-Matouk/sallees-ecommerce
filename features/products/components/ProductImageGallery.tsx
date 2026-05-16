"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
}

export function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Image
          src={images[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-500"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative size-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 sm:size-20 ${
                index === selectedIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
