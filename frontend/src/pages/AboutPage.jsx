import WhoWeAre from "../components/WhoWeAre";
import TeamSection from "../components/TeamSection";
import AppPromo from "../components/AppPromo";
import WorkWithUs from "../components/WorkWithUs";
import Future from "../components/Future";
import MyFooter from "../components/MyFooter";
const AboutPage = () => {
  return (
    <div>
      <WhoWeAre />
      <TeamSection />
      <AppPromo />
      <WorkWithUs />
      <Future />
      <MyFooter /> {/* Footer stays at the bottom of the page */}

    </div>
  );
};

export default AboutPage;
