import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../ProductDetails/productDetails.css";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import ProductDetailsLoading from "./ProductDetailsLoading";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import ProductImages from "./ProductImages";
import DetailsItem from "./DetailsItem";
import PageTransition from "../../components/PageTransition";
// import '../../components/slideProducts/slideProduct.css'
function ProductDetails() {
  const { id } = useParams(); //From App.jsx
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    fetch(`https://dummyjson.com/products/category/${product.category}`)
      .then((res) => res.json())
      .then((data) => setCategory(data.products))
      .catch((error) => console.error(error))
      .finally(() => setLoadingCategory(false));
  }, [product]);

  if (loading) return <ProductDetailsLoading />; //Loading Page
  if (!product) return <p>Product Is Not Found</p>;
  return (
    <PageTransition key={id}>
      <div>
      {loading ? (
        <ProductDetailsLoading />
      ) : (
        <div className="item-details">
          <div className="container">
            <ProductImages product={product} />
            <DetailsItem product={product} />
          </div>
        </div>
      )}

      {loadingCategory ? (
        <SlideProductLoading />
      ) : (
        <SlideProduct
          key={product.category}
          data={category}
          title={product.category.replace("-", " ")}
        />
      )}
    </div>
    </PageTransition>
  );
}

export default ProductDetails;
