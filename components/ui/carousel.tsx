import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  imageUrl: string;
}

interface CarouselProps {
  projects: Project[];
}

const Carousel: React.FC<CarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const getProjectsToShow = () => {
    const projectsToShow = [...projects, ...projects, ...projects]; // Triple the projects array
    const startIndex = currentIndex;
    const endIndex = startIndex + 4; // Show 4 cards (1 fully visible + part of the next on small screens, 2.5 visible on larger screens)
    return projectsToShow.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        carouselRef.current.style.setProperty('--carousel-width', `${width}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden py-12">
      <div
        ref={carouselRef}
        className="flex relative"
        style={{
          '--carousel-width': '100%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        } as React.CSSProperties}
      >
        {getProjectsToShow().map((project, index) => (
          <div key={`${project.id}-${index}`} className="w-full sm:w-[80%] md:w-[45%] flex-shrink-0 px-4 sm:px-6 md:px-8">
            <div className="relative h-80 md:h-96 overflow-hidden rounded-xl bg-gray-300 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-300 hover:opacity-90"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}
            </div>
            <h3 className="text-2xl font-semibold text-white mt-4">{project.title}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={prevSlide}
          className="mx-4 bg-white bg-opacity-20 text-white p-3 rounded-full transition-all duration-300 hover:bg-opacity-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex space-x-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex % projects.length ? 'bg-white w-4' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="mx-4 bg-white bg-opacity-20 text-white p-3 rounded-full transition-all duration-300 hover:bg-opacity-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
