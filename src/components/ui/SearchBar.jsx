import { useEffect } from "react";
import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function SearchBar(props) {
  useEffect(() => {
    // 로컬 스토리지에서 저장된 배열을 가져옵니다.
    const storedTextArray = JSON.parse(localStorage.getItem("textArray"));
    if (storedTextArray) {
      props.setTextArray(storedTextArray);
    }
  }, [props]);

  const handleInputChange = (event) => {
    props.setInputText(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter" && props.inputText.trim() !== "") {
      // 입력한 텍스트를 배열에 추가합니다.
      const updatedArray = [...props.textArray, props.inputText];
      props.setTextArray(updatedArray);

      // 로컬 스토리지에 배열을 저장합니다.
      localStorage.setItem("textArray", JSON.stringify(updatedArray));

      // api에 보내줄 데이터도 수정합니다.
      props.setRequestData({
        ...props.requestData,
        keyword: JSON.stringify(updatedArray),
      });

      // 입력 필드를 초기화합니다.
      props.setInputText("");
    }
  };
  return (
    <Box width={570}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="검색어를 입력하세요"
        onChange={handleInputChange}
        onKeyPress={handleEnterKey}
        value={props.inputText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleEnterKey}>
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
