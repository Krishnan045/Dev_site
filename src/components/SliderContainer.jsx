import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SliderContainer = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="infinite-carousel-container" style={{ position: 'relative' }}>
      <button onClick={() => scroll('left')} className="slider-nav-btn left">
        <ChevronLeft size={24} />
      </button>
      
      <div className="infinite-carousel-slider manual-scroll" ref={scrollRef}>
        {children}
      </div>

      <button onClick={() => scroll('right')} className="slider-nav-btn right">
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default SliderContainer;
