import React, { useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../styles/colors";

function Tag({
  text,
  onDelete,
  onToggle,
  isList = false,
  activeTags,
  status = true,
}) {
  const [isActive, setIsActive] = useState(activeTags.includes(text));

  const toggleButton = (status) => {
    if (status) {
      setIsActive(!isActive);
      onToggle(!isActive, text);
    }
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
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <span onClick={() => toggleButton(status)}>{text}</span>
      </Box>
      {isList ? (
        <></>
      ) : (
        <IconButton sx={{ padding: "0px" }} onClick={() => onDelete(text)}>
          <CloseIcon />
        </IconButton>
      )}
    </Button>
  );
}

export default Tag;
