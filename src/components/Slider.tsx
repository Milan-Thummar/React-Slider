import { useState } from "react";
import { Product } from "../types/Product";
import SlideImage from "./SlideImage";
import "../styles/Slider.scss";
import SlideContent from "./SlideContent";

interface SliderProps {
  products: Product[];
}

const Slider: React.FC<SliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="slider">
      <div className="slider__overlay"></div>
      <div className="slider__slides">
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
    </div>
  );
};

export default Slider;
