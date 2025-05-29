import { Carousel } from "antd";

interface Testimonial {
  name: string;
  text: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Alice",
      text: "DriveSpare helped me find the perfect car in minutes! The process was so smooth and efficient.",
    },
    {
      name: "John",
      text: "Highly recommend this platform for any car enthusiast. The selection of vehicles and the user-friendly interface made my car search a breeze.",
    },
  ];

  return (
    <section
      className="bg-fixed bg-center bg-cover text-white text-center testimonial-section"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dwerpzxom/image/upload/v1748509617/car_4_tlwne0.png')",
      }}
    >
      <div className="bg-primary bg-opacity-30 py-10 px-4">
        <h2 className="text-3xl font-oswald font-semibold mb-6">
          What Our Users Say
        </h2>
        <Carousel autoplay draggable>
          {testimonials.map((t, idx) => (
            <div key={idx} className="max-w-xl mx-auto p-6 text-white">
              <p className="text-lg italic mb-4">"{t.text}"</p>
              <p className="font-semibold">- {t.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
