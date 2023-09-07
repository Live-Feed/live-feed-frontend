import { createGlobalStyle } from "styled-components";

import colors from "./colors";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.primary}; /* 적용할 배경색 설정 */
    font-family: Arial, sans-serif; /* 원하는 글꼴 설정 */
    /* 다른 글로벌 스타일을 추가할 수도 있습니다. */
  }
`;

export default GlobalStyle;
