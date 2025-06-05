import LoginButton from "./LoginButton";
export default function JoinUSNow() {
  return (
    <>
      <div
        className="CallToAction"
        style={{
          width: "81%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "6%",
          marginBottom: "6%",
        }}
      >
        <h2
          style={{
            fontSize: "50px",
          }}
        >
          Join Thousands To learn new skills
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "21px",
          }}
        >
          Enjoy free access to our current offerings—no charges before, during,
          or after participation. In the future, we may introduce specific
          programs and content with a premium for those seeking specialized
          opportunities.
        </p>
        <LoginButton text={"Join Us for free"} />
      </div>
    </>
  );
}
