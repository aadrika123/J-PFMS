import React from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- TextArea Field
 * | Status- done
 */

interface TextareaProps {
  label: string;
  name: string;
  type?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextArea: React.FC<TextareaProps> = (props) => {
  const { label, name, ...rest } = props;
  const fieldId = "id_" + name;
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {label}
        </label>
        <input
          {...rest}
          disabled={props.readonly}
          className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        />

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default TextArea;
