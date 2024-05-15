import { useState } from "react";
import axios from "axios";

import { styled } from "styled-components";
import { Modal, Typography } from "@mui/material";
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';

// import ArticleThumbnail from "../../assets/images/ariticle_thumbnail.png";

import colors from "../../styles/colors";

const Container = styled.div`
  width: 855px;
  height: 280px;
  padding: 20px;
  display: flex;
  gap: 15px;
  background-color: white;
  border-bottom: 1px solid ${colors.LightGray};
  border-radius: 8px;
  box-shadow: 1px 1px 3px gray;
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
  width: 700px;
  height: 75vh;
  padding: 100px;
  background-color: white;
  outline: none;
  border-radius: 20px;
  overflow-y: scroll;
`;

// const CloseBtn = styled(IconButton)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   margin: 10px;
// `;

const Img = styled.img`
  width: 150px;
`;

const Contents = styled.div`
  width: 700px;
  line-height: 1.5rem;
`;

export default function Article({ item }) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    if (!isLoading) {
      axios
        .get(`/api/detail/articles/${item.articleId}`)
        .then((response) => {
          setResponse(response.data.data); // 목 데이터를 받습니다.
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
    setIsLoading(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <Container onClick={handleOpen}>
        <Left>
          <Img src={item.photo} alt="article_thumbnail" width="155px" />
          <Typography fontSize={10}>{item.minutesAgo}</Typography>
        </Left>
        <Right>
          <NewsTitle dangerouslySetInnerHTML={{ __html: item.title }} />
          <Media>{item.pressCompany}</Media>
          <div
            style={{
              lineHeight: "1.5rem",
            }}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </Right>
      </Container>
      <ModalContainer open={open} onClose={handleClose}>
        <Paper>
          <h1 dangerouslySetInnerHTML={{ __html: response.title }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <span>
              입력 {response.publicationTime} {response.reporter}
            </span>
            <span>{response.pressCompany}</span>
          </div>
          <a
            href={response.articleUrl}
            style={{
              marginBottom: "20px",
            }}
          >
            기사 원문보기
          </a>
          <Contents
            dangerouslySetInnerHTML={{ __html: response.contentBody }}
          />
        </Paper>
      </ModalContainer>
    </>
  );
}
