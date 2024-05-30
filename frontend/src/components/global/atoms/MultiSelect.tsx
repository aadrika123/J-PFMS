import React from "react";
import { useField } from "formik";
import Select, { StylesConfig } from "react-select";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 27-05-2024
 * | Created for- Multi Select Input Field
 * | Status- done
 */

interface Option {
  value: string | number;
  label: string | number;
}

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: Option[];
  data: Option[] | [];
  error?: string | undefined;
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  visibility?: boolean;
  required?: boolean | false;
  handler?: (value: any) => void;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

const MultiSelect: React.FC<SelectProps> = (props) => {
  const colourStyles: StylesConfig<Option, true> = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "white",
      border: "none",
      outline: state.isFocused ? "1.5px solid black" : "1px solid gray",
    }),
  };

  const [, , helpers] = useField(props.name);

  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  const handleChange = (e: any) => {
    if (!props.readonly) {
      if (props.handler) {
        props.handler(e);
      }
      setValue(e);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col gap-1 ${props.readonly && "dropdown-container"}`}
      >
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 ">*</span> : ""}
        </label>

        <Select
          options={props.data}
          isMulti
          styles={colourStyles}
          isDisabled={props.readonly}
          value={props.value}
          onChange={handleChange}
          onBlur={props.onBlur}
          className={`text-primary h-[40px] rounded-lg border shadow-lg bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
          isClearable={true}
        />

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default MultiSelect;
