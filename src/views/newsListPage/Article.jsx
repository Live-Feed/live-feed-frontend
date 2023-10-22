import { useState } from "react";

import { styled } from "styled-components";
import { Typography, Modal } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

import ArticleThumbnail from "../../assets/images/ariticle_thumbnail.png";
import ArticleImg from "../../assets/images/article_main_img.jpg";

import colors from "../../styles/colors";

const Container = styled.div`
  width: 735px;
  height: 280px;
  padding: 20px;
  display: flex;
  gap: 15px;
  background-color: white;
  border-bottom: 2px solid ${colors.LightGray};
  /* border-radius: 20px; */
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
`;

const NewsTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Media = styled.div`
  font-size: 14px;
  color: ${colors.disable};
`;

const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Paper = styled.div`
  flex-direction: column;
  width: 600px;
  height: calc(100vh-20rem);
  padding: 100px;
  background-color: white;
  outline: none;
  border-radius: 20px;
`;

// const CloseBtn = styled(IconButton)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   margin: 10px;
// `;

const Img = styled.img`
  width: 200px;
`;

const Contents = styled.div`
  width: 600px;
  line-height: 1.5rem;
`;

export default function Article() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log("open");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("close");
  };
  return (
    <>
      <Container onClick={handleOpen}>
        <Left>
          <Img src={ArticleThumbnail} alt="article_thumbnatil" />
          <div>25분전</div>
        </Left>
        <Right>
          <NewsTitle>기적의 ‘무적 함대’ 여자월드컵 사상 첫 결승행</NewsTitle>
          <Media>머니투데이</Media>
          <div
            style={{
              lineHeight: "1.5rem",
            }}
          >
            득점 없이 흐른 80분은 마지막 10분간 펼쳐진 명승부의
            예고편이었습니다.후반 36분 에르모소의 날카로운 크로스가 스웨덴
            수비를 맞고 ...더보기
          </div>
        </Right>
      </Container>
      <ModalContainer open={open} onClose={handleClose}>
        <Paper>
          <h1>기적의 ‘무적 함대’ 여자월드컵 사상 첫 결승행</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>입력2023.08.14. 오전 7:02 김승찬 기자</span>
            <span>머니투데이</span>
          </div>
          <a
            href="https://news.kbs.co.kr/news/pc/view/view.do?ncd=7748939"
            style={{
              marginBottom: "20px",
            }}
          >
            기사 원문보기
          </a>
          <img
            src={ArticleImg}
            alt="article_img"
            width="600px"
            style={{
              marginBottom: "20px",
            }}
          />
          <Contents>
            득점 없이 흐른 80분은 마지막 10분간 펼쳐진 명승부의
            예고편이었습니다. 후반 36분 에르모소의 날카로운 크로스가 스웨덴
            수비를 맞고 흐르자 스페인의 파라유엘로가 그대로 오른발로 연결합니다.
            8강전 연장 승부 결승 골의 주인공이었던 19살 공격수는 이번에도 교체
            투입돼 결정적인 골을 넣었습니다. 하지만 스웨덴의 반격도
            만만찮았습니다. 후반 43분 후르티그가 머리로 공을 떨구자
            블롬크비스트가 감각적인 발리슛으로 승부를 원점으로 돌렸습니다.
            모두가 연장전을 예감한 순간, 그래도 스페인은 계획이 있었습니다.
            실점한지 불과 1분 뒤 얻은 코너킥이 스웨덴 수비의 예상을 깨고
            카르모나에게 향했고, 골 넣는 수비수 카르모나는 절묘한 왼발로
            결승으로 향하는 문을 직접 열었습니다. 극적인 2대 1 승리를 결정짓는
            골이 터지자 스페인 감독은 터치라인을 따라 달리며 기쁨을 감추지
            못했습니다. 상대 전적 4무 7패의 열세에 있었던 스페인은 가장 중요한
            순간 스웨덴을 넘어서며 사상 처음으로 월드컵 결승 무대를 밟았습니다.
            경기가 끝난 뒤엔 승패를 초월한 두 선수의 우정이 눈길을
            사로잡았습니다. 유니폼을 바꿔입은 스웨덴의 롤포가 소속팀 바르셀로나
            동료인 스페인의 본마티를 들어 올리며 축하해줬습니다. 기적의 팀
            스페인은 오는 20일 호주-잉글랜드전 승자를 상대로 첫 우승이라는 새
            역사에 도전합니다. KBS 뉴스 박선우입니다. 영상편집:송장섭
          </Contents>
        </Paper>
      </ModalContainer>
    </>
  );
}
