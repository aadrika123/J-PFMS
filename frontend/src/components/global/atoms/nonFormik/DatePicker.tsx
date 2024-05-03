import React from "react";
import DatePicker from "react-datepicker";
import {FormikErrors, FormikTouched } from "formik";
import "react-datepicker/dist/react-datepicker.css";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 25-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

interface DateInputBoxProps {
  label?: React.ReactNode;
  name: string;
  value: Date;
  error?: FormikErrors<Date> | undefined;
  touched?: FormikTouched<Date> | undefined;
  className?: string;
  onChange: (e: any) => void;
}

const DateInputBox: React.FC<DateInputBoxProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {props.label && (<label className="text-secondary text-sm">{props.label}</label>)}

        <DatePicker
          selected={props.value}
          onChange={(date) => props.onChange(date)}
          className={`w-full p-2 text-primary rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
        />

        {props.touched && props.error && (
          <div className="text-red-500">Invalid date</div>
        )}
      </div>
    </>
  );
};

export default DateInputBox;
