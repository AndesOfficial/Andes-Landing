import Aryan from '../assets/AryanGupta.png';
import Girl1 from '../assets/girl1.jpg';
import Boy1 from '../assets/Boy1.jpg';
import Boy2 from '../assets/Boy2.jpg';
import Girl2 from '../assets/girl2.jpg';
import Gaurav from '../assets/Gaurav_Bind.jpeg';

const teamMembers = [
  { src: Aryan, name: "Aryan Gupta", title: "Founder and CEO" },
  { src: Gaurav, name: "Gaurav Bind", title: "Tech Team Lead" },
  { src: Boy1, name: "Pranay Agarwal", title: "Tech Team Lead" },
  { src: Boy2, name: "Pradyumna Deshpande", title: "Designer" },
  { src: Girl1, name: "Nihi Srivastava", title: "Social Media Manager" },
  { src: Girl2, name: "Sneha Sharma", title: "On Ground Lead" },
];

const TeamSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            We're a global team of laundry, tech, and logistics experts on a mission to free people
            from laundry so that they can spend more time doing what they <span className="text-yellow-400">💛</span>
          </p>
          <p className="mt-4 font-semibold text-xl text-yellow-400">TEAM ANDES</p>
        </div>

        {/* Founder Section */}
        <div className="flex justify-center mb-16">
          <div className="relative group">
            <div className="w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-2xl shadow-2xl 
                          transform transition-all duration-500 group-hover:scale-105">
              <img
                src={teamMembers[0].src}
                alt={teamMembers[0].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent 
                            opacity-0 group-hover:opacity-90 transition-opacity duration-300 
                            flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold">{teamMembers[0].name}</h3>
                <p className="text-blue-200">{teamMembers[0].title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
          {teamMembers.slice(1).map((member, index) => (
            <div key={index} className="relative group">
              <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-xl 
                            transform transition-all duration-500 group-hover:scale-105">
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent 
                              opacity-0 group-hover:opacity-90 transition-opacity duration-300 
                              flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold">{member.name}</h3>
                  <p className="text-blue-200 text-sm">{member.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;