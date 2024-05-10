import React from "react";

interface StadnaloneDropdownListItem {
    id: number;
    caption?: string;
    name?: string;
}
  

interface StandaloneDropdownListProps {
  label: string;
  name: string;
  items: StadnaloneDropdownListItem[],
  value: number | string;
  onChange: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
  isReadOnly?: boolean;
  className?: string;
}


const StandaloneDropdownList: React.FC<StandaloneDropdownListProps> = (props) => {
  const fieldId = "id_" + props.name + (new Date()).getTime();

  return (
    <>
      <div className="flex flex-col gap-1 w-[200px]">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
        </label>
        <select
          onChange={props.onChange}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
          disabled={props.isReadOnly}
        >
          {props?.items?.map((item: StadnaloneDropdownListItem) => (
            <option key={item.id} value={item.id}>
              {item?.caption || item?.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default StandaloneDropdownList;
