import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import colors from "../../styles/colors";
import { ReactComponent as LOGO } from "../../assets/images/LOGO.svg";

const Nav = styled.nav`
  background-color: ${colors.primary};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 100; /* 다른 요소 위에 나타나도록 설정 */
  /* box-shadow: 0px 0px 10px 3px gray; */
  border-bottom: 2px solid #d6d6d6;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 1.5rem;
  margin-left: 10px;
  color: ${colors.secondary};
`;

const LogoTitle = styled.div`
  cursor: pointer;
`;

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Nav>
      <Container>
        <LogoTitle onClick={() => navigate("/")}>
          {/* <LOGO width={"30px"} height={"40px"} fill={colors.secondary} /> */}
          <Title>Live Feed</Title>
        </LogoTitle>
      </Container>
    </Nav>
  );
}
