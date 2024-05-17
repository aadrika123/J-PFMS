'use client'

import { Formik, FormikProps } from "formik";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import * as Yup from "yup";


interface InputProps {
  name?: string;
  type?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean | false;
}

const Input: React.FC<InputProps> = (props) => {
  const fieldId = "id_" + props.name;


  return (
    <>
      <div className="flex flex-col gap-1 w-[80%]">
        <div
          className={`flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`}
        >
          <input
            disabled={props.readonly}
            required={props.required}
            placeholder={props.placeholder}
            onChange={props.onChange}
            type={props.type}
            value={props?.value}
            className={`text-primary h-[40px] p-3 bg-transparent outline-none`}
            name={props.name}
            id={fieldId}
          />
        </div>

        <div>
          {props.touched && props.error && (
            <div className="text-red-500">{props.error}</div>
          )}
        </div>

      </div>
    </>
  );
};



interface CanShowAlert {
  getData(): Promise<any>;
}

interface SORRecordRowProps {
  onRef?: (element: any) => void;
};

const SORRecordRow = forwardRef<CanShowAlert, SORRecordRowProps>((props: SORRecordRowProps, ref) => {

  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({

    getData() {
      return new Promise((resolve, reject) => {
        console.log("Validating", formikRef);

        formikRef?.current?.handleSubmit();
  
        formikRef?.current?.validateForm().then((data) => {
          console.log("data", data);
          if(Object.keys(data).length == 0){
            const d = formikRef.current?.values;
            resolve(d);
          }else{
            reject(data);
          }
        }).catch((error) => {
          console.log(error, "error");
          reject(error);
        });
  
      });
    }

  }));

  const initialValues = {
    description: "default description",
    unit: "fdsfsf",
    quantity: "100",
    rate: "323",
    cost: 90,
    year: "2024",
    remarks: "remarks goes here"
  };


  const validationSchema = Yup.object({
    unit: Yup.number().required(),
    quantity: Yup.number().required(),
    rate: Yup.number().required(),
    cost: Yup.number().required(),
  });


  return (
    <form className="table-row">

      <Formik
        innerRef={(element) => {if (props.onRef) props.onRef(element)}}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => { }}

      >
        {({ values, handleChange, handleBlur, errors, touched }: any) => (

          <>
            <div className="table-cell text-color-secondary pt-2">1</div>
            <div className="table-cell text-color-primary pt-2">
              <Input
                onChange={handleChange}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                name="description"
                placeholder="Enter Description"
                required
                type="text"
                readonly={false}
              />
            </div>
            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.unit}
                error={errors.unit}
                touched={touched.unit}
                name="unit"
                placeholder="Enter Unit"
                required
                type="text"
                readonly={false}
              />
            </div>
            <div className="table-cell text-color-secondary pt-2"><input type="text" className="w-[100px]" name="quantity" value={values.quantity} onChange={handleChange} /></div>
            <div className="table-cell text-color-secondary pt-2"><input type="text" className="w-[100px]" name="rate" value={values.rate} onChange={handleChange} /></div>

            <div className="table-cell text-color-secondary pt-2"><input type="text" className="w-[100px]" name="cost" value={values.cost} onChange={handleChange} /></div>

            <div className="table-cell text-color-secondary pt-2"><input type="text" className="w-[100px]" name="year" value={values.year} onChange={handleChange} /></div>

            <div className="table-cell text-color-secondary pt-2"><input type="text" className="w-[100px]" name="remarks" value={values.remarks} onChange={handleChange} /></div>

          </>


        )}
      </Formik >


    </form>


  );
});


interface RowRefs {
  [key: string]: string[];
}

const SORTable = () => {
  const childRef = useRef<CanShowAlert>(null);

  const children = useState<RowRefs | null>(null);

  const addRowRef = (index: number, element: any) => {
    console.log("ref: ", element);
    if(element != null){
      children[index] = element;
    }
  }

  const collectData = () =>{
    const firstChild = children[0];
  
    // firstChild.getData().then((data) => {
    //   console.log("data", data);
    // }).catch((error) => {
    //   console.log("error: ", error);
    // });
  }

  return (
    <>
      <div className="text-xs mt-5 table">
        <div className="table-row">
          <div className="table-cell text-color-secondary pr-4">Sr. No</div>
          <div className="table-cell text-color-primary">Description</div>
          <div className="table-cell text-color-primary">Unit</div>
          <div className="table-cell text-color-primary">Quantity</div>
          <div className="table-cell text-color-primary">Rate</div>
          <div className="table-cell text-color-primary">Cost</div>
          <div className="table-cell text-color-primary">SOR Year</div>
          <div className="table-cell text-color-primary">Remarks</div>

        </div>

        <SORRecordRow onRef={(element: any) => { addRowRef(0, element) }}/>

      </div>

      <button onClick={collectData}>Click</button>
    </>

  );
}

const ScheduleOfRatesPage = () => {

  return (
    <SORTable />
    
  );
}

export default ScheduleOfRatesPage;