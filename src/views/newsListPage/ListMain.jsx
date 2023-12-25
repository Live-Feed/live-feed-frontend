import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import Tag from "../../components/ui/Tag";
import Article from "./Article";

import colors from "../../styles/colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagBox = styled.div`
  display: grid;
  gap: 15px; /* 열 간의 간격 */
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto; /* 가운데 정렬을 위한 마진 */
  margin-bottom: 50px;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(2, 1fr);
`;

const ArticleBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* gap: 50px; */
  overflow: scroll;
  height: calc(100vh - 20rem);
  width: 100%;
  border: 2px solid ${colors.MediumGray};
  border-radius: 20px;
  background-color: white;
  padding: 30px 20px;
`;

export default function ListMain() {
  const [keyword, setKeyword] = useState([]);
  const [response, setResponse] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    axios
      .get(
        localStorage.getItem("lastId") === null
          ? `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&sort=${state.sort}`
          : `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&sort=${state.sort}&lastId=${
              state.lastId
            }&pit=${state.pit}`
      )
      .then((response) => {
        setResponse(response.data.data.articles);
        localStorage.setItem("lastId", response.data.data.lastId);
        localStorage.setItem("pit", response.data.data.pit);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [state]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 배열을 가져옵니다.
    const storedKeyword = JSON.parse(localStorage.getItem("keyword"));
    if (storedKeyword) {
      setKeyword(storedKeyword);
    }
  }, []);

  const handleDelete = (index) => {
    // 선택한 항목을 배열에서 제거합니다.
    const updatedKeyword = keyword.filter((_, i) => i !== index);
    setKeyword(updatedKeyword);

    // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
    localStorage.setItem("keyword", JSON.stringify(updatedKeyword));
  };

  return (
    <Container>
      <TagBox>
        {keyword.map((text, index) => (
          <Tag key={index} text={text} onDelete={() => handleDelete(index)} />
        ))}
      </TagBox>
      <ArticleBox>
        {response.map((item, value) => (
          <Article key={value} item={item} />
        ))}
      </ArticleBox>
    </Container>
  );
}
