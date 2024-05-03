"use client";

import { motion } from "framer-motion";
import dayjs from "dayjs";
import React, { ReactElement, ReactNode } from "react";
import Thead from "../atoms/Thead";
import Tdata from "../atoms/Tdata";
import Trow from "../atoms/Trow";
import utc from "dayjs/plugin/utc"

/**
 * | Author- Sanjiv Kumar
 * | Created On- 05-02-2024
 * | Created for- Table
 * | Status- done
 */

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  value?: (id: string) => ReactNode;
  color?: string;
  width?: string;
}

interface SimpleTableProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  pageNo?: number;
  limit?: number;
  center?: boolean;
  scrollable?: boolean;
  height?: string;
}

type ObjectContent = {
  id: number;
  type?: string;
  name?: string;
  code?: string;
};

const Table = <T,>({
  columns,
  data,
  pageNo = 1,
  limit,
  center = false,
  scrollable = false,
  height = "h-96",
}: SimpleTableProps<T>) => {
  dayjs.extend(utc);
  const headers = columns.map((column, index) => {
    return (
      <Thead
        color={column.color}
        width={column.width}
        center={center}
        cellValue={column.caption}
        key={index}
        className="bg-gray-200"
      />
    );
  });

  const rows = !data?.length ? (
    <Trow className="">
      <Tdata className="border-none" value="No data" colSpan={columns.length} />
    </Trow>
  ) : (
    data?.map((row, index) => {
      return (
        <Trow key={index} className={`border-t border-zinc-400 text-secondary`}>
          {columns.map((column, index2) => {
            const value = row[column.name as keyof typeof row];
            const isoDatePattern =
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

            const value1: ReactNode | string = isoDatePattern.test(`${value}`)
              ? dayjs.utc(`${value}`).format("DD MMM YYYY")
              : typeof value === "object"
                ? (value as ObjectContent)?.type ||
                  (value as ObjectContent)?.name ||
                  (value as ObjectContent)?.code
                : column.name === "id"
                  ? index + 1 + (pageNo - 1) * (limit || data.length)
                  : column.value
                    ? column.value(row["id" as keyof typeof row] as string)
                    : typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : (value as string);

            return <Tdata width={column.width} key={index2} value={value1} />;
          })}
        </Trow>
      );
    })
  );

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div
          className={`hide-scrollbar overflow-x-auto ${scrollable && height}`}
          id="table-with-pegination"
        >
          <table className={`table table-md`}>
            <thead className="text-[1rem] bg-primary_bg_indigo text-white">
              <Trow
                className={`w-full ${scrollable && "overflow-y-auto sticky top-0 z-[5"}`}
              >
                {headers}
              </Trow>
            </thead>
            <tbody className="">{rows}</tbody>
          </table>
        </div>
      </motion.div>
    </>
  );
};

export default Table;
