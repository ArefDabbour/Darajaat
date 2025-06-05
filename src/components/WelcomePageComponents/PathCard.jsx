import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { TbPointFilled } from "react-icons/tb";
import { SiLevelsdotfyi } from "react-icons/si";
import { IoMdTime } from "react-icons/io";
export default function PathCard({ path }) {
  return (
    <Card sx={{
      maxWidth: 390,
      backgroundColor: "#1B1344",
    }}>
      <CardMedia
        component="img"
        height="195"
        image={path.imageDirectory}
        alt={path.type}
      />
      <CardContent>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "#F5F5F5" }}
        >
          Learning Path <TbPointFilled /> {path.numberOfCourse} Courses
        </Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: "#D27DF4" }}>
          {path.name}
        </Typography>
        <Divider
          variant="middle"
          component="ul"
          style={{ ListStyleType: "none", marginBottom: "6px" }}
        />
        <Typography
          variant="body2"
          sx={{
            color: "#F5F5F5"
          }}
          component="div"
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <span>{path.type}</span>
          <span>
            <SiLevelsdotfyi />
            {path.level}
          </span>
          <span>
            <IoMdTime />
            {path.duration}Hours
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
}
