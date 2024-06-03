import Button from "@/components/global/atoms/buttons/Button";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";

import { MeasurementRecordValidation } from "pfmslib";
import axios, { baseURL } from '@/lib/axiosConfig';
import { useWorkingAnimation } from "@/app/v/atoms/useWorkingAnimation";
import { useSORList } from "@/hooks/data/ProjectProposalsHooks";

import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

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
    onFocus?: () => void;
    onBlur?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
    const fieldId = "id_" + props.name;

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col gap-1 w-[80%]">
                    <div
                        className={props.readonly ? 
                            `flex items-center justify-between rounded border shadow-lg bg-gray-200 border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`: 
                            `flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`}
                    >
                        <input
                            disabled={props.readonly}
                            required={props.required}
                            placeholder={props.placeholder}
                            onChange={props.onChange}
                            type={props.type}
                            value={props?.value}
                            className={"text-primary h-[40px] p-3 bg-transparent outline-none"}
                            name={props.name}
                            id={fieldId}
                            onFocus={props?.onFocus}
                            onBlur={props?.onBlur}
                            autoComplete="off"
                            title={`${props?.value}`}
                        />
                    
                </div>

                <div>
                    {props.touched && props.error && (
                        <div className="text-red-500">{props.error}</div>
                    )}
                </div>

            </div>
        </div >
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
                        <div className={props.readonly ? "bg-gray-200 border border-1 border-gray-200" : ""}>
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

interface MeasurementRecordProps {
    proposal_id: number;
}

