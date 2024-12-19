import React from "react";
import HandymanIcon from "@mui/icons-material/Handyman";
import CircleProgress from "../../graphs/CircleProgress";
import { Box, Card, CardContent, Typography } from "@mui/material";

// Defining the types for the props and data
interface AvailabilityItem {
  label: string;
  percentage: number;
}

interface AvailabilityProps {
  data: AvailabilityItem[];
}

const Availability: React.FC<AvailabilityProps> = ({ data }) => {
  return (
    <Box
      className="availability-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        padding: 3,
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          elevation={4}
          sx={{
            width: "100%",
            backgroundColor: "#f4f4f4",
            borderRadius: "16px",
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HandymanIcon sx={{ fontSize: 50, color: "#556cd6" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", fontSize: 16 }}
            >
              {item.label}
            </Typography>
          </Box>
          <CircleProgress percentage={item.percentage} />
        </Card>
      ))}
    </Box>
  );
};

export default Availability;
