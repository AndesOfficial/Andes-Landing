import first from "../assets/first.png";

const LaundryService = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      {" "}
      {/* Image and Instructions Section */}
      <div className="md:w-1/2 md:pr-4 flex flex-col justify-center items-center relative">
        <img
          src={first}
          alt="Woman examining clothes"
          className="hidden md:block w-full md:w-full md:h-[500px] object-cover rounded-lg mb-4"
        />
      </div>
      {/* Text Section */}
      <div className="md:w-1/2 md:pl-32 mt-4 md:mt-0 flex flex-col justify-center md:pb-6">
        <h2 className="text-xl text-gray-500 uppercase mb-2">
          Freedom from Laundry
        </h2>
        <h1 className="text-3xl font-semibold md:text-4xl md:font-bold mb-6">
          A laundry service designed <br /> for you
        </h1>
        <p className="text-xl mb-6">
          Never worry about staining your favorite shirt. <br /> We offer
          laundry, dry cleaning, and ironing at a schedule that <br /> fits your
          lifestyle.
        </p>
      </div>
    </div>
  );
};

export default LaundryService;
