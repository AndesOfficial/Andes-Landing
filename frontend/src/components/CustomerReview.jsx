/* eslint-disable react/prop-types */

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Aditya Sharma",
      text: "Andes always delivers my laundry on time! Their 2-hour service is perfect for busy days. The quality of cleaning is exceptional.",
      rating: 5,
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/male/66.jpg",
    },
    {
      name: "Meera Patel",
      text: "I've been using Andes for a while now and I'm very happy with their service. Their staff is professional and courteous.",
      rating: 5,
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/female/1.jpg",
    },
    {
      name: "Rajesh Kumar",
      text: "Fast and stress-free service. Their door-step pickup and delivery makes life so much easier. Highly recommend!",
      rating: 5,
      imageUrl: "https://xsgames.co/randomusers/assets/avatars/male/55.jpg",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-6xl mx-auto p-4 sm:p-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-900">
          Our Happy Customers
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Rated excellent <span className="text-yellow-500">★★★★★</span> by our users
        </p>
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 justify-center px-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 mx-auto w-full sm:w-auto min-w-full md:min-w-0 relative"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-blue-100 overflow-hidden">
                  <img
                    src={review.imageUrl}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-blue-900 mb-2">{review.name}</h4>
                <div className="text-yellow-400 text-lg mb-4">
                  {"★".repeat(review.rating)}
                </div>
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-2 text-6xl text-blue-200 opacity-50">"</span>
                <p className="text-gray-700 text-lg leading-relaxed relative z-10 italic">
                  {review.text}
                </p>
                <span className="absolute -bottom-4 -right-2 text-6xl text-blue-200 opacity-50">"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
