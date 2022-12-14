import React, { useState } from "react";
import AppTableHeader from "./AppTableHeader";
import AppCheckbox from "./AppCheckbox";
import { boolean, string } from "zod";

const cellValueTag = (text: string) =>
  text ? (
    <span className="bg-white border border-slate-200 p-1 rounded-md">
      {text}
    </span>
  ) : (
    <span className="bg-slate border border-slate-200 p-1 rounded-md">-</span>
  );

type Props = {
  headerItems: { text: string; id?: string }[];
  contentItems: string[][][];
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
                  <tr className="bg-white hover:bg-gray-100" key={"row-" + i}>
                    <td className="px-6 py-4 bg-white">
                      <AppCheckbox />
                    </td>
                    {row.map((values, i) => {
                      // TODO Change this stuff man, data structure should be somewhat complete and ready from consumption after being sent from BE
                      const valuesInternal = values || [undefined];
                      return (
                        <td
                          key={"cell-" + i}
                          className="px-6 py-4 whitespace-nowrap text-xs font-normal text-gray-800"
                        >
                          {valuesInternal.map((value) => cellValueTag(value))}
                        </td>
                      );
                    })}
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
