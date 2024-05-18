import React, { useEffect, useState, useRef } from "react";
import SlideImage from "../components/slideImage/SlideImage";
import SlideContent from "../components/slideContent/SlideContent";
import SliderButtons from "../components/sliderButtons/SliderButtons";
import { Product } from "../types/Product";
import "./Slider.scss";

interface SliderProps {
  products: Product[];
}

const Slider: React.FC<SliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    if (products.length > 0) {
      startInterval();
    }

    return () => {
      stopInterval();
    };
  }, [products]);

  const startInterval = () => {
    stopInterval();
    intervalId.current = setInterval(nextSlide, 3000);
  };

  const stopInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + products.length) % products.length
    );
  };

  const handleBtnClick = (direction: "next" | "prev") => {
    stopInterval();
    direction === "next" ? nextSlide() : prevSlide();
    startInterval();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const touchDiff = touchEndX.current - touchStartX.current;
    if (touchDiff > swipeThreshold) {
      prevSlide();
    } else if (touchDiff < -swipeThreshold) {
      nextSlide();
    }
    startInterval();
  };

  return (
    <div className="slider">
      <div className="slider__overlay"></div>
      <div
        className="slider__slides"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, index) => (
          <SlideImage
            key={product.id}
            src={product.thumbnail}
            alt={product.title}
            isActive={index === currentIndex}
          />
        ))}
      </div>
      <SlideContent products={products} currentIndex={currentIndex} />
      <SliderButtons
        products={products}
        currentIndex={currentIndex}
        handleBtnClick={handleBtnClick}
      />
    </div>
  );
};

export default Slider;