const MeasurementRecord = forwardRef<CanProvideData, MeasurementRecordProps>((props: MeasurementRecordProps, ref) => {
    // const initialValues = {
    //     proposal_id: props.proposal_id,
    //     description: "Aluminium Sheets",
    //     nos: 10,
    //     length: 10,
    //     breadth: 10,
    //     height: 2,
    //     quantity: 10,
    //     unit: "cum",
    //     rate: 10,
    //     amount: 300,
    //     remarks: "to be used on doors, windows etc."
    // };



    const initialValues = {
        description: "",
        nos: "",
        length: "",
        breadth: "",
        height: "",
        quantity: "",
        unit: "",
        rate: "",
        amount: "",
        remarks: ""
    };



    const [currentValues, setCurrentValues] = useState<any>(initialValues);

    const [searchText, setSearchText] = useState<string>("");
    const { isFetching: isFetching, isLoading: isLoading, data: sorQueryResponseData, refetch: refetchSORList } = useSORList(searchText);
    const [sorListVisible, setSorListVisible] = useState<boolean>(false);

    const [nosFieldEnabled, setNosFieldEnabled] = useState<boolean>(false);
    const [lengthFieldEnabled, setLengthFieldEnabled] = useState<boolean>(false);
    const [breadthFieldEnabled, setBreadthFieldEnabled] = useState<boolean>(false);
    const [heightFieldEnabled, setHeightFieldEnalbed] = useState<boolean>(false);
    const [quantityFieldEnabled, setQuantityFieldEnabled] = useState<boolean>(false);


    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
        async getData() {
            formikRef?.current?.handleSubmit();
            const data: any = await formikRef?.current?.validateForm();
            if (Object.keys(data).length == 0) {
                const d = formikRef.current?.values;
                return d;
            } else {
                toast.error(data[Object.keys(data)[0]]);
                return null;
            }
        },

    }));


    const unitOptions = MeasurementRecordValidation.measurementUnitList.map((unit) => {
        return { name: unit, caption: unit };
    });


    const enableDisableFieldsBasedOnUnitValue = (unit: string) => {
    
        if (unit === "metre") {
            setNosFieldEnabled(true);
            setLengthFieldEnabled(true);
            setBreadthFieldEnabled(false);
            setHeightFieldEnalbed(false);
            setQuantityFieldEnabled(false);

            return { ...currentValues, breadth: "", height: "" };
            
        } else if (unit === "sqm") {
            
            setNosFieldEnabled(true);
            setLengthFieldEnabled(true);
            setBreadthFieldEnabled(true);
            setHeightFieldEnalbed(false);
            setQuantityFieldEnabled(false);

            return { ...currentValues, height: "" };

        } else if (unit === "cum") {
            setNosFieldEnabled(true);
            setLengthFieldEnabled(true);
            setBreadthFieldEnabled(true);
            setHeightFieldEnalbed(true);
            setQuantityFieldEnabled(false);
        } else {

            
            setNosFieldEnabled(false);
            setQuantityFieldEnabled(true);
            setLengthFieldEnabled(false);
            setBreadthFieldEnabled(false);
            setHeightFieldEnalbed(false);

            return { ...currentValues, nos: "", length: "", breadth: "", height: "" };
        }

    }

    const computeThings = (fieldName: string) => {
        
    }

    const selectItem = (index: number) => {
        console.log("selected item", sorQueryResponseData[index]);
        setSorListVisible(false);
        const modifiedValues = enableDisableFieldsBasedOnUnitValue(sorQueryResponseData[index].unit);

        setCurrentValues({
            ...modifiedValues,
            description: sorQueryResponseData[index].description,
            unit: sorQueryResponseData[index].unit,
            rate: sorQueryResponseData[index].rate
        });
    }


    const measurementUnitList = ["sqm", "nos", "metre", "litre", "hour", "tonne.km", "kg", "Day", "tonne", "cum"];


    const measurementRecordValidationSchema = Yup.object({
        description: Yup.string().required(),
        nos: Yup.number().optional().when('unit', (unit, schema) => {
          if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
            return schema.required()
          else
            return schema;
        }),
      
        length: Yup.number().optional().when('unit', (unit, schema) => {
          console.log("Select unit: ", unit);
          if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
            return schema.required("length is required");
          else
            return schema;
        }),
      
        breadth: Yup.number().optional().when('unit', (unit, schema) => {
          if (unit[0] === "cum" || unit[0] === "sqm")
            return schema.required("breadth is required");
          else
            return schema;
        }),
      
        height: Yup.number().optional().when('unit', (unit, schema) => {
        if (unit[0] === "cum")
          return schema.required("height is required");
        else
          return schema;
      }),
      
      
        quantity: Yup.number().required(),
        unit: Yup.string().oneOf(measurementUnitList),
        rate: Yup.number().required(),
        amount: Yup.number().required(),
        remarks: Yup.string().required(),
      });
            


    return (

        <Formik
            innerRef={formikRef}
            initialValues={currentValues}
            enableReinitialize
            validationSchema={measurementRecordValidationSchema}
            onSubmit={() => { }}

        >
            {({ values, handleChange, errors, touched }: any) => (

                <>


                    <div className="table-cell text-color-primary">

                        <input type="hidden" name="proposal_id" value={props.proposal_id} />

                        <div>
                            <Input
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    // do custom things if required
                                    handleChange(e);
                                }}

                                onFocus={() => setSorListVisible(true)}

                                value={values.description}
                                error={errors.description}
                                touched={touched.description}
                                name="description"
                                placeholder="Enter Description"
                                required
                                type="text"
                                readonly={sorListVisible}


                            />

                            {sorListVisible && (<ul className="p-2 shadow bg-base-100 rounded-box w-52 fixed">
                                <li><input type="text" placeholder="search" onChange={(event) => setSearchText(event.target.value)} /></li>

                                {(isLoading || isFetching) ? (
                                    <span>Loading ...</span>
                                ) : (
                                    sorQueryResponseData?.map((item: any, index: number) => {
                                        return (
                                            <li key={index} className="border border-1" onClick={() => selectItem(index)}>
                                                {item?.sno} {item?.description}
                                            </li>
                                        );
                                    })

                                )}
                            </ul>)}
                        </div>
                    </div>

                    <div className="table-cell text-color-primary">

                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("nos");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.nos}
                            error={errors.nos}
                            touched={touched.nos}
                            name="nos"
                            placeholder="Enter No"
                            required
                            type="number"
                            readonly={!nosFieldEnabled}
                        />
                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("length");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.length}
                            error={errors.length}
                            touched={touched.length}
                            name="length"
                            placeholder="Enter Length"
                            required
                            type="number"
                            readonly={!lengthFieldEnabled}
                        />
                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("breadth");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.breadth}
                            error={errors.breadth}
                            touched={touched.breadth}
                            name="breadth"
                            placeholder="Enter Breadth"
                            required
                            type="number"
                            readonly={!breadthFieldEnabled}
                        />
                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("height");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.height}
                            error={errors.height}
                            touched={touched.height}
                            name="height"
                            placeholder="Enter Height"
                            required
                            type="number"
                            readonly={!heightFieldEnabled}
                        />
                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("quantity");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.quantity}
                            error={errors.quantity}
                            touched={touched.quantity}
                            name="quantity"
                            placeholder="Enter Quantity"
                            required
                            type="number"
                            readonly={!quantityFieldEnabled}
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
                            readonly={true}
                            options={unitOptions}
                        />


                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                // do custom things if required
                                computeThings("rate");
                                
                                // call formik onchange handler
                                handleChange(e);
                            }}

                            value={values.rate}
                            error={errors.rate}
                            touched={touched.rate}
                            name="rate"
                            placeholder="Enter rate"
                            required
                            type="number"
                            readonly={true}
                        />
                    </div>

                    <div className="table-cell text-color-secondary pt-2">
                        <Input
                            onChange={handleChange}
                            value={values.amount}
                            error={errors.amount}
                            touched={touched.amount}
                            name="amount"
                            placeholder="Enter Cost"
                            required
                            type="number"
                            readonly={true}
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
    proposal_id: number,
}

