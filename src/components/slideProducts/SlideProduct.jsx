import React from "react";
import Product from "./Product";
import "../slideProducts/slideProduct.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
function SlideProduct({data, title}) {
  // console.log("data: " ,data);
  
  return (
    <div className="slide_products slide">
      <div className="container">
        <div className="top_slide">
          <h2>{title}</h2>
          <p>Fast performance, stunning cameras, and long-lasting battery.</p>
        </div>

        <Swiper
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper">

          {data.map((item) => (
          <SwiperSlide>  <Product item= {item}/>  </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
}

export default SlideProduct;
