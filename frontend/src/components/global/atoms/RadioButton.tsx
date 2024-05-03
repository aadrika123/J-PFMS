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
  handler?: (id: number | string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const RadioButtons: React.FC<RadioButtonProps> = (props) => {
  const { label, name, options, onChange, handler, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    handler && handler(e.target.value);
  };
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
                  // className="cursor-pointer mr-1 w-4 h-4 checkbox checkbox-success bg-gray-100 focus:ring-primary_bg_indigo dark:ring-offset-gray-100 focus:ring-2 dark:bg-gray-100 dark:border-primary_bg_indigo focus:border-white "
                  className="mr-1 appearance-none border border-zinc-400 rounded w-6 h-6 checked:bg-primary_bg_indigo checked:text-white  checked:border-transparent cursor-pointer"
                  // className="cursor-pointer mr-1 w-4 h-4 checkbox text-yellow-400 bg-gray-100 border-red-600 focus:ring-primary_bg_indigo dark:ring-offset-gray-100 focus:ring-2 dark:bg-gray-100 dark:border-primary_bg_indigo focus:border-white"
                  // className="cursor-pointer mr-1 checkbox checkbox-success w-4 h-4 text-primary_bg_indigo bg-white focus:ring-primary_bg_indigo dark:ring-offset-white focus:ring-offset-white focus:ring-2 dark:bg-white border-primary_bg_indigo"
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  onChange={handleChange}
                  value={option.value}
                  checked={String(field.value) === option.value}
                />
                <label
                  className="text-secondary text-sm selected"
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
