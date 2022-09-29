import React from "react";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  children?: React.ReactNode;
  id: string;
  index: number;
};

const DragAndDropItem: React.FC<Props> = ({ children, id, index }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          ref={provided.innerRef}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export default DragAndDropItem;
