import { showModal } from "@same/store/modal/actions";
import {
  CREATE_NODE_MODAL,
  FolderData
} from "@same/components/CreateNodeModal";
import {
  ComponentData,
  CREATE_COMPONENT_MODAL
} from "@same/components/CreateComponentModal/index";

export const showCreateNodeModal = (
  onApply: (formData: FolderData) => void
) => {
  return showModal(CREATE_NODE_MODAL, { onApply });
};

export const showCreateComponentModal = (
  data: Partial<ComponentData>,
  onApply: (formData: ComponentData) => void
) => {
  return showModal(CREATE_COMPONENT_MODAL, { ...data, onApply });
};
