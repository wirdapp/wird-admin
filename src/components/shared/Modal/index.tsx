import React from 'react';
import {
  Background,
  Container,
  TitleCloseBtn,
  Title,
  CloseBtn,
  Body,
  Footer,
  FooterBtn,
} from './Modal.styles';

interface ModalProps {
  setOpenModal: (open: boolean) => void;
  title: string;
  content: string;
  cancelBtn: string;
  deleteBtn: string;
  deleteFunction: () => void;
}

export default function Modal(props: ModalProps) {
  const handleCloseBtnChange = () => {
    props.setOpenModal(false);
  };

  return (
    <Background>
      <Container>
        <TitleCloseBtn>
          <CloseBtn onClick={handleCloseBtnChange}>x</CloseBtn>
        </TitleCloseBtn>

        <Title>
          <h2>{props.title}</h2>
        </Title>

        <Body>
          <p>{props.content}</p>
        </Body>

        <Footer>
          <FooterBtn onClick={handleCloseBtnChange}>
            {props.cancelBtn}
          </FooterBtn>
          <FooterBtn onClick={() => props.deleteFunction()} id="deleteBtn">
            {props.deleteBtn}
          </FooterBtn>
        </Footer>
      </Container>
    </Background>
  );
}
