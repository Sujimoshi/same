import { connect } from "react-redux";
import { RootStore } from "same";
import CreateNodeModal, { CREATE_NODE_MODAL } from "../CreateNodeModal";
import React from "react";
import { closeModal } from "@same/store/modal/actions";
import CreateComponentModal, {
  CREATE_COMPONENT_MODAL
} from "../CreateComponentModal";

export interface Props {
  identifier: string;
  data: any;
  onClose: () => void;
}

export function ModalsRegistry(props: Props) {
  switch (props.identifier) {
    case CREATE_NODE_MODAL: {
      return <CreateNodeModal data={props.data} onClose={props.onClose} />;
    }
    case CREATE_COMPONENT_MODAL: {
      return <CreateComponentModal data={props.data} onClose={props.onClose} />;
    }
    default: {
      return null;
    }
  }
}

export default connect(
  (state: RootStore) => ({
    identifier: state.modal.identifier,
    data: state.modal.data
  }),
  { onClose: closeModal }
)(ModalsRegistry);
