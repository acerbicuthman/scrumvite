import React, { useEffect, useState } from "react";
import Variant1 from "../../assets/Property 1=Default.png";
import Variant2 from "../../assets/Property 1=Variant2.png";
import Variant3 from "../../assets/Property 1=Variant3.png";
import Variant4 from "../../assets/Frame 1984078024.png";

const ImageSlideShow = () => {
  const images = [Variant1, Variant2, Variant3, Variant4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index}`}
          className={`
            absolute inset-0 w-full h-full  object-cover transition-opacity duration-700 ease-in-out
            ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        />
      ))}
    </div>
  );
};

export default ImageSlideShow;
