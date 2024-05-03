import React, { ChangeEvent, useState } from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- CheckBox Field
 * | Status- done
 */

interface CheckboxProps {
  label?: string;
  name: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: number | string;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Checkboxes: React.FC<CheckboxProps> = (props) => {
  const { label, name, onChange, ...rest } = props;
  const fieldId = "id_" + name;

  const [checked, setChecked] = useState<any>(true);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          disabled={props.readonly}
          checked={checked}
          className="mr-1 cursor-pointer"
          name={name}
          type="checkbox"
          id={fieldId}
          onChange={handleChange}
          {...rest}
        />
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {label}
        </label>
      </div>
      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default Checkboxes;
