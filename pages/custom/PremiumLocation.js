import React, { useState } from 'react'
import Image from "next/image";
import Vaishali from "../../public/images/Vaishali.png";

export default function PremiumLocation() {
  const images = [
    { src:Vaishali, alt: 'Image 1', text: 'Slide 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { src:Vaishali, alt: 'Image 2', text: 'Slide 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { src:Vaishali, alt: 'Image 3', text: 'Slide 3: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };
  

  return (
    <div className='container mx-auto'>
      <h1>Premium Location in Jaipur</h1>
      <div className="relative">
      <Image src={images[currentSlide].src} alt={images[currentSlide].alt} className="w-full h-80" />
      <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white p-4">
        <h2 className="text-lg font-bold">{images[currentSlide].text}</h2>
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-l">
        Prev
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 text-white px-2 py-1 rounded-r">
        Next
      </button>
    </div>      
      </div>
  )
}
