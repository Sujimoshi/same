import Modal from "../Modal";
import React, { useState } from "react";
import { eventValue } from "@same/utils/helpers";
import { capitalize } from "../../utils/helpers";

export interface FolderData {
  folderName: string;
  tagName: string;
}

export interface Props {
  onClose: () => void;
  data: { onApply: (formData: FolderData) => void };
}

export const ADD_FOLDER_MODAL = "ADD_FOLDER_MODAL";

export default function AddFolderModal({ data, onClose }: Props) {
  const [folderName, setFolderName] = useState("");
  const [tagName, setTagName] = useState("div");

  const onApply = () => {
    data.onApply({ folderName, tagName });
    onClose();
  };

  return (
    <Modal title="Folder creation" onClose={onClose}>
      <div>
        <label>Tag type:</label>
        <input type="text" value={tagName} onChange={eventValue(setTagName)} />
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={folderName}
          onChange={eventValue(setFolderName)}
        />
      </div>
      <button onClick={onApply}>Apply</button>
    </Modal>
  );
}
