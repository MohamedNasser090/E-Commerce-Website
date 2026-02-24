import React from "react";

function ProductImages({product}) {
  console.log("product: " , product);
  
  return (
    <div className="imgs-item">
      <div className="big-img">
        <img id="bg-img" src={product.images[0]} alt="" />
      </div>
      <div className="small-img">
        {product.images.map((src, indx) => (
          <img
            key={indx}
            src={src}
            alt={product.title}
            onClick={() => (document.querySelector("#bg-img").src = src)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
