import { styled } from "styled-components";
import Dropdown from "../components/ui/Dropdown";
import SearchBar from "../components/ui/SearchBar";
import Tag from "../components/ui/Tag";

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0px;
`;

const TagBox = styled.div`
  display: grid;
  gap: 15px; /* 열 간의 간격 */
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto; /* 가운데 정렬을 위한 마진 */
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(4, 1fr);
`;

export default function Main() {
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
    </div>
  );
}
