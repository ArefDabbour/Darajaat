import LearningImage from "../../assets/learning.jpg";
import LoginButton from "./LoginButton";
export default function StartLearn() {
  return (
    <>
      <div className="startLearn">
        <div className="description">
          <h1>
            Make your carrer better <br /> with Learn
          </h1>
          <p>
            Learn is a platform that helps you LEVELING UP your career by
            providing you by numeros number of course.
            <br /> Join NOW millions of students in their journey for
            greatness!!
          </p>
          <LoginButton text={"Join Us Now!"} />
        </div>
        <img src={LearningImage} alt="learning image" />
      </div>
    </>
  );
}
