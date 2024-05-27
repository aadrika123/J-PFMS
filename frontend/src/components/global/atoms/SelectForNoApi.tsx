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
  value?: string | number;
  name?: string;
  type?: string;
  code?: string;
  ulbs?: string;
  description?: string;
}

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: number | string;
  data: Option[] | [];
  error?: string | undefined;
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  visibility?: boolean;
  required?: boolean | false;
  shouldNameCome?: boolean | false;
  handler?: (id: number | string, value?: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const SelectForNoApi: React.FC<SelectProps> = (props) => {
  const [, , helpers] = useField(props.name);
  const [, , helpers1] = useField(`${props.name}_name`);

  const { setValue } = helpers;
  const { setValue: setValue1 } = helpers1;

  const fieldId = "id_" + props.name;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.readonly) {
      const selectedOption = e.target.options[e.target.selectedIndex].dataset;
      if (props.handler) {
        props.handler(parseInt(e.target.value), selectedOption.name);
      }
      setValue(parseInt(e.target.value));
      if (props.shouldNameCome) {
        setValue1(selectedOption.name);
      }
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
          className={`text-primary h-[40px] pl-3 rounded-lg border shadow-lg bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          {props.placeholder && <option selected value={0}>
            {props.placeholder}
          </option>}
          {props?.data?.length && props?.data.map((d: Option) => (
            <option
              key={d?.id}
              value={d?.value ? d?.value : d?.id}
              data-name={
                d?.name ||
                d?.type ||
                (d?.code && d?.description
                  ? `${d.code}-${d?.description}`
                  : d?.code) ||
                d?.ulbs
              }
            >
              {d?.name ||
                d?.type ||
                (d?.code && d?.description
                  ? `${d.code}-${d?.description}`
                  : d?.code) ||
                d?.ulbs}
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
