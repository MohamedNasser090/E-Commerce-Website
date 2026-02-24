import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../../components/slideProducts/Product";
import "./category-page.css";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import PageTransition from "../../components/PageTransition";

function CategoryPage() {
  const { category } = useParams();

  const [categoryProducts, setCategoryProducts] = useState([]);
console.log("categoryProducts", categoryProducts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => setCategoryProducts(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [category]);
  return (
    <PageTransition key={category}>
      <div className="category-products">
      {loading ? (
        <SlideProductLoading />
      ) : (
        <div className="container">
          <div className="top_slide">
            <h2>{category} : {categoryProducts.limit}</h2>
            <p>Fast performance, stunning cameras, and long-lasting battery.</p>
          </div>
          <div className="products">
            {categoryProducts.products.map((item, indx) => (
              <Product item={item} key={indx} />
            ))}
          </div>
        </div>
      )}
    </div>
    </PageTransition>
  );
}

export default CategoryPage;
