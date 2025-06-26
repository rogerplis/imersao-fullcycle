'use client';

import { Image as ProductImage } from '@/types/productType';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImageCarouselProps {
  images: ProductImage[];
}

const ProductImageCarousel: React.FC<ProductImageCarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null; // Ou um placeholder
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative h-96 w-full overflow-hidden rounded-lg">
        <Image
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].alt || 'Product Image'}
          layout="fill"
          objectFit="contain"
          className="transition-opacity duration-300"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={prevImage}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full ml-2 focus:outline-none"
          >
            &#10094;
          </button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={nextImage}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full mr-2 focus:outline-none"
          >
            &#10095;
          </button>
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-3 w-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageCarousel;
