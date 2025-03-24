import Slider from "react-slick";

import { Ring } from "../types/ring";

interface RingCarouselProps {
  rings: Ring[];
}

export function RingCarousel({ rings }: RingCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="w-full">
      {rings.length > 1 ? (
        <Slider {...settings}>
          {rings.map((ring) => (
            <div key={ring.id} className="relative outline-none">
              <img
                src={ring.imageUri}
                alt={ring.name}
                className="w-full h-[400px] object-contain outline-none"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h2 className="text-xl font-bold">{ring.name}</h2>
                <p className="text-sm">{ring.power}</p>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div key={rings[0].id} className="relative outline-none">
          <img
            src={rings[0].imageUri}
            alt={rings[0].name}
            className="w-full h-[400px] object-contain outline-none"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-xl font-bold">{rings[0].name}</h2>
            <p className="text-sm">{rings[0].power}</p>
          </div>
        </div>
      )}
    </div>
  );
}
