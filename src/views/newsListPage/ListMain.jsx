import { styled } from "styled-components";
import { useEffect, useState } from "react";
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

  const [requestData, setRequestData] = useState({
    keyword: JSON.parse(localStorage.getItem("textArray")),
    type: localStorage.getItem("type"),
    size: 10,
    sort: "id,desc",
    lastId: "기존에 전달받은 아이디",
    pit: "기존에 전달받은 pit값",
  });
  useEffect(() => {
    // 이 코드는 axios의 mock 기능을 활성화합니다.
    const mock = new MockAdapter(axios);

    // 예를 들어, GET 요청에 대한 목 데이터를 설정하는 방법은 다음과 같습니다.
    mock.onGet("/api/list/articles").reply(200, {
      success: true,
      status: 200,
      message: "기사 조회 성공했습니다.",
      data: {
        articles: [
          {
            articleId: 1,
            title: "기적의 무적함대...",
            pressCompany: "머니투데이",
            content: "기사 요약 내용",
            photo: ArticleThumbnail,
            minutesAgo: "20분 전",
          },
          {
            articleId: 2,
            title: "기적의 무적함대...",
            pressCompany: "머니투데이",
            content: "기사 요약 내용",
            photo: ArticleThumbnail,
            minutesAgo: "1시간 전",
          },
        ],
        isLast: false,
        lastId: 5,
        pit: "test",
      },
    });

    // 이제 실제 요청을 보내는 코드를 사용하여 목 데이터가 반환됩니다.
    axios
      .get("/api/list/articles")
      .then((response) => {
        // console.log(response.data); // 여기서는 목 데이터를 받게 됩니다.

        setResponse(response.data.data.articles); // 여기서는 목 데이터를 받게 됩니다.
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
