import StudentsWordCard from "./StudentsWordCard";
import HighSchooler from "../../assets/physicsStudent.jpg";
import CyberSecAnalist from "../../assets/cyberSecurityAnalist.jpg";
import SWE from "../../assets/ahmedSWE.jpg";
const word = [
  {
    name: "Mohamed",
    field: "Softwear engineer",
    theWord:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad ipsam asperiores rem non labore",
    image: SWE,
  },
  {
    name: "Ahmed",
    field: "Cyber security analist",
    theWord:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad ipsam asperiores rem non labore",
    image: CyberSecAnalist,
  },
  {
    name: "mohanad",
    field: "Physiscs student",
    theWord:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ad ipsam asperiores rem non labore.",
    image: HighSchooler,
  },
];
export default function StudentsWord() {
  return (
    <>
      <div className="studentswords">
        <h2>Hear from our learners</h2>
        <div className="studenstCards">
          <StudentsWordCard word={word[0]} />
          <StudentsWordCard word={word[1]} />
          <StudentsWordCard word={word[2]} />
        </div>
      </div>
    </>
  );
}
