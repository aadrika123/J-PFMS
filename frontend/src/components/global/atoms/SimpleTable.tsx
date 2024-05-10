import dayjs from "dayjs";
import React, { ReactElement } from "react";
import Button from "./Button";

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  nested?: boolean;
  member?: string;
  type?: string;
}

interface SimpleTableProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  onViewButtonClick: (id: number) => void;
}


const SimpleTable = <T,>({ columns, data, onViewButtonClick }: SimpleTableProps<T>) => {

  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`} className="bg-gray-200 text-black">
        <div className="flex gap-2 font-medium justify-center">
          {column.caption}
        </div>
      </th>
    );
  });

  const rows = !data?.length ? (
    <tr>
      <td colSpan={columns.length+1} className="text-center">
        No data
      </td>
    </tr>
  ) : (
    data?.map((row, index) => {
      return (
        <tr key={`row-${index}`} className="border border-zinc-100 text-secondary">
          {columns.map((column, index2) => {

            let value;
            if (column.nested) {
              const ob = row[column.name as keyof typeof row] as object;
              if (column.member) {
                value = ob[column.member as keyof typeof ob];
              }
            } else if (column.type && column.type == "date") {
              value = new Date(row[column.name as keyof typeof row] as string);
            }
            else {
              value = row[column.name as keyof typeof row];
            }


            if (value instanceof Date) {
              // value = new Date();
              const value1 = dayjs(value).format("DD MMM YYYY");
              return <td key={`cell-${index2}`}>
                <div className="flex justify-center">
                    {value1}
                  </div>
                </td>;
            }
            else {
              const value1 = value as string;
              return (
                <td key={`cell-${index2}`}>
                  <div className="flex justify-center">
                    {value1}
                  </div>
                </td>
              );
            }

          })}
          <td>
            <div className="flex justify-center">
              <Button
                variant="primary"
                className="py-2 px-4"
                onClick={() => onViewButtonClick(Number(row['id' as keyof typeof row]))}
              >
                View
              </Button>
            </div>
          </td>
        </tr>
      );
    })
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-md">

          <thead className="  text-[1rem] bg-primary_bg_indigo text-white">
            <tr>

              {headers}

              <th className="font-medium bg-gray-200 text-black">
                <div className="flex justify-center">
                  <span>Actions</span>
                </div>
              </th>

            </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>

        </table>
      </div>

    </>
  );
}

export default SimpleTable;