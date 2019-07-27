import { showModal } from "@same/store/modal/actions";
import { ADD_FOLDER_MODAL, FolderData } from "@same/components/AddFolderModal";
import {
  ComponentData,
  ADD_COMPONENT_MODAL
} from "@same/components/AddComponentModal/index";

export const showAddFolderModal = (onApply: (formData: FolderData) => void) => {
  return showModal(ADD_FOLDER_MODAL, { onApply });
};

export const showAddComponentModal = (
  onApply: (formData: ComponentData) => void
) => {
  return showModal(ADD_COMPONENT_MODAL, { onApply });
};
