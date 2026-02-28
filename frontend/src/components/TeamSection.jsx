import { FaHeart } from "react-icons/fa";
import Aryan from '../assets/AryanGupta.png';
import Gaurav from '../assets/Gaurav_Bind.jpeg';
import Jeet from '../assets/Jeetzanvar.jpeg';
import Kushal from '../assets/Kushalkumar _graphicdesigner.jpeg';
import Neeyati from '../assets/NeeyatiDharamsey _marketing team.jpeg';
import Nitya from '../assets/Nityajuneja_Marketing team.jpeg';
import Prabjot from '../assets/PrabjotWaryah.jpeg';
import Pranay from '../assets/Pranaysingh.jpeg';
import Sneha from '../assets/Snehajaiswal_marketing team.jpeg';
import Swanandi from '../assets/SwanandiBurute.jpeg';
import Tushar from '../assets/Tushargitte_cinematographer.jpeg';

const teamMembers = [
  { src: Aryan, name: "Aryan Gupta", title: "Founder & CEO" },
  { src: Gaurav, name: "Gaurav Bind", title: "Tech Team Lead" },
  { src: Kushal, name: "Kushal Kumar", title: "Graphic Designer" },
  { src: Neeyati, name: "Neeyati Dharamsey", title: "Marketing Team" },
  { src: Nitya, name: "Nitya Juneja", title: "Marketing Team" },
  { src: Sneha, name: "Sneha Jaiswal", title: "Marketing Team" },
  { src: Tushar, name: "Tushar Gitte", title: "Cinematographer" },
  { src: Jeet, name: "Jeet Zanvar", title: "Operation Manager" },          // TODO: Add title
  { src: Prabjot, name: "Prabjot Waryah", title: "Operation Manager" },    // TODO: Add title
  { src: Pranay, name: "Pranay Singh", title: "Operation Manager" },        // TODO: Add title
  { src: Swanandi, name: "Swanandi Burute", title: "Marketing Team" },   // TODO: Add title
];

const TeamSection = () => {
  return (
    <div className="bg-gradient-to-br from-brand to-blue-900 text-white py-20 md:py-28 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-yellow-300 font-extrabold uppercase tracking-widest text-sm mb-4 block bg-white/10 w-max mx-auto px-5 py-2 rounded-full border border-white/20 shadow-lg">
            Team Andes
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Meet Our Team</h2>
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            We're a global team of laundry, tech, and logistics experts on a mission to free people
            from laundry so that they can spend more time doing what they <FaHeart className="text-yellow-400 inline-block align-middle" />
          </p>
        </div>

        {/* Founder Section - Highlighted */}
        <div className="flex flex-col items-center justify-center mb-20">
          <div className="relative group w-56 h-56 md:w-64 md:h-64 mb-6">
            <div className="absolute inset-0 bg-yellow-400 rounded-3xl rotate-6 opacity-30 blur-xl group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20 relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src={teamMembers[0].src}
                alt={teamMembers[0].name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-white mb-1">{teamMembers[0].name}</h3>
            <p className="text-yellow-300 font-bold uppercase tracking-widest text-sm">{teamMembers[0].title}</p>
          </div>
        </div>

        {/* Other Team Members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
          {teamMembers.slice(1).map((member, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="relative w-full aspect-[4/5] mb-4">
                <div className="absolute inset-0 bg-brand-light rounded-2xl rotate-3 opacity-0 group-hover:opacity-20 blur-md transition-all duration-300"></div>
                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl shadow-xl border-2 border-white/10 transform transition-transform duration-500 group-hover:-translate-y-2 z-10 bg-slate-800">
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-base md:text-lg font-bold text-white mb-1">{member.name}</h3>
                {member.title && (
                  <p className="text-blue-200 font-semibold text-xs uppercase tracking-wider">{member.title}</p>
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