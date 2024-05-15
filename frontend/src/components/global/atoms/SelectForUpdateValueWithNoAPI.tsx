import React, { useEffect } from "react";
import { useField } from "formik";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 06-05-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: number | string;
  data: Select[];
  error?: string | undefined;
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  visibility?: boolean;
  required?: boolean | false;
  handler?: (id: number | string) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  setFieldValue?: (field: string, value: any) => void;
  isNull?: any;
}

interface Select {
  id: number;
  name: string;
}

const SelectForUpdateValueWithNoAPI: React.FC<SelectProps> = (props) => {
  const [, , helpers] = useField(props.name);
//   const [, , helpers1] = useField(`${props.name}_name`);

  const { setValue } = helpers;
//   const { setValue: setValue1 } = helpers1;

  const fieldId = "id_" + props.name;

  useEffect(() => {
    if (props.setFieldValue) {
      if (props.isNull) {
        props.setFieldValue(`${props.name}`, 0);
      } else {
        props.setFieldValue(`${props.name}`, props.value);
      }
    }
  }, [props.value, props.isNull]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.readonly) {
      if (props.handler) {
        props.handler(parseInt(e.target.value));
      }
      setValue(parseInt(e.target.value));
    //   const selectedOption = e.target.options[e.target.selectedIndex].dataset;
    //   setValue1(selectedOption.name);
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-1 ${props.readonly && 'dropdown-container'}`}>
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 pl-2">*</span> : ""}
        </label>
        <select
          disabled={props.readonly}
          onChange={(event) => handleChange(event)}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg shadow-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          <option selected value={0}>
            {props.placeholder}
          </option>
          {props.data.length > 0 &&
            props.data.map((d: Select) => (
              <option
                key={d?.id}
                value={d?.id}
                data-name={
                  d?.name
                }
              >
                {d?.name}
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

export default SelectForUpdateValueWithNoAPI;
