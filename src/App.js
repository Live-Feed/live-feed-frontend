import { Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import NavBar from "./components/ui/NavBar";
import GlobalStyle from "./styles/GlobalStyle"; // 글로벌 스타일 파일을 가져옵니다.

function App() {
  return (
    <div>
      <GlobalStyle />
      <NavBar />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
