import { styled } from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import Tag from "../../components/ui/Tag";
import Article from "./Article";

import colors from "../../styles/colors";

import {
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  // Button,
  Box,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useGlobalDispatch, useGlobalState } from "../../context/GlobalState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap; /* 2줄로 제한 */
  justify-content: center; /* 가운데 정렬 */
  gap: 15px; /* 열 간의 간격 */
  max-width: 800px; /* 최대 너비 */
  margin: 0 auto; /* 가운데 정렬을 위한 마진 */
  margin-bottom: 20px;
`;

const ArticleBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  /* overflow: scroll; */
  /* height: 100%; */
  flex: 1;
  width: 100%;
  /* border: 2px solid ${colors.MediumGray}; */
  /* border-radius: 20px; */
  /* background-color: white; */
  padding: 10px 10px;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
`;

export default function ListMain() {
  const { state } = useLocation();

  const [keyword, setKeyword] = useState([]);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [_isLast, setIsLast] = useState(false);
  const [_isLoading, setIsLoading] = useState(false);
  // const [_isNew, setIsNew] = useState(true);
  const [_pit, setPit] = useState("");
  const [_lastId, setLastId] = useState(0);
  const [_lastScore, setLastScore] = useState(0);
  const [_selectedItem, setSelectedItem] = useState(false); // false : 관련된순, true : 시간순
  const preventRef = useRef(true); //옵저버 중복 실행 방지

  const { isNew } = useGlobalState();
  const dispatch = useGlobalDispatch();

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

  const getData = (reLoading = false, related = false) => {
    if (page === 1) setIsLoading(true);
    axios
      .get(
        !_pit && !_lastId
          ? `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&related=${_selectedItem}`
          : reLoading
          ? `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${state.size}&related=${related}`
          : `/api/list/articles?keyword=${state.keyword.join(",")}&type=${
              state.type
            }&size=${
              state.size
            }&lastId=${_lastId}&pit=${_pit}&lastScore=${_lastScore}&related=${_selectedItem}`
      )
      .then((response) => {
        // preventRef.current = true;
        preventRef.current = true; //옵저버 중복 실행 방지
        if (reLoading) setResult(response.data.data.articles);
        else if (!reLoading)
          setResult([...result, ...response.data.data.articles]);
        setIsLast(response.data.data.isLast);
        setLastId(response.data.data.lastId);
        setLastScore(response.data.data.lastScore);
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

  useEffect(() => {
    localStorage.setItem("related", false);
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
    setSelectedItem(event.target.value);
    // localStorage.setItem("related", event.target.value);
    getData(true, event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLastId(0);
    setPit("");

    window.scrollTo(0, 0);
    getData(true, _selectedItem);

    dispatch({type: 'SET_IS_NEW', payload: false})
  };

  const action = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* <Box onclick={window.scrollTo(0, 0)}>확인하기</Box> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

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
            status={false}
          />
        ))}
      </TagBox>

      {_isLoading ? (
        <></>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          <FormControl>
            <Select
              value={_selectedItem}
              onChange={handleDropdownChange}
              style={{ width: "8rem", backgroundColor: "white" }}
            >
              <MenuItem value="false">최신순</MenuItem>
              <MenuItem value="true">관련된순</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

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
      <Snackbar
        value={false}
        open={isNew}
        onClose={handleClose}
        message="새로운 기사가 등록되었습니다."
        action={action}
      />
    </Container>
  );
}
