import React from 'react'
import { useState, useEffect } from "react";
import carousel1 from '../../assets/Property 1=Default.png'
import carousel2 from '../../assets/Property 1=Variant2.png'
import carousel3 from '../../assets/Property 1=Variant3.png'


const Carousel = () => {
const images = [
carousel1,carousel2, carousel3
];


  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  

    return (
        <div className="absolute w-full max-w-4xl mx-auto mb-8 overflow-hidden rounded-lg shadow-lg">
          {/* Slides */}
          <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index}`}
                className="w-full flex-shrink-0 object-cover "
              />
            ))}
          </div>
    
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-r-lg"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-black px-3 py-1 rounded-l-lg"
          >
            ›
          </button>
    
          {/* Dots */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      );
    }
    
    
    

export default Carousel
