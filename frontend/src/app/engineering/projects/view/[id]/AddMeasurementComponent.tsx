import Button from "@/components/global/atoms/buttons/Button";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";

import * as Yup from "yup";


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


interface DDLOptions {
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

const MeasurementRecord = forwardRef<CanProvideData>((props, ref) => {

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

    const initialValues = {
      description: "",
      unit: "Sqm",
      quantity: "0",
      rate: "0.0",
      cost: 0,
      year: "",
      remarks: ""
    };

    // const initialValues = {
    //     description: "fdsf",
    //     unit: "Sqm",
    //     quantity: "5",
    //     rate: "5",
    //     cost: 10,
    //     year: "2024",
    //     remarks: "fsdf fdsf"
    // };


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
                                    { name: "Sqm", caption: "Sqm" },
                                    { name: "Day", caption: "Day" },

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

MeasurementRecord.displayName = "SORRecordRow";



interface SORTableProps {
    tableIndex: number,
}

const MeasurementTable = forwardRef<CanProvideData, SORTableProps>((props: SORTableProps, ref) => {
    const [rowCountInputValue, setRowCountInputValue] = useState<number>(1);

    const [rows, setRows] = useState<any[]>([
        <MeasurementRecord key="row-0" ref={(element: any) => { addRowRef(0, element) }} />
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
        <MeasurementRecord key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} />
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
            const newRefs = { ...rowRefs };
            delete newRefs[rowCount - 1];
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
                <MeasurementRecord key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} />
            );
        }
        setRows(newRows);
    }



    useImperativeHandle(ref, () => ({
        async getData() {

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

            return atleastOneFormInvalid ? null : { 'records': data };
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
                                    Add Measurement (s)
                                </div>

                                <div>
                                    {/* {!titleEditable && (<Button variant="primary" onClick={() => setTitleEditable(!titleEditable)}>Edit</Button>)} */}
                                </div>
                            </div>

                        </div>


                        <div className="table-row p-6 border text-center">
                            <div className="table-cell text-color-secondary p-2">Sr. No</div>
                            <div className="table-cell text-color-primary">Description</div>
                            <div className="table-cell text-color-primary">No</div>
                            <div className="table-cell text-color-primary">Length</div>
                            <div className="table-cell text-color-primary">Breadth</div>
                            <div className="table-cell text-color-primary">Height</div>
                            <div className="table-cell text-color-primary">Quantity</div>
                            <div className="table-cell text-color-primary">Unit</div>
                            <div className="table-cell text-color-primary">SOR Rate</div>
                            <div className="table-cell text-color-primary">Amount</div>
                            <div className="table-cell text-color-primary">Remarks</div>
                        </div>

                        {rows.map((row, index) => {
                            return (
                                <>
                                    <form className="table-row border">
                                        <div className="table-cell text-color-secondary text-center">{index + 1}</div>
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

MeasurementTable.displayName = "SORTable";


interface DocumentsState {
    items: []
}

// class Documents extends React.Component {
//     state: DocumentSte1
//     constructor(props: any) {
//         super(props);
//         this.state = {
//             items: [1,3,4]
//         };
//     }

//     render() {
//         const {items} = this.state;
//       return (
//         {items.length}
//       );
//     }
//   }


interface AddMeasurementComponentProps {
    onBack: () => void,
}

export const AddMeasurementComponent = ({ onBack }: AddMeasurementComponentProps) => {
    // const documents = new Documents(10);
    const [tableRefs, setTableRefs] = useState<any | null>({});
    const addTableRef = ((index: number, element: any) => {
        if (element != null) {
            tableRefs[index] = element;
        }
    })


    const onSubmit = async () => {
        const table = tableRefs[0];
        const data = await table.getData();
        console.log(data);
    }

    return (
        <>
            <div>
                <MeasurementTable tableIndex={0} ref={(element: any) => {addTableRef(0,element) }} />
            </div>

            {/* {documents.render()} */}

            <div className="flex gap-2 justify-end">
                <div>
                    <Button variant="primary" onClick={onSubmit}>Save and Acknowledge</Button>
                </div>
                <div>
                    <Button variant="primary" onClick={onBack}>Back</Button>
                </div>
            </div>

        </>
    );
}