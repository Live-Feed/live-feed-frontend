import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function Dropdown({ requestData, setRequestData }) {
  const [selectedItem, setSelectedItem] = useState(requestData.type);

  const handleDropdownChange = (event) => {
    window.localStorage.setItem("type", event.target.value);
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    // if (localStorage.getItem("type") !== null) {
    //   setRequestData({ ...requestData, type: localStorage.getItem("type") });
    // }
    setRequestData({ ...requestData, type: selectedItem });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);
  return (
    <div>
      <FormControl>
        <Select
          value={selectedItem}
          onChange={handleDropdownChange}
          style={{ width: "8rem", backgroundColor: "white" }}
        >
          <MenuItem value="articleTitle,bodyHtml">제목/내용</MenuItem>
          <MenuItem value="articleTitle">제목</MenuItem>
          <MenuItem value="bodyHtml">내용</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
