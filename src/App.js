import { Route, Routes } from "react-router-dom";
import Main from "./views/mainPage/Main";
import ListMain from "./views/newsListPage/ListMain";
import NavBar from "./components/ui/NavBar";
import GlobalStyle from "./styles/GlobalStyle"; // 글로벌 스타일 파일을 가져옵니다.

function App() {
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
