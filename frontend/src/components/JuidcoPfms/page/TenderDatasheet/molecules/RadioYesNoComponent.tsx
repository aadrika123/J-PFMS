/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Radio Button
 * | Status- open
 */

import { useField } from "formik";
import React, { ChangeEvent } from "react";

type RadioYesNoComponentType = {
  title: string;
  changeHandler?: (isChecked: boolean) => void;
  name: string;
  readonly?: boolean;
  value: boolean;
  error: string | undefined;
  touched: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean | false;
  className?: string;
  optionAlign?: "col" | "raw";
  labelAlign?: "col" | "raw";
};

const RadioYesNoComponent: React.FC<RadioYesNoComponentType> = (props) => {
  const {
    title,
    changeHandler,
    optionAlign = "raw",
    labelAlign = "raw",
    readonly = false,
  } = props;

  const [, , helpers] = useField(props.name);
  const { setValue } = helpers;

  const options = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  //////// Internal Handle Change //////////////
  const internalHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      const value = e.target.value === "false" ? false : true;
      setValue(value);
      changeHandler && changeHandler(value);
    }
  };

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label
        className={`text-sm font-medium ${props.touched && props.error ? "text-red-600" : "text-black"}`}
      >
        {title}
        {props.required ? <span className="text-red-600">*</span> : ""}
      </label>
      <div
        className={`flex ${optionAlign === "raw" ? "flex-wrap" : "flex-col"}`}
      >
        {options?.map((option: any, index: number) => (
          <div key={index} className="inline-flex mr-2 items-start flex-col">
            <label
              htmlFor={props.name + index}
              className={`label cursor-pointer flex items-center ${optionAlign === "col" ? "flex-raw flex-row-reverse" : labelAlign === "raw" ? "flex-raw flex-row-reverse" : "flex-col"}`}
            >
              <span className="label-text text-nowrap">{option?.label}</span>
              <input
                type="radio"
                checked={props.value === option.value}
                value={option.value}
                onBlur={props.onBlur}
                className={`radio radio-xs border-primary_bg_indigo hover:border-primary_bg_indigo checked:bg-primary_bg_indigo ${optionAlign === "col" || (labelAlign === "raw" && "mr-2")}`}
                onChange={internalHandleChange}
                id={props.name + index}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioYesNoComponent;
