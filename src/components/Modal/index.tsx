import React, { ReactNode } from "react";
import {
  ModalBackground,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  Icon
} from "./styled";
import Row from "../Row";
import Col from "../Col";

export interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal(props: Props) {
  return (
    <ModalBackground>
      <ModalWrapper>
        <ModalHeader>
          <Row>
            <Col>{props.title}</Col>
            <Col size="auto">
              <Icon onClick={props.onClose}>x</Icon>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
      </ModalWrapper>
    </ModalBackground>
  );
}
