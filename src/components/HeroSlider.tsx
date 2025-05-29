import { Carousel } from "antd";
import { Link } from "react-router-dom";

const HeroSlider: React.FC = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dwerpzxom/image/upload/v1748507072/list_of_cars_aeh9ij.jpg",
      caption: "Find Your Dream Car",
      description:
        "Explore our wide selection of cars and find your dream ride.",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dwerpzxom/image/upload/v1748507441/purchase_car_nxis13.jpg",
      caption: "Fast, Reliable, Affordable",
      description:
        "Experience the best in car buying with our fast, reliable, and affordable services.",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dwerpzxom/image/upload/v1748507606/normal_car_ylox0u.jpg",
      caption: "Drive the Future",
      description:
        "Experience the future of driving with our cutting-edge electric vehicles.",
    },
  ];

  return (
    <div className="w-full h-[500px] overflow-hidden">
      <Carousel autoplay draggable>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[500px]">
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 md:top-1/3 md:left-10 bg-black bg-opacity-60 flex flex-col items-start justify-center p-8 sm:p-16 md:max-w-xl">
              <h3 className="text-white text-4xl font-oswald font-bold">
                {slide.caption}
              </h3>
              <p className="text-white text-lg mt-2">{slide.description}</p>
              <Link
                to="/services"
                className="bg-primary text-white px-5 py-2 rounded-full hover:bg-purple-700 hover:text-white transition duration-300 mt-4"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
