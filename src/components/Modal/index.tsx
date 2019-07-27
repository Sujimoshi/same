import React, { ReactElement, ReactNode } from "react";
import {
  ModalBackground,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  Icon
} from "./styled";
import Row from "../grid/Row";
import Col from "../grid/Col";

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
