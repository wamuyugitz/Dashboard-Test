import React from "react";
import "./Reception.css";
import { Box, Card, Typography } from "@mui/material";

// Defining the types for the props
interface ReceptionItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

interface ReceptionProps {
  data: ReceptionItem[]; // Array of items to display
}

const Reception: React.FC<ReceptionProps> = ({ data }) => {
  return (
    <Box
      className="reception-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      {data.map((item, index) => (
        <Card
          key={index}
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
            borderRadius: "12px",
            backgroundColor: "#f4f4f4",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {item.icon}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", fontSize: 16 }}
            >
              {item.label}
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#556cd6" }}
          >
            {item.value}
          </Typography>
        </Card>
      ))}
    </Box>
  );
};

export default Reception;
