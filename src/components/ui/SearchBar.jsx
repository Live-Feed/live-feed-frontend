import React from "react";
import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SearchBar() {
  return (
    <Box width={570}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="검색어를 입력하세요"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AddIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
