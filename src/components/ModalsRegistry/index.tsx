import { connect } from "react-redux";
import { RootStore } from "same";
import AddFolderModal, { ADD_FOLDER_MODAL } from "../AddFolderModal";
import React from "react";
import { closeModal } from "@same/store/modal/actions";
import AddComponentModal, {
  ADD_COMPONENT_MODAL
} from "../AddComponentModal/index";

export interface Props {
  identifier: string;
  data: any;
  onClose: () => void;
}

export function ModalsRegistry(props: Props) {
  switch (props.identifier) {
    case ADD_FOLDER_MODAL: {
      return <AddFolderModal data={props.data} onClose={props.onClose} />;
    }
    case ADD_COMPONENT_MODAL: {
      return <AddComponentModal data={props.data} onClose={props.onClose} />;
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
