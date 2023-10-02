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

const Button = styled.div`
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

  return (
    <div>
      <SearchBox>
        <Dropdown />
        <SearchBar />
      </SearchBox>
      <TagBox>
        <Tag text="강호동" />
        <Tag text="빅마마" />
        <Tag text="애플워치" />
        <Tag text="맥북" />
        <Tag text="라이브피드" />
        <Tag text="간장공장공장장" />
        <Tag text="직장인월급" />
      </TagBox>
      <Button onClick={(e) => navigate("/list")}>결과보기</Button>
    </div>
  );
}
