import React, { ReactNode } from "react";
import ListItem from "../ListItem";
import { Dictionary } from "underscore";
import { DropWrapper, DragWrapper } from "@same/styled/Components";
import { useDrop, useDrag } from "react-dnd";
import { isSubFolder } from "@same/utils/helpers";
import { Folder } from "@same/store/project/reducers";

export interface Props {
  level: number;
  children: () => ReactNode;
  expanded?: boolean;
  edit?: boolean;
  onClick: () => void;
  actions: Dictionary<() => void>;
  onEditFinish: (newName: string) => void;
  folder: Folder;
  onFolderDrop: (folderId: string) => void;
  onComponentDrop: (componentId: string) => void;
}

export default function FolderItem({
  edit,
  onClick,
  expanded,
  level,
  children,
  actions,
  folder,
  onFolderDrop,
  onComponentDrop,
  onEditFinish
}: Props) {
  const [isDropping, dropRef] = useDrop({
    accept: ["components", "folders"],
    canDrop: ({ data }: any) => folder.id !== data,
    drop: ({ data, type }: any) =>
      type === "folders" ? onFolderDrop(data) : onComponentDrop(data.id),
    collect: monitor => monitor.canDrop() && monitor.isOver()
  });

  const [isDragging, dragRef] = useDrag({
    item: { type: "folders", data: folder.id },
    collect: monitor => monitor.isDragging()
  });

  return (
    <DropWrapper ref={dropRef} dropping={isDropping}>
      <DragWrapper ref={dragRef} dragging={isDragging}>
        <ListItem
          edit={edit}
          onEditFinish={onEditFinish}
          level={level}
          onClick={onClick}
          icon={!expanded ? "caret-right" : "caret-down"}
          actions={actions}
        >
          {folder.name}
        </ListItem>
      </DragWrapper>
      {expanded && children()}
    </DropWrapper>
  );
}
