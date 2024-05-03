"use client";

import React, { ReactNode } from "react";

interface TdataProps {
  value: ReactNode;
  key?: string | number;
  className?: string;
  colSpan?: number;
  width?: string;
}

const Tdata: React.FC<TdataProps> = (props) => {
  const { className, key, value, ...rest } = props;
  return (
    <td
      {...rest}
      key={`cell-${key}`}
      className={`${className}`}
    >
      <div className="flex justify-center text-start text-nowrap">{value}</div>
    </td>
  );
};

export default Tdata;

