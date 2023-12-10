import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function Dropdown({ requestData, setRequestData }) {
  const [selectedItem, setSelectedItem] = useState("articleTitle,bodyHtml");

  const handleDropdownChange = (event) => {
    window.localStorage.setItem("type", event.target.value);
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    setRequestData({ ...requestData, type: selectedItem });
  }, [requestData, selectedItem]);

  return (
    <div>
      <FormControl>
        <Select
          value={selectedItem}
          onChange={handleDropdownChange}
          style={{ width: "8rem" }}
        >
          <MenuItem value="articleTitle,bodyHtml">제목/내용</MenuItem>
          <MenuItem value="articleTitle">제목</MenuItem>
          <MenuItem value="bodyHtml">내용</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
