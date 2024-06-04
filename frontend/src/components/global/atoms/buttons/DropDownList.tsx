import { useQuery } from "react-query";
import React, { ChangeEvent } from "react";
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
  onChangeText?: (text: string) => void;
  onBlur: (e?: React.FocusEvent<HTMLSelectElement>) => void;
  isReadOnly?: boolean;
}

interface Item {
  id: number;
  name: string;
}

const DropDownList: React.FC<DropDownListProps> = (props) => {
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
    console.log(dataError);
    throw new Error("Fatal Error!");
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!props.isReadOnly) {
      setValue(parseInt(e.target.value));
      if (props.onChangeText) {
        props.onChangeText(e.target.selectedOptions[0].text);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 ">*</span> : ""}
        </label>
        <select
          {...field}
          onChange={handleChange}
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
              {item.name}
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

export default DropDownList;
