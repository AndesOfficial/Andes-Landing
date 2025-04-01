import WhoWeAre from "../components/WhoWeAre";
import TeamSection from "../components/TeamSection";
import AppPromo from "../components/AppPromo";
import WorkWithUs from "../components/WorkWithUs";
import Future from "../components/Future";
import {Helmet} from "react-helmet-async";

const AboutPage = () => {
  return (
    <div>
      <Helmet>
        <title> Andes Laundry - About Us</title>
        <meta name="description" content="Learn more about Andes Laundry, your trusted laundry partner in Pune." />
      </Helmet>
      <WhoWeAre />
      <TeamSection />
      <AppPromo />
      <WorkWithUs />
      <Future />
    </div>
  );
};

export default AboutPage;
