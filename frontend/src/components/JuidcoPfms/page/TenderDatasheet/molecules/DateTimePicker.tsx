/**
 * | Author- Sanjiv Kumar
 * | Created On- 28-05-2024
 * | Created for- Checkbox Component
 * | Status- open
 */

import { useField } from "formik";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type DateTimePickerComponentType = {
  changeHandler?: (newItem: string) => void;
  name: string;
  label: string;
  readonly?: boolean;
  value: string;
  error: string | undefined;
  touched: boolean;
  onChange?: (value: Dayjs | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean | false;
  className?: string;
};

const DateTimePickerComponent: React.FC<DateTimePickerComponentType> = (
  props
) => {
  const { label, changeHandler, onChange, readonly = false } = props;
  const [, , helpers] = useField(props.name);
  const { setValue } = helpers;

  //////// Internal Handle Change //////////////
  const internalHandleChange = (value: Dayjs | null) => {
    const date: any = value?.format();
    if (!readonly) {
      //   setValue(date);
      onChange && onChange(date);
      changeHandler && changeHandler(date);
    }
  };

  return (
    <div className={`flex flex-col ${props.className}`}>
      <label className={`text-sm font-medium "text-black"}`}>
        {label}
        {props.required ? <span className="text-red-600">*</span> : ""}
      </label>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={dayjs(props.value)}
          onChange={internalHandleChange}
          referenceDate={dayjs("2022-04-17T15:30")}
          format="DD-MM-YYYY hh:mm a"
        />
      </LocalizationProvider>

      {props.touched && props.error && (
        <div className="text-red-500">{props.error}</div>
      )}
    </div>
  );
};

export default DateTimePickerComponent;
