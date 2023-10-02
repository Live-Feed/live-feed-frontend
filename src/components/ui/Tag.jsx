import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../styles/colors";

function Tag({ text }) {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      variant="contained"
      sx={{
        height: 40,
        backgroundColor: isActive ? `${colors.secondary}` : `${colors.disable}`,
        color: isActive ? "black" : "white",
        width: "fit-content",
        "&:hover": {
          backgroundColor: isActive
            ? `${colors.secondary}`
            : `${colors.disable}`,
        },
      }}
      onClick={toggleButton}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{text}</span>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
    </Button>
  );
}

export default Tag;
