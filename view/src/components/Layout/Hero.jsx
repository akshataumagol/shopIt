import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg1 from '../../assets/Banner1.webp'; 
import heroImg2 from '../../assets/Banner2.png';
import heroImg3 from '../../assets/Banner3.jpg'; 

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [heroImg1, heroImg2, heroImg3];

    const prevImage = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextImage = () => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000);

        // Clear interval on unmount
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className='relative w-full h-[400px] md:h-[600px] lg:h-[750px] overflow-hidden'>
            
            {/* Slider Image */}
            <img
                src={images[currentIndex]}
                alt="Hero"
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center text-white p-6'>
                <h1 className='text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter uppercase mb-4'>
                    Dream Collections                </h1>
                <p className='text-sm md:text-lg mb-6'>
                    Explore our exclusive collection of travel essentials. Everything you need for the perfect trip!
                </p>
                <Link to="/shop" className='bg-white hover:bg-red-700 text-gray-950 px-6 py-3 rounded-sm text-lg'>
                    Shop Now
                </Link>
            </div>

            {/* Left / Right Buttons */}
            <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-20"
            >
                &#8592;
            </button>
            <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 z-20"
            >
                &#8594;
            </button>
        </section>
    );
}

export default Hero;
