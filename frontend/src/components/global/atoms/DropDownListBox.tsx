import { useQuery } from "react-query";
import React from "react";
// import axios from "axios";
import axios from "@/lib/axiosConfig";
import { useField } from "formik";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 25-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

interface DropDownListProps {
  label: React.ReactNode;
  name: string;
  placeholder: string | "";
  value: number | string;
  api: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  required?: boolean | false;
  onChange: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLSelectElement>) => void;
  isReadOnly?: boolean;
}

interface Item {
  id: number;
  name?: string;
  type?: string;
  code?: string;
  description?: string;
  ulbs?: string;
}

const DropDownListBox: React.FC<DropDownListProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  const fetchData = async (): Promise<Item[]> => {
    const res = await axios({
      url: props.api,
      method: "GET",
    });

    return res.data?.data;
  };

  const { data: ItemData = [], isError: dataError } = useQuery(
    [fieldId],
    fetchData
  );

  if (dataError) {
    throw new Error("Fatal Error!");
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 ">*</span> : ""}
        </label>
        <select
          {...field}
          onChange={(event) => setValue(parseInt(event.target.value))}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
          disabled={props.isReadOnly}
        >
          <option value="-1">{props.placeholder}</option>

          {ItemData.map((item: Item) => (
            <option key={item.id} value={item.id}>
              {item?.name ||
                item?.type ||
                (item?.code && item?.description
                  ? `${item.code}-${item?.description}`
                  : item?.code) ||
                item?.ulbs}
            </option>
          ))}
        </select>

        {meta.touched && meta.error && (
          <div className="text-red-500">{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default DropDownListBox;
