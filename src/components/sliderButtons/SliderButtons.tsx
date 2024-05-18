import React, { useEffect, useState } from "react";
import "./SliderButtons.scss";

interface SliderButtonsProps {
  products: any[];
  currentIndex: number;
  handleBtnClick: (direction: "next" | "prev") => void;
}

const SliderButtons: React.FC<SliderButtonsProps> = ({
  products,
  currentIndex,
  handleBtnClick,
}) => {
  const [lineWidth, setLineWidth] = useState<number>(0);

  useEffect(() => {
    const slidesCount: number = products.length;

    const calculateLineWidth = (slidesCount: number) => {
      let width = 100 / slidesCount;
      if (window.innerWidth >= 480 && width > 20) {
        width = 18;
      }
      setLineWidth(width);
    };

    const updateLineWidth = () => {
      const timeLines =
        document.querySelectorAll<HTMLElement>(".slider__timeline");
      timeLines.forEach((timeLine) => {
        timeLine.style.width = `${lineWidth}%`;
      });
    };

    calculateLineWidth(slidesCount);
    updateLineWidth();

    window.addEventListener("resize", () => {
      calculateLineWidth(slidesCount);
      updateLineWidth();
    });

    return () => {
      window.removeEventListener("resize", () => {
        calculateLineWidth(slidesCount);
        updateLineWidth();
      });
    };
  }, [products.length, lineWidth]);

  return (
    <div className="slider__btn-container">
      <div className="slider__timelines">
        {products.map((_, index) => (
          <div key={index} className="slider__timeline">
            <div
              className="slider__timeline-fill"
              style={{
                transitionDuration: index === currentIndex ? "3s" : "0s",
                width: index === currentIndex ? "100%" : "0",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="slide__prev-next">
        <button className="prev" onClick={() => handleBtnClick("prev")}>
          &#10094;
        </button>
        <button className="next" onClick={() => handleBtnClick("next")}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default SliderButtons;
