import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Spacing from "./Spacing";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from '@mui/icons-material/Info';

export default function ResultCard({ result }) {
  return (
    <Card sx={{ width: 300, height: 350, m: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
            {result["Poem Name"]}
          </Typography>
        </Box>
        <Typography variant="h5" component="div">
          {result["Poem Line"]}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{flexGrow: 1}}> </Box>
          <Typography variant="body2">
            Metaphor Count - <b>{result["Count of the Metaphors"]}</b>
          </Typography>
        </Box>
        {result["Metaphor Present"] === "true" && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Spacing size={10} />
            <Typography variant="h6" component="div">
              {result["Metaphoric Terms"]}
            </Typography>
            <Box sx={{ display: "flex", alignItems:"center" }}>
              <InfoIcon fontSize="10px" sx={{ mr: 0.3 }} />
              <Typography variant="body2">
              Interpretation - {result["Interpretation"]}
              </Typography>
            </Box>
            <Spacing size={5} />
            <Typography variant="body2">
              Source Domain - {result["Source Domain"]}
              <br />
              Target Domain - {result["Target Domain"]}
            </Typography>
            <Spacing size={5} />
            <Typography variant="caption">
              Metaphor Type - <b>{result["Metaphor Type"].toUpperCase()}</b>
            </Typography>
            <Spacing size={5} />
          </Box>
        )}
        <Spacing size={20} />
        <Box sx={{ display: "flex", alignItems: "end" }}>
          <ScheduleIcon fontSize="small" sx={{ mr: 0.3 }} />
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            {result["Year"]}
          </Typography>
          <Spacing size={5} />
          <EditIcon fontSize="small" sx={{ mr: 0.3 }} />
          <Typography sx={{ fontSize: 14 }} color="text.primary">
            {result["Poet"]}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
