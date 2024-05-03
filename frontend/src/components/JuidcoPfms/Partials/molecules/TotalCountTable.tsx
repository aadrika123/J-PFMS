import Tdata from "@/components/global/atoms/Tdata";
import React from "react";

type FooterData = {
  key: string;
  value: number;
}

interface TotalCountTableProps {
  footerData: FooterData[];
}

const TotalCountTable: React.FC<TotalCountTableProps> = (props) => {
  const {footerData} = props;

  const row = footerData.map((item, index) => {
    return (
      <tr key={`row${index}`} className="flex border border-zinc-400 text-secondary items-center">
        <Tdata className="flex-1" value={item.key} />
        <Tdata className="bg-primary_bg_indigo bg-opacity-20 flex-1" value={item.value} />
        <Tdata className="flex-1" value="" />
      </tr>
    );
  });

  return (
    <table className="table table-md border ">
      <tbody>{row}</tbody>
    </table>
  );
};

export default TotalCountTable;
