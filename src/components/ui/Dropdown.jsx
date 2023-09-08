import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Dropdown() {
  const [selectedItem, setSelectedItem] = useState("제목/내용");

  const handleDropdownChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <Select value={selectedItem} onChange={handleDropdownChange}>
          <MenuItem value="제목/내용">제목/내용</MenuItem>
          <MenuItem value="제목">제목</MenuItem>
          <MenuItem value="내용">내용</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
