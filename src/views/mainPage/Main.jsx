import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import Dropdown from "../../components/ui/Dropdown";
import SearchBar from "../../components/ui/SearchBar";
import Tag from "../../components/ui/Tag";

import colors from "../../styles/colors";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  gap: 15px;
`;

const TagBox = styled.div`
  display: grid;
  gap: 15px; /* 열 간의 간격 */
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto; /* 가운데 정렬을 위한 마진 */
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(4, 1fr);
`;

const Button = styled.button`
  height: 60px;
  width: 200px;
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border-radius: 10px;
  background-color: ${colors.secondary};
  cursor: pointer;
`;

export default function Main() {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [textArray, setTextArray] = useState([]);

  const [requestData, setRequestData] = useState({
    keyword: JSON.parse(localStorage.getItem("textArray")),
    type: localStorage.getItem("type"),
    size: 10,
    sort: "id-desc",
    lastId: "",
    pit: "",
  });

  const handleDelete = (index) => {
    // 선택한 항목을 배열에서 제거합니다.
    const updatedArray = textArray.filter((_, i) => i !== index);
    setTextArray(updatedArray);

    // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
    localStorage.setItem("textArray", JSON.stringify(updatedArray));
    setRequestData({ ...requestData, keyword: JSON.stringify(updatedArray) });
  };

  return (
    <div>
      <SearchBox>
        <Dropdown requestData={requestData} setRequestData={setRequestData} />
        <SearchBar
          inputText={inputText}
          setInputText={setInputText}
          textArray={textArray}
          setTextArray={setTextArray}
          requestData={requestData}
          setRequestData={setRequestData}
        />
      </SearchBox>
      <TagBox>
        {textArray.map((text, index) => (
          <Tag key={index} text={text} onDelete={() => handleDelete(index)} />
        ))}
      </TagBox>
      <Button
        // disabled={requestData.textArray === null}
        onClick={(e) => navigate("/list", { state: requestData })}
      >
        결과보기
      </Button>
    </div>
  );
}
