import FeatureLeft from "../components/FeatureLeft";
import FeatureRight from "../components/FeatureRight";
import EnvironmentalFeature from "../components/EnvironmentalFeature";
import QuickCleanFresh from "../components/QuickCleanFresh";
import AboutUsImage from "../assets/aboutus.jpeg";
import CustomerStories from "../components/CustomerStories";
import Schedule from "../components/Schedule";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import card4 from "../assets/card4.png";
import MyFooter from "../components/MyFooter";

const bulletPoints = [
  { icon: "🔗", text: "Book online or with our mobile app" },
  { icon: "🌙", text: "Weekend and evening slots available" },
];

const bulletPoints2 = [
  { icon: "🍃", text: "Zero-emission delivery vehicles" },
  { icon: "💧", text: "Efficient water use" },
  { icon: "❤️", text: "Trustworthy local cleaners" },
];

const Working = () => {
  return (
    <div>
      <QuickCleanFresh />
      <div>
        <FeatureLeft
          title="FLEXIBLE"
          subtitle="1. Schedule your collection"
          description="Plan your day with ease. Choose a collection and delivery time at your convenience."
          imageSrc= {card1}
          bulletPoints={bulletPoints}
        />
        <FeatureRight
          title="ANOTHER TITLE"
          subtitle="2. Another step"
          description="Another description for the second step."
          imageSrc={card2}
          bulletPoints={bulletPoints}
        />

        <FeatureLeft
          title="FLEXIBLE"
          subtitle="3. Schedule your collection"
          description="Plan your day with ease. Choose a collection and delivery time at your convenience."
          imageSrc={card3}
          bulletPoints={bulletPoints}
        />
        <FeatureRight
          title="ANOTHER TITLE"
          subtitle="4. Another step"
          description="Another description for the second step."
          imageSrc={card4}
          bulletPoints={bulletPoints}
        />
      </div>
      <EnvironmentalFeature
        title="A CONVENIENT LAUNDRY SOLUTION"
        subtitle="That helps protect the environment."
        description=""
        bulletPoints={bulletPoints2}
        buttonText="About us"
        imageSrc={AboutUsImage}
      />

      <CustomerStories />
      <Schedule />
      <MyFooter /> {/* Footer stays at the bottom of the page */}
    </div>
  );
};

export default Working;
