import React, { useState } from "react";
import AppTableHeader from "./AppTableHeader";
import AppCheckbox from "./AppCheckbox";
import { boolean, string } from "zod";

type Props = {
  headerItems: { text: string; id?: string }[];
  contentItems: [string][];
};

const AppTable = ({ headerItems, contentItems }: Props) => {
  const [checked, setChecked] = useState<{ id: string; checked: boolean }[]>(
    []
  );

  return (
    <div className="flex flex-col">
      <div className=" overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full ">
              <AppTableHeader items={headerItems.map(({ text }) => text)} />
              <tbody className="divide-y divide-gray-200 ">
                {contentItems.map((row, i) => (
                  <tr className="hover:bg-gray-100 " key={"row-" + i}>
                    <td className="px-6 py-4 bg-white">
                      <AppCheckbox />
                    </td>
                    {row.map((item, i) => (
                      <td
                        key={"cell-" + i}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                      >
                        {item}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppTable;
