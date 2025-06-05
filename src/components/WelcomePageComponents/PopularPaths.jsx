import PathCard from "./PathCard";
import MathImage from "../../assets/math.jpg";
import CyberSecImage from "../../assets/CyberSec.jpg";
import AiImage from "../../assets/Ai.jpg";
import LoginButton from "./LoginButton";
const PathsInfo = [
  {
    id: 0,
    name: "The Fabulous Calculus: master calculus for ever",
    imageDirectory: MathImage,
    numberOfCourse: 4,
    type: "Mathematics",
    level: "Beginner",
    duration: 20,
  },
  {
    id: 1,
    name: "Hack your neighbor: become Mr.robot",
    imageDirectory: AiImage,
    numberOfCourse: 10,
    type: "Cyber Security",
    level: "Beginner",
    duration: 30,
  },
  {
    id: 2,
    name: "Sekai of Ai: learn Ai to become smarter",
    imageDirectory: CyberSecImage,
    numberOfCourse: 6,
    type: "Artificial intelligence",
    level: "intermediate",
    duration: 34,
  },
];
export default function PopularPaths() {
  return (
    <>
      <div className="popularPaths">
        <h2>Top Learning Paths on our platform</h2>
        <div className="pathsCards">
          <PathCard path={PathsInfo[0]} />
          <PathCard path={PathsInfo[1]} />
          <PathCard path={PathsInfo[2]} />
        </div>
        <LoginButton text={"Start Now"}/>
      </div>
    </>
  );
}
