import { styled } from "styled-components";

import Tag from "../../components/ui/Tag";
import Article from "./Article";

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
  flex-direction: column;
  gap: 50px;
  overflow: scroll;
  height: calc(100vh - 18rem);
  width: 100%;
  border: 1px solid red;
`;

export default function ListMain() {
  return (
    <Container>
      <TagBox>
        <Tag text="강호동" />
        <Tag text="빅마마" />
        <Tag text="애플워치" />
        <Tag text="맥북" />
        <Tag text="라이브피드" />
        <Tag text="간장공장공장장" />
        <Tag text="직장인월급" />
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
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </ArticleBox>
    </Container>
  );
}
