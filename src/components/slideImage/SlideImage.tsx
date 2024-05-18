import React from "react";
import "./SlideImage.scss";

interface SlideImageProps {
  src: string;
  alt: string;
  isActive: boolean;
}

const SlideImage: React.FC<SlideImageProps> = ({ src, alt, isActive }) => {
  return (
    <img src={src} alt={alt} style={{ display: isActive ? "block" : "none" }} />
  );
};

export default SlideImage;