const MeasurementTable = forwardRef<CanProvideData, SORTableProps>((props: SORTableProps, ref) => {
    const [rowCountInputValue, setRowCountInputValue] = useState<number>(1);

    const [rows, setRows] = useState<any[]>([
        <MeasurementRecord key="row-0" ref={(element: any) => { addRowRef(0, element) }} proposal_id={props.proposal_id} />
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
        <MeasurementRecord key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} proposal_id={props.proposal_id} />
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
            alert("At least one row is required!");
        }
    }

    const addNRows = (n: number) => {
        const existingRowCount = rows.length;
        const newRows = [...rows];
        for (let index = existingRowCount; index < existingRowCount + n; index++) {
            newRows.push(
                <MeasurementRecord key={`row-${index}`} ref={(element: any) => { addRowRef(index, element) }} proposal_id={props.proposal_id} />
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
    proposal_id: number,
    onBack: () => void,
    onUpdate: () => void;
}

export const AddMeasurementComponent = ({ proposal_id, onUpdate, onBack }: AddMeasurementComponentProps) => {
    const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();


    // const documents = new Documents(10);

    const [tableRefs, setTableRefs] = useState<any | null>({});
    const addTableRef = ((index: number, element: any) => {
        if (element != null) {
            tableRefs[index] = element;
        }
    })


    const recordMeasurements = async (data: any) => {
        activateWorkingAnimation();
        try {
            axios({
                url: `${baseURL}/project-verification/measurements/create`,
                method: "POST",
                data: {
                    data: data.records,
                },
            }).then((res) => {
                console.log(res);
                hideWorkingAnimation();
                onUpdate();
            }).catch((error) => {
                hideWorkingAnimation();
                console.log(error);
            });
        } catch (error) {
            hideWorkingAnimation();
            console.log(error);
        }
    };


    const onSubmit = async () => {
        const table = tableRefs[0];
        const data = await table.getData();
        console.log(data);
        if( data != null)
            recordMeasurements(data);
    }

    return (
        <>
            {workingAnimation}

            <Toaster />
            <div>
                <MeasurementTable tableIndex={0} ref={(element: any) => { addTableRef(0, element) }} proposal_id={proposal_id} />
            </div>

            {/* {documents.render()} */}

            <div className="flex gap-2 justify-end">
                <div>
                    <Button variant="primary" onClick={onSubmit}>Save</Button>
                </div>
                <div>
                    <Button variant="primary" onClick={onBack}>Back</Button>
                </div>
            </div>

        </>
    );
}