import React, { ChangeEvent, ReactNode } from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 02-02-2024
 * | Created for- Input Field
 * | Status- done
 */

interface InputProps {
  label?: React.ReactNode;
  name?: string;
  type?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean | false;
  icon?: ReactNode;
  iconAlign?: "left" | "right";
  maxlength?: number;
  labelColor?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const fieldId = "id_" + props.name;
  const {labelColor = "secondary"} = props;

  ///// If the Input type will be number then MouseWheeler will be disabled ////////////
  const handleFocus = (e: any) => {
    if (props.type && props.type === "number") {
      e.target.addEventListener("wheel", function (e: any) {
        e.preventDefault();
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!props.readonly && props.onChange) {
      if((props?.maxlength && String(e.target.value).length <= props?.maxlength) || !props?.maxlength)
      props.onChange(e);
    }
  };


  // ////// Handle OnInput 
  // const handleOnInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   if(props?.maxlength){
  //     e.target.value = Math.max(0, parseInt(e.target.value))
  //     .toString()
  //     .slice(0, props?.maxlength);
  //   }
  // }

  return (
    <>
      <div className={`flex flex-col gap-1`}>
        <label className={`text-${labelColor} text-sm`} htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 ">*</span> : ""}
        </label>
        <div
          className={`flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none ${props.icon && props.iconAlign === "left" && "flex-row-reverse"} ${props.readonly ? `bg-gray-300` : ""}`}
        >
          <input
            disabled={props.readonly}
            // required={props.required}
            placeholder={props.placeholder}
            onChange={handleChange}
            onBlur={props.onBlur}
            onFocus={handleFocus}
            type={props.type}
            value={props?.value}
            // onInput={handleOnInput}
            className={`text-primary h-[40px] p-3 rounded outline-none  w-full ${props.readonly ? 'cursor-not-allowed bg-[#f0f0f0]' : 'bg-white '}`}
            name={props.name}
            id={fieldId}
          />
          {props.icon && (
            <div className={`${props.iconAlign === "left" ? "ml-2" : "mr-2"}`}>
              {props.icon}
            </div>
          )}
        </div>

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default Input;
