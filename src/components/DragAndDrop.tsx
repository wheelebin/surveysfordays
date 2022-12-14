import React from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

// TODO Change list from any to inherit type somehow
type Props = {
  children?: React.ReactNode;
  list: any[];
  onDragEnd: (items: any[]) => void;
};

const DragAndDrop: React.FC<Props> = ({ children, list, onDragEnd }) => {
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    if (removed) {
      result.splice(endIndex, 0, removed);
    }

    return result;
  };

  const handleOnDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(list, result.source.index, result.destination.index);

    onDragEnd(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="h-full overflow-y-scroll no-scrollbar">
        <Droppable droppableId="aDroppableId">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
