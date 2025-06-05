import "./Welcome.css";
import PopularPaths from "../components/WelcomePageComponents/PopularPaths";
import TrustedBy from "../components/WelcomePageComponents/TrustedBy";
import StartLearn from "../components/WelcomePageComponents/StartLearn";
import WelcomeNav from "../components/WelcomePageComponents/WelcomeNav";
import StudentsWord from "../components/WelcomePageComponents/StudentsWord";
import JoinUSNow from "../components/WelcomePageComponents/JoinUSNow";
import Footer from "../components/WelcomePageComponents/Footer";
function Body() {
  return (
    <>
      <div className="WelcomeBody">
        <StartLearn />
        <TrustedBy />
        <PopularPaths />
        <StudentsWord />
        <JoinUSNow />
      </div>
    </>
  );
}
export default function Welcome() {
  return (
    <>
      <div className="Welcome">

        <WelcomeNav requestedPage={<Welcome />} />
        <Body />
        <Footer />
      </div>
    </>
  );
}
