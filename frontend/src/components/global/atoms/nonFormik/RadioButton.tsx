import React from "react";
import { Field, FieldProps } from "formik";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Radio Button
 * | Status- done
 */

interface Options {
  key: string;
  value: string;
}

interface RadioButtonProps {
  label: string;
  name: string;
  options: Options[];
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const RadioButtons: React.FC<RadioButtonProps> = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label className="text-secondary text-sm">{label}</label>
      <Field name={name}>
        {({ field }: FieldProps) => (
          <div className="flex items-center">
            {options.map((option: Options) => (
              <div className="flex items-center mr-3" key={option.key}>
                <input
                  disabled={props.readonly}
                  className="mr-1"
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label
                  className="text-secondary text-sm"
                  htmlFor={option.value}
                >
                  {option.key}
                </label>
              </div>
            ))}
          </div>
        )}
      </Field>
      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default RadioButtons;
