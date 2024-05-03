import React from "react";
import { useField } from "formik";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 10-02-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface Option {
    id: number;
    name?: string;
    type?: string;
    code?: string;
  }

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: number | string;
  options: Option[] | [];
  error?: string | undefined;
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}



const SelectForNoApi: React.FC<SelectProps> = (props) => {
  const [, , helpers] = useField(props.name);
  const [, , helpers1] = useField(`${props.name}_name`);
 
  const { setValue } = helpers;
  const { setValue: setValue1 } = helpers1;


  const fieldId = "id_" + props.name;

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setValue(parseInt(e.target.value))
    const selectedOption = e.target.options[e.target.selectedIndex].dataset;
    setValue1(selectedOption.name);
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
        </label>
        <select
          disabled={props.readonly}
          onChange={(event) => handleChange(event)}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          <option selected value="">{props.placeholder}</option>
          {props?.options.map((d: Option) => (
            <option key={d?.id} value={d?.id} data-name={d?.name || d?.type || d?.code}>
              {d?.name || d?.type || d?.code}
            </option>
          ))}
        </select>

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default SelectForNoApi;
