import React, { ChangeEvent, ReactNode } from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- TextArea Field
 * | Status- done
 */

interface TextareaProps {
  label?: React.ReactNode;
  name?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  required?: boolean | false;
  icon?: ReactNode;
  iconAlign?: "left" | "right";
  maxlength?: number;
  pattern?: any;
}

const TextArea: React.FC<TextareaProps> = (props) => {
  const fieldId = "id_" + props.name;

  ///// If the Input type will be number then MouseWheeler will be disabled ////////////

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!props.readonly && props.onChange && props?.onBlur) {
      if (
        (props?.maxlength && e.target.value.length <= props?.maxlength) ||
        !props?.maxlength
      )
        if (!props?.pattern || props?.pattern?.test(e.target.value)) {
          if (e.target.value.length !== 0)
            props?.onBlur(e as React.FocusEvent<HTMLTextAreaElement>);
          props.onChange(e);
        }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required ? <span className="text-red-600 pl-2">*</span> : ""}
        </label>
        <div
          className={`relative flex items-center justify-between rounded border bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none ${props.icon && props.iconAlign === "left" && "flex-row-reverse"} ${props.readonly ? `bg-gray-300` : ""}`}
        >
          <textarea
            disabled={props.readonly}
            required={props.required}
            placeholder={props.placeholder}
            onChange={handleChange}
            onBlur={props.onBlur}
            value={props?.value}
            className={`text-primary min-h-32 px-3 pt-1 pb-3 bg-transparent outline-none hide-scrollbar w-full shadow-lg ${props.className}`}
            name={props.name}
            id={fieldId}
          />
          {props.maxlength && (
            <span
              className={`absolute bottom-0 right-2 text-xs bg-white ${props.maxlength === props?.value?.length && "text-red-500"}`}
            >
              {props?.value?.length} / {props.maxlength}
            </span>
          )}
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

export default TextArea;
