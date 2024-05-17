'use client'

import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
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



interface CanProvideData {
  getData(): Promise<any>;
}


const SORRecordRow = forwardRef<CanProvideData>((props, ref) => {

  const formikRef = useRef<FormikProps<any>>(null);

  useImperativeHandle(ref, () => ({
    async getData() {
      formikRef?.current?.handleSubmit();
      const data: any = await formikRef?.current?.validateForm();
      if (Object.keys(data).length == 0) {
        const d = formikRef.current?.values;
        return d;
      } else {
        return null;
      }

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
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => { }}

      >
        {({ values, handleChange, errors, touched }: any) => (

          <>
            <div className="table-cell text-color-secondary p-2">1</div>
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
            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.quantity}
                error={errors.quantity}
                touched={touched.quantity}
                name="quantity"
                placeholder="Enter quantity"
                required
                type="text"
                readonly={false}
              />
            </div>
            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.rate}
                error={errors.rate}
                touched={touched.rate}
                name="rate"
                placeholder="Enter rate"
                required
                type="text"
                readonly={false}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.cost}
                error={errors.cost}
                touched={touched.cost}
                name="cost"
                placeholder="Enter Cost"
                required
                type="text"
                readonly={false}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.year}
                error={errors.year}
                touched={touched.year}
                name="year"
                placeholder="Enter Year"
                required
                type="text"
                readonly={false}
              />
            </div>

            <div className="table-cell text-color-secondary pt-2">
              <Input
                onChange={handleChange}
                value={values.remarks}
                error={errors.remarks}
                touched={touched.remarks}
                name="remarks"
                placeholder="Enter Remarks"
                required
                type="text"
                readonly={false}
              />
            </div>

          </>


        )}
      </Formik >


    </form>


  );
});


SORRecordRow.displayName = "SORRecordRow";


const SORTable = forwardRef<CanProvideData>((props, ref) => {
  const rows = useState<any | null>({});


  const addRowRef = (index: number, element: any) => {
    console.log("ref: ", element);
    if (element != null) {
      rows[index] = element;
    }
  }



  useImperativeHandle(ref, () => ({
    async getData() {

      const keys = Object.keys(rows);
      console.log(keys.length);
      for (let i = 0; i < keys.length; i++) {
        const key: number = Number(keys[i]);
        const row = rows[key];
        const data = await row.getData();
        console.log("row: " + i, data);
      }

      return "hello";
    }
  }));





  return (
    <>
      <div className="my-6">
        <div className="flex justify-between bg-primary_bg_indigo p-2 rounded">
          <div></div>
          <div className="flex justify-center text-2xl text-white">Title</div>
          <div><Button variant="primary">Edit</Button></div>
        </div>
        <div className="text-xs table">
          <div className="table-row p-6 rounded border">
            <div className="table-cell text-color-secondary p-2">Sr. No</div>
            <div className="table-cell text-color-primary">Description</div>
            <div className="table-cell text-color-primary">Unit</div>
            <div className="table-cell text-color-primary">Quantity</div>
            <div className="table-cell text-color-primary">Rate</div>
            <div className="table-cell text-color-primary">Cost</div>
            <div className="table-cell text-color-primary">SOR Year</div>
            <div className="table-cell text-color-primary">Remarks</div>
          </div>

          <SORRecordRow ref={(element: any) => { addRowRef(0, element) }} />
          <SORRecordRow ref={(element: any) => { addRowRef(1, element) }} />
          <SORRecordRow ref={(element: any) => { addRowRef(2, element) }} />


        </div>

      </div>


    </>

  );
});

SORTable.displayName = "SORTable";


const ScheduleOfRatesRegistrationPage = () => {
  const tables = useState<any | null>({});


  const addTableRef = ((index: number, element: any) => {
    console.log("table ref: ", element);
    if (element != null) {
      tables[index] = element;
    }
  })

  const collectData = async () => {
    const keys = Object.keys(tables);
    for(let i=0;i<keys.length;i++){
      const key: number = Number(keys[i]);
      const table = tables[key];
      const data = await table.getData();
      console.log("table: " + i, data);
    }
  }


  return (

    <>
      <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
        <Button
          variant="cancel"
          className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
          onClick={goBack}
        >
          {Icons.back}
          <b>Back</b>
        </Button>

        <div>
          Enter SOR Details
        </div>
      </div>
      <SORTable ref={(element: any) => { addTableRef(0, element) }} />

      <SORTable ref={(element: any) => { addTableRef(1, element) }} />

      <div className="flex justify-center pt-10">
        <Button variant="primary" onClick={collectData}>Click</Button>
      </div>

    </>

  );
}

export default ScheduleOfRatesRegistrationPage;