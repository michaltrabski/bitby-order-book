import * as React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export interface SellBuy {
  ra: number;
  ca: number;
  sa: number;
  pa: number;
  co: number;
}

interface Props {
  data: SellBuy;
}
export default function MyCard(props: Props) {
  const { ra, ca, co } = props.data;

  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {ra}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ca}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {(ra * ca).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {co}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
