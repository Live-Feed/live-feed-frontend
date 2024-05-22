// eslint-disable-next-line
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "styled-components";

import Dropdown from "../../components/ui/Dropdown";
import SearchBar from "../../components/ui/SearchBar";
import Tag from "../../components/ui/Tag";

import colors from "../../styles/colors";
import Rank from "../../components/ui/Rank";

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
  border: none;
  background-color: ${colors.secondary};
  box-shadow: 1px 1px 5px gray;
  cursor: pointer;
`;

export default function Main() {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const [requestData, setRequestData] = useState({
    keyword: JSON.parse(localStorage.getItem("keyword")),
    type: localStorage.getItem("type"),
    size: 10,
    sort: "id-desc",
    isLast: false,
    lastId: localStorage.getItem("lastId")
      ? localStorage.getItem("lastId")
      : "",
    pit: localStorage.getItem("pit") ? localStorage.getItem("pit") : "",
  });

  const handleDelete = (index, text) => {
    // 선택한 항목을 배열에서 제거합니다.
    let updatedKeyword = keyword.filter((item) => item !== text);
    setKeyword(updatedKeyword);

    let updatedTags = activeTags.filter((item) => item !== text);
    setActiveTags(updatedTags);

    // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
    localStorage.setItem("keyword", JSON.stringify(updatedKeyword));
    localStorage.setItem("activeTags", JSON.stringify(updatedTags));
    setRequestData({ ...requestData, keyword: updatedTags });
  };

  const handleToggle = (index, active, text) => {
    if (active === true) {
      // 입력한 텍스트를 배열에 추가합니다.
      const updatedKeyword = [...activeTags, text];
      setActiveTags(updatedKeyword);

      // 로컬 스토리지에 배열을 저장합니다.
      localStorage.setItem("activeTags", JSON.stringify(updatedKeyword));
    } else {
      // 선택한 항목을 배열에서 제거합니다.
      const updatedTags = activeTags.filter((item) => item !== text);
      setActiveTags(updatedTags);

      // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
      localStorage.setItem("activeTags", JSON.stringify(updatedTags));
      setRequestData({ ...requestData, keyword: updatedTags });
    }
  };

  return (
    <div>
      <SearchBox>
        <Dropdown requestData={requestData} setRequestData={setRequestData} />
        <SearchBar
          inputText={inputText}
          setInputText={setInputText}
          keyword={keyword}
          setKeyword={setKeyword}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
          requestData={requestData}
          setRequestData={setRequestData}
        />
      </SearchBox>
      <TagBox>
        {keyword.map((text, index) => (
          <Tag
            key={index}
            text={text}
            onDelete={() => handleDelete(index, text)}
            onToggle={(active, text) => handleToggle(index, active, text)}
            activeTags={JSON.parse(localStorage.getItem("activeTags"))}
          />
        ))}
      </TagBox>
      <Button
        disabled={
          requestData.keyword ? !JSON.parse(requestData.keyword.length) : true
        }
        onClick={(e) => {
          navigate("/list", {
            state: requestData,
          });
        }}
      >
        결과보기
      </Button>
      <Rank />
    </div>
  );
}
