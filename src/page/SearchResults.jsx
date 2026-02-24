import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import SlideProductLoading from "../components/slideProducts/SlideProductLoading";
import Product from "../components/slideProducts/Product";

function SearchResults() {
  const query = new URLSearchParams(useLocation().search).get("query");

  const [result, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("result: ", result);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`,
        );
        const data = await res.json();
        setResults(data.products || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="category-products">
        {loading ? (
          <SlideProductLoading key={query}/>
        ) : (
          <div className="container">
            <div className="top_slide">
              <h2>
                {result.length > 0? `results For : ${query}` : `No Result`}
              </h2>
            </div>
            <div className="products">
              {result.map((item, indx) => (
                <Product item={item} key={indx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResults;
