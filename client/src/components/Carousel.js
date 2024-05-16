import React, { useState } from 'react';
import exampleImage1 from '../assets/images/exampleimage1.png';
import exampleImage2 from '../assets/images/exampleimage2.png';
import exampleImage3 from '../assets/images/exampleimage3.png';
import leftButton from '../assets/images/leftbutton.png'; // Import left button image
import rightButton from '../assets/images/rightbutton.png'; // Import right button image

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    exampleImage1,
    exampleImage2,
    exampleImage3,
  ];

  const prevSlide = () => {
    const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="carousel">
      <img src={leftButton} alt="Previous" className="carouselButton" onClick={prevSlide} />
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
      <img src={rightButton} alt="Next" className="carouselButton" onClick={nextSlide} />
    </div>
  );
}

export default Carousel;