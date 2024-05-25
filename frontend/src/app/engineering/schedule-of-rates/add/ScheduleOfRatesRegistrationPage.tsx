'use client'

import { Icons } from "@/assets/svg/icons";
import Button from "@/components/global/atoms/buttons/Button";
// import CloseButton from "@/components/global/atoms/buttons/CloseButton";
import goBack from "@/utils/helper";
import { Formik, FormikProps } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as Yup from "yup";

import { useInformationDialog } from "./Dialogs";


const units = ["Sqm", "Day"];

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
      <div className="flex justify-center">
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
      </div>
    </>
  );
};


interface DDLOptions{
  name: string;
  caption: string;
}

interface DDLProps {
  name?: string;
  type?: string;
  readonly?: boolean;
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean | false;
  options: DDLOptions[];
}

const DDL: React.FC<DDLProps> = (props) => {
  const fieldId = "id_" + props.name;


  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col gap-1 w-[80%]">
          <div
            className={`flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`}
          >
            <select
            disabled={props.readonly}
            required={props.required}
              onChange={props.onChange}
              value={props?.value}
              className={`text-primary h-[40px] p-3 bg-transparent outline-none`}
              name={props.name}
              id={fieldId}
            >

              {props.options.map((item, index) => {
                return (
                  <option key={`${item.name}-option-${index}`} value={item.name}>{item.caption}</option>
                );
              })}
            </select>
          </div>

          <div>
            {props.touched && props.error && (
              <div className="text-red-500">{props.error}</div>
            )}
          </div>

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
    },

  }));

  // const initialValues = {
  //   description: "",
  //   unit: "Sqm",
  //   quantity: "0",
  //   rate: "0.0",
  //   cost: 0,
  //   year: "",
  //   remarks: ""
  // };

  const initialValues = {
    description: "fdsf",
    unit: "Sqm",
    quantity: "5",
    rate: "5",
    cost: 10,
    year: "2024",
    remarks: "fsdf fdsf"
  };


  const validationSchema = Yup.object({
    description: Yup.string().required(),
    unit: Yup.string().oneOf(units),
    quantity: Yup.number().required().moreThan(0),
    rate: Yup.number().required().moreThan(0),
    cost: Yup.number().required().moreThan(0),
    year: Yup.number().required().moreThan(2023).lessThan(2025),
    remarks: Yup.string().required(),
  });


  return (
    

      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => { }}

      >
        {({ values, handleChange, errors, touched }: any) => (

          <>
            <div className="table-cell text-color-primary">

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
              <DDL
                onChange={handleChange}
                value={values.unit}
                error={errors.unit}
                touched={touched.unit}
                name="unit"
                required
                type="text"
                readonly={false}
                options={
                  [
                    {name: "Sqm", caption: "Sqm"},
                    {name: "Day", caption: "Day"},
                    
                ]}
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


  


  );
});


SORRecordRow.displayName = "SORRecordRow";

interface SORTableProps {
  tableIndex: number,
}

const SORTable = forwardRef<CanProvideData, SORTableProps>((props: SORTableProps, ref) => {
  const defaultTitle = "Title";
  const [titleEditable, setTitleEditable] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(defaultTitle);
  const [inputText, setInputText] = useState<string>("");
  const [rowCountInputValue, setRowCountInputValue] = useState<number>(1);

  const [rows, setRows] = useState<any[]>([
    <SORRecordRow key="row-0" ref={(element: any) => { addRowRef(0, element) }} />
  ]);

  const [rowRefs, setRowRefs] = useState<any | null>({});
  const addRowRef = (index: number, element: any) => {
    if (element != null) {
      rowRefs[index] = element;

    }
  }


  const addRow = () => {
    const index = rows.length;
    const newRows = [...rows,
    <SORRecordRow key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} />
    ];
    setRows(newRows);
  }

  const removeLastRow = () => {
    const rowCount = rows.length;
    if (rowCount > 1) {

      // update list of row Nodes
      const newRows = [...rows];
      newRows.pop();
      setRows(newRows);

      // remove from refs too
      const newRefs = {...rowRefs};
      delete newRefs[rowCount-1];
      setRowRefs(newRefs);

    } else {
      alert("Kindly use the remove table option instead!");
    }
  }

  const addNRows = (n: number) => {
    const existingRowCount = rows.length;
    const newRows = [...rows];
    for (let index = existingRowCount; index < existingRowCount + n; index++) {
      newRows.push(
        <SORRecordRow key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} />
      );
    }
    setRows(newRows);
  }



  useImperativeHandle(ref, () => ({
    async getData() {

      if(title == defaultTitle){
        alert(`Kindly Provide Proper Title in Table${props.tableIndex+1}`);
        return null;
      }

      const data: any[] = [];
      const keys = Object.keys(rowRefs);
      console.log(keys);

      let atleastOneFormInvalid = false;
      for (let i = 0; i < keys.length; i++) {
        const key: number = Number(keys[i]);
        const row = rowRefs[key];

        // console.log(row);
        const rowData = await row?.getData();
        if (rowData == null) {
          atleastOneFormInvalid = true;
        }
        data.push(rowData);
//        console.log("row: " + i, rowData);
      }

      return atleastOneFormInvalid ? null : {title: title, 'records': data};
    }
  }));


  return (
    <>
      <div className="mx-2 p-2">
        <div className="overflow-x-auto">
          <div className="text-xs table border-2">
            <div className="table-caption" title="Double click to change the title">
              <div className="flex justify-between bg-primary_bg_indigo p-2">
                <div></div>
                <div className="flex justify-center text-2xl">
                  {titleEditable ?
                    (<input autoFocus type="text" className="text-center" defaultValue={title}
                      onChange={(event) => setInputText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          if (inputText.length > 0) {
                            setTitle(inputText);
                          }
                          setTitleEditable(false);
                        } else if (event.key === "Escape") {
                          setTitleEditable(false);
                        }
                      }
                      }
                    />)
                    :
                    (<span className="text-white" onDoubleClick={() => setTitleEditable(true)}>{title}</span>)
                  }
                </div>

                <div>
                  {/* {!titleEditable && (<Button variant="primary" onClick={() => setTitleEditable(!titleEditable)}>Edit</Button>)} */}
                </div>
              </div>

            </div>


            <div className="table-row p-6 border text-center">
              <div className="table-cell text-color-secondary p-2">Sr. No</div>
              <div className="table-cell text-color-primary">Description</div>
              <div className="table-cell text-color-primary">Unit</div>
              <div className="table-cell text-color-primary">Quantity</div>
              <div className="table-cell text-color-primary">Rate</div>
              <div className="table-cell text-color-primary">Cost</div>
              <div className="table-cell text-color-primary">SOR Year</div>
              <div className="table-cell text-color-primary">Remarks</div>
            </div>

            {rows.map((row, index) => {
              return (
              <>
              <form className="table-row border">
                <div className="table-cell text-color-secondary text-center">{index+1}</div>
                {row}
              </form>
              </>
              )
            })}

          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex justify-left gap-2">
            <div>
              <select className="text-center h-[100%] border-2 rounded" onChange={(event) => setRowCountInputValue(Number(event.target.value))}>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
              </select>
            </div>
            <div><Button variant="primary" onClick={() => addNRows(rowCountInputValue)}>{rowCountInputValue == 1 ? `Add 1 Row` : `Add ${rowCountInputValue} Rows`}</Button></div>
            <div>
              <Button variant="primary" onClick={addRow}>+</Button>
            </div>
            <div>
              <Button variant="primary" onClick={removeLastRow}>-</Button>
            </div>
          </div>
          <div>
            {/* <Button variant="primary" onClick={() => props.deleteMe(props.tableIndex)}>Remove Table</Button> */}
          </div>
        </div>

      </div>


    </>

  );
});

