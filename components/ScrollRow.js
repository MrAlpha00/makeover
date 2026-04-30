'use client';

import ServiceCard from './ServiceCard';

export default function ScrollRow({ services, rowIndex }) {
  return (
    <div className="relative group">
      {/* Scroll Left Button */}
      <button
        className="scroll-btn scroll-left hidden md:flex"
        onClick={(e) => {
          const container = e.currentTarget.parentElement.querySelector('.scroll-container');
          container.scrollBy({ left: -400, behavior: 'smooth' });
        }}
      >
        ‹
      </button>

      {/* Scroll Right Button */}
      <button
        className="scroll-btn scroll-right hidden md:flex"
        onClick={(e) => {
          const container = e.currentTarget.parentElement.querySelector('.scroll-container');
          container.scrollBy({ left: 400, behavior: 'smooth' });
        }}
      >
        ›
      </button>

      {/* Scrollable Container */}
      <div
        className="scroll-container flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth pb-2 px-1"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(249, 87, 56, 0.3) transparent',
        }}
      >
        {services.slice(rowIndex * 4, rowIndex * 4 + 4).map((service, i) => (
          <div key={service.id} className="flex-shrink-0 w-[280px] sm:w-[300px]">
            <ServiceCard service={service} index={rowIndex * 4 + i} />
          </div>
        ))}
        {/* Duplicate cards for continuous scroll effect */}
        {services.slice(0, 4).map((service, i) => (
          <div key={`dup-${rowIndex}-${i}`} className="flex-shrink-0 w-[280px] sm:w-[300px]">
            <ServiceCard service={service} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
