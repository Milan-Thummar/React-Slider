import React, { useEffect, useState } from "react";
import "./styles/App.scss";
import { Product } from "./types/Product";
import Slider from "./pages/Slider";
import { fetchData } from "./components/FetchData";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initializeSlider();
  }, []);

  const initializeSlider = async () => {
    setIsLoading(true);
    const data = await fetchData("https://dummyjson.com/products", 5);
    setProducts(data);
    setIsLoading(false);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Slider products={products} />
      )}
    </div>
  );
};

export default App;
