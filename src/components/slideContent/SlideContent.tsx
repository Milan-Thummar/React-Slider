import React from "react";
import { Product } from "../../types/Product";
import "./SlideContent.scss";

interface SlideContentProps {
  products: Product[];
  currentIndex: number;
}

const SlideContent: React.FC<SlideContentProps> = ({
  products,
  currentIndex,
}) => {
  return (
    <div className="slide__content">
      {products.map((product, index) => (
        <div
          key={product.id}
          style={{ display: index === currentIndex ? "block" : "none" }}
        >
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <button className="more-info">More Info</button>
          <button className="contact">Contact</button>
        </div>
      ))}
    </div>
  );
};

export default SlideContent;
