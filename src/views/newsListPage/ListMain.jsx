import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Tag from "../../components/ui/Tag";
import Article from "./Article";

import colors from "../../styles/colors";

import ArticleThumbnail from "../../assets/images/ariticle_thumbnail.png";

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
  const [textArray, setTextArray] = useState([]);
  const [response, setResponse] = useState([]);

  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    axios
      .get(
        `/api/list/articles?keyword=${state.keyword}&type=${state.type}&size=${state.size}&sort=${state.sort}&lastId=${state.lastId}&pit=${state.pit}`
      )
      .then((response) => {
        console.log(response.data); // 여기서는 목 데이터를 받게 됩니다.
        setResponse(response.data.data.articles); // 여기서는 목 데이터를 받게 됩니다.
      })
      .catch((error) => {
        console.error(error);
      });
  }, [state]);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 배열을 가져옵니다.
    const storedTextArray = JSON.parse(localStorage.getItem("textArray"));
    if (storedTextArray) {
      setTextArray(storedTextArray);
    }
  }, []);

  const handleDelete = (index) => {
    // 선택한 항목을 배열에서 제거합니다.
    const updatedArray = textArray.filter((_, i) => i !== index);
    setTextArray(updatedArray);

    // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
    localStorage.setItem("textArray", JSON.stringify(updatedArray));
  };

  return (
    <Container>
      <TagBox>
        {textArray.map((text, index) => (
          <Tag key={index} text={text} onDelete={() => handleDelete(index)} />
        ))}
      </TagBox>
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "800px",
          height: "1px",
          margin: "50px 0px",
          backgroundColor: "black",
        }}
      /> */}
      <ArticleBox>
        {response.map((item, value) => (
          <Article key={value} item={item} />
        ))}
      </ArticleBox>
    </Container>
  );
}