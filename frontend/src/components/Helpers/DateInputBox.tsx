import React from "react";
import DatePicker from "react-datepicker";
import { useField, FormikErrors, FormikTouched } from "formik";
import "react-datepicker/dist/react-datepicker.css";

/**
 * | Author- Bijoy Paitandi
 * | Created On- 25-01-2024
 * | Created for- Chequebook Entry
 * | Status- open
 */

interface DateInputBoxProps {
  label: React.ReactNode;
  name: string;
  value: Date | number;
  error?: FormikErrors<Date> | undefined;
  touched?: FormikTouched<Date> | undefined;
  className?: string;
}

const DateInputBox: React.FC<DateInputBoxProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);

  const { value } = meta;
  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  
  return (
    <>
    <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
        </label>
        
        <DatePicker
            {...field}
            id={fieldId}
            showIcon
            selected={value}
            onChange={(date) => setValue(date)}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <mask id="ipSApplication0">
                  <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                    <path
                      fill="#fff"
                      d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                    ></path>
                  </g>
                </mask>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSApplication0)"
                ></path>
              </svg>
            }
            className={`w-full text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
        />


        {props.touched && props.error && (
          <div className="text-red-500">Invalid date</div>
        )}
      </div>
    </>

  );
};

export default DateInputBox;
