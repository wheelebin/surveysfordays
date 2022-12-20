import React, { useState } from "react";
import AppTableHeader from "./AppTableHeader";
import AppCheckbox from "./AppCheckbox";

const cellValueTag = (id: string, text?: string) =>
  text ? (
    <span
      key={id}
      className="bg-green-200 mr-2 border border-green-300 p-1 rounded-md"
    >
      {text}
    </span>
  ) : (
    <span key={id} className="bg-slate border border-slate-300 p-1 rounded-md">
      -
    </span>
  );

type Props = {
  headerItems: { text: string; id?: string }[];
  contentItems: {
    submissionId: string;
    answers: {
      questionId: string;
      values: {
        label: string | undefined;
      }[];
    }[];
  }[];
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
                {contentItems.map((submission) => (
                  <tr
                    className="bg-white hover:bg-gray-200"
                    key={submission.submissionId}
                  >
                    <td className="px-6 py-4 bg-white">
                      <AppCheckbox />
                    </td>
                    {submission.answers.map((answer) => {
                      return (
                        <td
                          key={answer.questionId}
                          className="px-6 py-4 whitespace-nowrap text-xs font-normal text-gray-800"
                        >
                          {answer.values.map((value) =>
                            cellValueTag(
                              `${submission.submissionId}${answer.questionId}${value.label}`,
                              value.label
                            )
                          )}
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
