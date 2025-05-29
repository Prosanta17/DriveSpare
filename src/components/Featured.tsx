interface FeaturedContent {
  title: string;
  text: string;
  img: string;
}

const Featured: React.FC = () => {
  const content: FeaturedContent[] = [
    {
      title: "Search & Filter Cars",
      text: "Find the right car that fits your budget and needs with powerful filtering. Browse through our extensive collection of vehicles, filter by price range, make, model, year, mileage, and more. Get detailed information about each car's features, specifications, and history to make an informed decision.",
      img: "https://res.cloudinary.com/dwerpzxom/image/upload/v1748508295/search_filter_cars_mosou7.jpg",
    },
    {
      title: "Compare Models",
      text: "Compare different car models side by side to make the best choice. View detailed specifications, performance metrics, safety features, and user reviews in an easy-to-read format. Our comparison tool helps you understand the key differences between vehicles, making your decision process simpler and more informed.",
      img: "https://res.cloudinary.com/dwerpzxom/image/upload/v1748508572/pexels-pixabay-164634_jyget1.jpg",
    },
  ];

  return (
    <section className="bg-gray-50">
      {content.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } items-center md:gap-8`}
        >
          <img
            src={item.img}
            alt={item.title}
            className="w-full md:w-1/2 shadow"
          />
          <div className="md:w-1/2 p-6 text-center md:text-left">
            <h3 className="text-3xl font-oswald font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Featured;