SORTable.displayName = "SORTable";


const ScheduleOfRatesRegistrationPage = () => {
  const [successDialog, showSuccessDialog] = useInformationDialog("Success", "The data has been submitted successfully!");

  const [tables, setTables] = useState<any>({}); 
  const [nextTableId, setNextTableId] = useState<number>(0);



  const [tableRefs, setTableRefs] = useState<any | null>({});
  const addTableRef = ((index: number, element: any) => {
    if (element != null) {
      tableRefs[index] = element;
    }
  })

  // const removeTable = (index: number) => {
  //   console.log(index);
  //   console.log(tables);
  //   console.log(Object.keys(tables));
  //   if (Object.keys(tables).length == 1) {
  //     alert("Sorry, at least 1 table is required.");
  //   } else {

  //     // update list of tables
  //     const newTables = { ...tables };
  //     delete newTables[index];
  //     setTables(newTables);

  //     // update ref list
  //     const newRefs = {...tableRefs};
  //     delete newRefs[index];
  //     setTableRefs(newRefs);

  //     console.log("Tables: ", newTables);
  //     console.log("Refs: ", newRefs);
  //   }
  // }


  const addTable = () => {
    const index = nextTableId;
    console.log("new table id: ", index);
    const newTables = { ...tables };
    newTables[index] = (<SORTable key={`sor-table-${index}`} ref={(element: any) => { addTableRef(index, element) }} tableIndex={index} />);

    setTables(newTables);
    setNextTableId(nextTableId + 1);

    console.log(newTables);
  }





  const collectData = async () => {

    const allData: any[] = [];
    let atleastOneFormInvalid = false;
    const keys = Object.keys(tableRefs);
    console.log("Keys: ", keys);
    for (let i = 0; i < keys.length; i++) {
      const key: number = Number(keys[i]);
      const table = tableRefs[key];
      const data = await table.getData();
      if (data == null) {
        atleastOneFormInvalid = true;
      }
      allData.push(data);
      console.log("table: " + i, data);
    }

    if (atleastOneFormInvalid){
      console.log("Invalid Data");
      alert("There are errors in the input values.");
    }

    else{
      console.log(allData);
      showSuccessDialog();

    }
  }


  const resetData = () => {

    const newTables = {};
    const newRefs = {};

    setTables(newTables);
    setTableRefs(newRefs);
  }

  // Add an empty table when the page is first time loaded
  useEffect(() => {
    addTable();
  }, []);

  // Add an empty table if user resets the page
  useEffect(() => {
    if(Object.keys(tables).length == 0){
      addTable();
    }
  }, [tables]);

  return (

    <>
    {successDialog}
      <div className="flex items-center justify-between pb-4 mb-4 bg-gray-300 p-2 shadow-xl">
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

      {Object.keys(tables).map((key) => {
        
        return (
          <>
            <div className="mb-2 bg-white p-2 shadow-xl">
              {/* <div className="flex justify-end mb-2">
                <div className="m-2" onClick={() => removeTable(Number(key))}>
                  <CloseButton />
                </div></div> */}
              {tables[key]}
            </div>
          </>
        );
      })}


      <div className="flex justify-end">
        <Button variant="primary" onClick={addTable}>Add Table +</Button>
      </div>


      <div className="flex justify-between pt-10">
        <div></div>
        <div className="flex justify-center gap-2">
          <Button variant="cancel" onClick={resetData}>Reset</Button>
          <Button variant="primary" onClick={collectData}>Save</Button>
        </div>
      </div>

    </>

  );
}

export default ScheduleOfRatesRegistrationPage;