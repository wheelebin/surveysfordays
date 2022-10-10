import React from "react";

import { TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const BuilderHeader: React.FC<Props> = ({ onEdit, onDelete }: Props) => {
  const getHeaderItems = () => {
    const items = [
      {
        shouldRender: !!onEdit,
        icon: (
          <Pencil1Icon onClick={onEdit} className="cursor-pointer h-4 w-4" />
        ),
      },
      {
        shouldRender: !!onDelete,
        icon: (
          <TrashIcon onClick={onDelete} className="cursor-pointer h-4 w-4" />
        ),
      },
    ];

    return items.map(
      ({ icon, shouldRender }, i) =>
        shouldRender && (
          <div
            key={i}
            className="p-2 rounded mr-1 hover:bg-indigo-100 flex items-center justify-center"
          >
            {icon}
          </div>
        )
    );
  };

  return <div className="flex py-1 ">{getHeaderItems()}</div>;
};

export default BuilderHeader;
