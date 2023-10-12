import React, { useState } from "react";

const Images = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(0);
  return (
    <>
      <div className="img-wrapper">
        <div className="big-img">
          <img src={mainImage ? mainImage : images[0]} alt="Main Product" />
        </div>
        <div className="small-img">
          {images.map((item, index) => {
            return <img src={item} key={index} alt={`Thumbnail ${index}`} onClick={() => setMainImage(item)} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Images;
