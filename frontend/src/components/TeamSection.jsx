import Aryan from '../assets/AryanGupta.png';
import Prakhar from '../assets/PrakharParashar.jpg';
import Yash from '../assets/YashTekavade.jpeg';
import Margi from '../assets/MargiYadav.jpg';
import John from '../assets/JohnThomas.jpg';
import Kushal from '../assets/KushalGupta.jpeg';
import Vaibhav from '../assets/VaibhavSharma.jpg';
import Sumith from '../assets/Sumith.jpg';
import Mayur from '../assets/mayur.png';
import Saubhagya from '../assets/Saubhagya.png';
import Gaurav from '../assets/GauravBind.png';

const teamMembers = [
  { src: Aryan, name: "Aryan Gupta", title: "Founder and CEO" },
  { src: Gaurav, name: "Gaurav Bind" },
  { src: Prakhar, name: "Prakhar Parashar" },
  { src: Yash, name: "Yash Tekavade" },
];

const TeamSection = () => {
  return (
    <div className="bg-blue-900 text-white py-12 md:h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Meet the Team</h2>
        <p className="mt-4 px-4 max-w-2xl mx-auto">
          We're a global team of laundry, tech, and logistics experts on a mission to free people
          from laundry so that they can spend more time doing what they <span className="text-yellow-400">💛</span>.
        </p>
        <p className="mt-2 font-semibold text-lg">TEAM ANDES</p>
      </div>

      <div className="flex flex-col items-center">
        {/* Aryan's Image */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 overflow-hidden mx-auto mb-8">
          <div className="relative group">
            <img
              src={Aryan}
              alt="Aryan Gupta"
              className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <span className="text-white text-center">
                Aryan Gupta
                <span className="block text-sm">Founder and CEO</span>
              </span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <span className="block font-bold">Aryan Gupta</span>
            <span className="block text-sm">Founder and CEO</span>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 justify-center">
          {teamMembers.slice(1).map((member, index) => (
            <div
              key={index}
              className="relative w-32 h-32 md:w-48 md:h-48 overflow-hidden mx-auto"
            >
              <div className="relative group">
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full shadow-lg transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                  <span className="text-white text-center">
                    {member.name}
                    {member.title && (
                      <span className="block text-sm">{member.title}</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="block font-bold">{member.name}</span>
                {member.title && (
                  <span className="block text-sm">{member.title}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;