import { Product } from "../../types/Product";

export const fetchData = async (
  url: string,
  limit: number
): Promise<Product[]> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const products: Product[] = data.products.slice(0, limit);
    return products;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
