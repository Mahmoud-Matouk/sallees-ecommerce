"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ProductSummary } from "../types/product.types";

interface ProductCardProps {
  product: ProductSummary;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {product.category.name}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand */}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.brand.name}
        </span>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`size-3.5 ${
                  i < Math.round(product.ratingsAverage)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsAverage})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold text-foreground">
            EGP {product.price.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Hover overlay gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}
