import React, { useEffect, useState } from "react";
import { Product } from "./types/Product";
import Slider from "./components/Slider";
import { fetchData } from "./components/FetchData";
import "./styles/App.scss";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    initializeSlider();
  }, []);

  const initializeSlider = async () => {
    const data = await fetchData("https://dummyjson.com/products", 5);
    setProducts(data);
  };

  return <Slider products={products} />;
};

export default App;
