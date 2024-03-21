import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SearchBar(props) {
  const [isTooltip, setIsTooltip] = useState(false);
  useEffect(() => {
    // 로컬 스토리지에서 저장된 배열을 가져옵니다.
    const storedKeyword = JSON.parse(localStorage.getItem("keyword"));
    if (storedKeyword) {
      props.setKeyword(storedKeyword);
    }
  }, [props]);

  const handleInputChange = (event) => {
    // props.setInputText(event.target.value);
    if (event.target.value.length <= 6) {
      setIsTooltip(false);
      props.setInputText(event.target.value);
    } else setIsTooltip(true);
  };

  const handleEnterKey = () => {
    if (props.inputText.trim() !== "") {
      if (props.keyword.includes(props.inputText)) {
        window.alert("이미 존재하는 태그입니다.");
      } else {
        // 입력한 텍스트를 배열에 추가합니다.
        const updatedKeyword = [...props.keyword, props.inputText];
        props.setKeyword(updatedKeyword);

        // 로컬 스토리지에 배열을 저장합니다.
        localStorage.setItem("keyword", JSON.stringify(updatedKeyword));

        // api에 보내줄 데이터도 수정합니다.
        props.setRequestData({
          ...props.requestData,
          keyword: updatedKeyword,
        });

        // 입력 필드를 초기화합니다.
        props.setInputText("");
      }
    }
  };
  return (
    <Box width={570} sx={{ display: "flex" }}>
      <Tooltip title={isTooltip ? "6자 이하로 입력해주세요" : ""} arrow>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="검색어를 입력하세요"
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              handleEnterKey();
            }
          }}
          sx={{ backgroundColor: "white" }}
          value={props.inputText}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleEnterKey(props.inputText)}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Tooltip>
    </Box>
  );
}

export default SearchBar;
