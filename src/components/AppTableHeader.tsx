import React from "react";
import AppCheckbox from "./AppCheckbox";

type Props = {
  items: string[];
};

const AppTableHeader = ({ items }: Props) => {
  return (
    <thead className="relative bg-white">
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
        >
          <AppCheckbox />
        </th>

        {items.map((item) => (
          <th
            key={item}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default AppTableHeader;
