import React, { useEffect, useState } from "react";
import HeroSlider from "../../components/HeroSlider";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";
const categoris = [
  "tablets",
  "smartphones",
  "mobile-accessories",
  "laptops",
  "mens-watches",
  "sunglasses",
];
function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categoris.map(async (catogory) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${catogory}`,
            );
            const data = await res.json();
            return { [catogory]: data.products };
          }),
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Error Fetching", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  console.log(products);
  console.log(products["smartphones"]);

  return (
    <PageTransition>
      <div>
        <HeroSlider />

        {loading
          ? categoris.map((category) => <SlideProductLoading key={category} />)
          : categoris.map((category) => (
              <SlideProduct
                key={category}
                data={products[category]} //dataaaaaaaaaaaaaaaaaaaaaaa
                title={category.replace("-", " ")}
              />
            ))}
      </div>
    </PageTransition>
  );
}

export default Home;
