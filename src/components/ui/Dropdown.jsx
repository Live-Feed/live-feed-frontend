import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function Dropdown(props) {
  const [selectedItem, setSelectedItem] = useState("title,content");

  const handleDropdownChange = (event) => {
    window.localStorage.setItem("type", event.target.value);
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    props.setRequestData({ ...props.requestData, type: selectedItem });
  }, [selectedItem]);

  return (
    <div>
      <FormControl>
        <Select
          value={selectedItem}
          onChange={handleDropdownChange}
          style={{ width: "8rem" }}
        >
          <MenuItem value="title,content">제목/내용</MenuItem>
          <MenuItem value="title">제목</MenuItem>
          <MenuItem value="content">내용</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
