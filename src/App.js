import { Route, Routes } from "react-router-dom";
import Main from "./views/mainPage/Main";
import ListMain from "./views/newsListPage/ListMain";
import NavBar from "./components/ui/NavBar";
import GlobalStyle from "./styles/GlobalStyle"; // 글로벌 스타일 파일을 가져옵니다.
import { useEffect } from "react";
import { useGlobalDispatch } from "./context/GlobalState";

const sseUrl = process.env.REACT_APP_SERVER_SENT_EVENT_IP;

function App() {
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    const eventSource = new EventSource(sseUrl, { withCredentials: true });

    eventSource.addEventListener("article update", function (event) {
      console.log("New article update event from server:", event.data);
      // 새로 등록된 기사가 있다는 의미 이므로 기사 재요청
      dispatch({ type: "SET_IS_NEW", payload: true });
    });

    eventSource.addEventListener("keywords ranking update", function (event) {
      console.log("keywords ranking update event from server:", event.data);
      // 랭킹 수정
      dispatch({
        type: "SET_KEYWORDS_RANKING",
        payload: JSON.parse(event.data),
      });
    });

    // eventSource.onmessage = function (event) {
    //   console.log(event);
    //   console.log("New event from server:", event.data);
    //   dispatch({ type: 'SET_IS_NEW', payload: true})
    // };

    eventSource.onerror = function (error) {
      console.error("EventSource failed:", error);
      // eventSource.close(); // 연결 문제 발생 시 연결을 종료합니다.
    };

    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (window.localStorage.getItem("type") === null) {
    window.localStorage.setItem("type", "articleTitle,bodyHtml");
  }
  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <div style={{ paddingTop: "5rem", display: "flex" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/list" element={<ListMain />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
