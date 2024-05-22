import { styled } from "styled-components";
import { useGlobalState } from "../../context/GlobalState";
import { useEffect, useState } from "react";

const RankBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 0px;
  background-color: white;
  border: 1px solid #d6d6d6;
`;

const RankList = styled.div`
  height: 36px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

const RankIndex = styled.div`
  width: 36px;
  background-color: white;
  display: flex;
  align-items: center;
`;

const RankTitle = styled.div`
  display: flex;
  align-items: center;
`;

function Rank() {
  const [rankings, setRankings] = useState([]);
  const { keywords } = useGlobalState();

  useEffect(() => {
    setRankings(keywords);
  }, [keywords]);

  return (
    <RankBox>
      {rankings.map((item, index) => (
        <RankList
          key={index}
          style={{ borderBottom: index !== 9 ? "1px solid #ebebeb" : "none" }}
        >
          <RankIndex>{index + 1}.</RankIndex>
          <RankTitle>{item}</RankTitle>
        </RankList>
      ))}
    </RankBox>
  );
}

export default Rank;
