import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function Dropdown() {
  const [selectedItem, setSelectedItem] = useState("title,content");

  const handleDropdownChange = (event) => {
    window.localStorage.setItem("type", event.target.value);
    setSelectedItem(event.target.value);
  };

  useEffect(() => {
    // 로컬 스토리지에서 저장된 배열을 가져옵니다.
    const storedSort = localStorage.getItem("type");
    if (storedSort) {
      setSelectedItem(storedSort);
    }
  }, []);

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
