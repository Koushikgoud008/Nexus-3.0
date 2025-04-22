
import React from "react";

interface CategoryBannerProps {
  title: string;
  description: string;
  image: string;
}

const CategoryBanner = ({ title, description, image }: CategoryBannerProps) => {
  return (
    <section className="relative bg-beige-100 overflow-hidden">
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left animate-fade-in">
            <h1 className="heading-xl mb-4 text-black">{title}</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-md">{description}</p>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary animate-slide-in">Shop Now</button>
              <button className="btn-secondary animate-slide-in" style={{ animationDelay: "100ms" }}>Learn More</button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-full overflow-hidden bg-peach-300 border-8 border-white shadow-xl animate-fade-in">
              <img 
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-white rounded-l-full opacity-25"></div>
    </section>
  );
};

export default CategoryBanner;
