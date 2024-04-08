import { styled } from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import Tag from "../../components/ui/Tag";
import Article from "./Article";

import colors from "../../styles/colors";

import { FormControl, MenuItem, Select, Snackbar } from "@mui/material";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

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
  gap: 10px;
  overflow: scroll;
  height: calc(100vh - 270px);
  width: 100%;
  /* border: 2px solid ${colors.MediumGray}; */
  /* border-radius: 20px; */
  /* background-color: white; */
  padding: 10px 10px;
`;

export default function ListMain() {
  const { state } = useLocation();

  const [keyword, setKeyword] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [_isLast, setIsLast] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  const [_pit, setPit] = useState("");
  const [_lastId, setLastId] = useState(0);
  const [selectedItem, setSelectedItem] = useState("latest");

  const preventRef = useRef(true); //옵저버 중복 실행 방지

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "10px",
      threshold: 0,
    });
    observer.observe(document.querySelector(".sentinel"));
    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [page]);

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && preventRef.current && !_isLast) {
        preventRef.current = false; //옵저버 중복 실행 방지
        getData();
      }
    });
  };

  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        !_pit && !_lastId
          ? `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&sort=${state.sort}`
          : `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&sort=${
              state.sort
            }&lastId=${_lastId}&pit=${_pit}`
      )
      .then((response) => {
        // preventRef.current = true;
        preventRef.current = true; //옵저버 중복 실행 방지
        setResult([...result, ...response.data.data.articles]);
        setIsLast(response.data.data.isLast);
        setLastId(response.data.data.lastId);
        setPit(response.data.data.pit);

        localStorage.setItem("isLast", response.data.data.isLast);
        localStorage.setItem("lastId", response.data.data.lastId);
        localStorage.setItem("pit", response.data.data.pit);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        window.history.back();
      });
  };

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

  const handleToggle = (index) => {
    // 선택한 항목을 배열에서 제거합니다.
    const updatedKeyword = keyword.filter((_, i) => i !== index);
    // setKeyword(updatedKeyword);

    // 로컬 스토리지에 배열을 업데이트된 배열로 다시 저장합니다.
    localStorage.setItem("keyword", JSON.stringify(updatedKeyword));
    // setRequestData({ ...requestData, keyword: updatedKeyword });
  };

  const handleDropdownChange = (event) => {
    // window.localStorage.setItem("type", event.target.value);
    setSelectedItem(event.target.value);
  };

  return (
    <Container>
      <TagBox>
        {keyword.map((text, index) => (
          <Tag
            key={index}
            text={text}
            onDelete={() => handleDelete(index)}
            onToggle={() => handleToggle(index)}
            isList={true}
            activeTags={JSON.parse(localStorage.getItem("activeTags"))}
          />
        ))}
      </TagBox>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <FormControl>
          <Select
            value={selectedItem}
            onChange={handleDropdownChange}
            style={{ width: "8rem", backgroundColor: "white" }}
          >
            <MenuItem value="latest">최신순</MenuItem>
            <MenuItem value="relative">관련된순</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <ArticleBox>
        {_isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : result.length ? (
          result.map((item, value) => <Article key={value} item={item} />)
        ) : (
          <div>기사가 존재하지 않습니다.</div>
        )}

        {<div className="sentinel"></div>}
      </ArticleBox>
    </Container>
  );
}
