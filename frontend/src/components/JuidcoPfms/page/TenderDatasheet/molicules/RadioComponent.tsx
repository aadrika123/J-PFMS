/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Radio Component
 * | Status- open
 */

import { useField } from "formik";
import React, { ChangeEvent } from "react";

type RadioComponentType = {
  checkList: any;
  changeHandler?: (newItem: string) => void;
  name: string;
  readonly?: boolean;
  value: string;
  error: string | undefined;
  touched: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean | false;
  className?: string;
  optionAlign?: "col" | "raw";
  labelAlign?: "col" | "raw";
};

const RadioComponent: React.FC<RadioComponentType> = (props) => {
  const {
    checkList,
    changeHandler,
    optionAlign = "raw",
    labelAlign = "raw",
    readonly = false,
  } = props;

  const [, , helpers] = useField(props.name);
  const { setValue } = helpers;

  
  //////// Internal Handle Change //////////////
  const internalHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!readonly) {
      const newItem = e.target.value;
      setValue(newItem)
      changeHandler && changeHandler(newItem);
    }
  };

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label
        className={`text-sm font-medium ${props.touched && props.error ? "text-red-600" : "text-black"}`}
      >
        {checkList.title}
        {props.required ? <span className="text-red-600 pl-2">*</span> : ""}
      </label>
      <div
        className={`flex ${optionAlign === "raw" ? "flex-wrap" : "flex-col"}`}
      >
        {checkList.options?.map((option: any, index: number) => (
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
                className={`radio radio-primary border-primary_bg_indigo h-4 w-4 ${optionAlign === "col" || (labelAlign === "raw" && "mr-2")}`}
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

export default RadioComponent;
