import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../styles/colors";

function Tag({ text, onDelete, onDisable }) {
  const [isActive, setIsActive] = useState(true);
  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <Button
      variant="contained"
      sx={{
        height: 40,
        padding: "0.5rem",
        backgroundColor: isActive ? `${colors.secondary}` : `${colors.disable}`,
        color: isActive ? "black" : "white",
        width: "fit-content",
        textTransform: "none",
        "&:hover": {
          backgroundColor: isActive
            ? `${colors.secondary}`
            : `${colors.disable}`,
        },
      }}
      // onClick={toggleButton}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <span>{text}</span>
        <IconButton sx={{ padding: "0px" }} onClick={onDelete}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Button>
  );
}

export default Tag;
