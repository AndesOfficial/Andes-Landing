const WorkWithUs = () => {
  const items = [
    {
      title: "Careers",
      description: "Check open positions",
      linkText: "Learn more",
      href: "mailto:care@andes.co.in",
    },
    {
      title: "Cleaning partners",
      description: "Want to grow your customer base completely hassle free?",
      linkText: "Learn more",
      href: "#",
    },
    {
      title: "Partner drivers",
      description: "Get flexible slots and fair, competitive fees.",
      linkText: "Learn more",
      href: "#",
    },
    {
      title: "Hotel partnerships",
      description:
        "Offer laundry, ironing & dry cleaning services to your guests.",
      linkText: "Learn more",
      href: "#",
    },
  ];

  return (
    <div className="bg-gray-100 py-12 mb-10">
      <div className="ml-4 mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-8 text-left">
          Want to work with us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <a href={item.href} className="text-blue-600 hover:underline">
                {item.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
