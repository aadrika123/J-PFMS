import React, { ChangeEvent } from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 10-02-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface Option {
  id: number;
  value?: string | number;
  name?: string;
  type?: string;
  code?: string;
  ulbs?: string;
  description?: string;
}

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: number | string;
  data: Option[] | [];
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  visibility?: boolean;
  required?: boolean | false;
  handler?: (id: number | string) => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectForNoApi: React.FC<SelectProps> = (props) => {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!props.readonly && props.onChange) {
      props.onChange(e);
    }
    if(!props.readonly && props.handler){
      props.handler(e.target.value)
    }
  };

  return (
    <>
      <div className={`flex flex-col gap-1 ${props.readonly && 'dropdown-container'}`}>
        <label className="text-secondary text-sm" >
          {props.label}
          {props.required ? <span className="text-red-600 pl-2">*</span> : ""}
        </label>
        <select
          disabled={props.readonly}
          onChange={(event) => handleChange(event)}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
        >
          <option selected value="">
            {props.placeholder}
          </option>
          {props?.data?.map((d: Option) => (
            <option
              key={d?.id}
              value={d?.value ? d?.value : d?.id}
              data-name={
                d?.name ||
                d?.type ||
                (d?.code && d?.description
                  ? `${d.code}-${d?.description}`
                  : d?.code) ||
                d?.ulbs
              }
            >
              {d?.name ||
                d?.type ||
                (d?.code && d?.description
                  ? `${d.code}-${d?.description}`
                  : d?.code) ||
                d?.ulbs}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectForNoApi;
