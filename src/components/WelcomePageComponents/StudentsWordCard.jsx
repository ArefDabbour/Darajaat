import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
export default function StudentsWordCard({ word }) {
  return (
    <>
      <Card
        sx={{ maxWidth: 345 , backgroundColor:"#1B1344"}}
        style={{ borderRadius: "25px"}}
      >
        ,
        <CardHeader
          avatar={<Avatar alt={word.name} src={word.image} />}
          title={word.name}
          sx={{color: "#D27DF4"}}
          subheader={word.field}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "#F5F5F5" }}>
            {word.theWord}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
