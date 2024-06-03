
import React, { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import { MeasurementRecordValidation } from "pfmslib";
import { usePagination } from "@/hooks/Pagination";
import { useMeasurementList, useSORList } from "@/hooks/data/ProjectProposalsHooks";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import PopupEx from "@/components/global/molecules/general/PopupEx";
import Button from "@/components/global/atoms/buttons/Button";
import { AddMeasurementComponent } from "./AddMeasurementComponent";
import { useWorkingAnimation } from "@/app/v/atoms/useWorkingAnimation";
import axios, { baseURL } from '@/lib/axiosConfig';





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
                        className={`flex items-center w-[100px] justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none overflow-hidden`}
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


interface MeasurementRecordProps {
    measurement: any
}


const MeasurementRecord = (props: MeasurementRecordProps) => {
    const [measurement, setMeasurement] = useState<any>(props.measurement);
    const [searchText, setSearchText] = useState<string>("");
    const { isFetching: isFetching, isLoading: isLoading, data: sorQueryResponseData, refetch: refetchSORList } = useSORList(searchText);

    const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();

    const descriptionFieldRef = useRef<HTMLDivElement>(null);

    // const [machingSORs, ]

    useEffect(() => {
    }, [sorQueryResponseData]);


    useEffect(() => {
        setMeasurement(props.measurement);
    }, [props.measurement])

    const [editable, setEditable] = useState<boolean>(false);

    // const initialValues = {
    //   description: "",
    //   unit: "Sqm",
    //   quantity: "0",
    //   rate: "0.0",
    //   cost: 0,
    //   year: "",
    //   remarks: ""
    // };


    const updateMeasurement = async (data: any) => {
        console.log("update measurement data", data);
        activateWorkingAnimation();
        try {
            axios({
                url: `${baseURL}/project-verification/measurements/update`,
                method: "POST",
                data: {
                    data: data,
                },
            }).then((res) => {
                console.log(res);
                hideWorkingAnimation();
            }).catch((error) => {
                hideWorkingAnimation();
                console.log(error);
            });
        } catch (error) {
            hideWorkingAnimation();
            console.log(error);
        }
    };


    const save = (values: any) => {
        // save
        setEditable(false);
        delete values['created_at'];
        delete values['updated_at'];
        updateMeasurement(values);

    }

    const unitOptions = MeasurementRecordValidation.measurementUnitList.map((unit) => {
        return { name: unit, caption: unit };

    });

    const selectItem = (index: number) => {
        console.log("selected item", sorQueryResponseData[index]);
        setMeasurement({
            ...measurement,
            description: sorQueryResponseData[index].description,
            unit: sorQueryResponseData[index].unit,
            rate: sorQueryResponseData[index].rate
        });
        //if(descriptionFieldRef.current) descriptionFieldRef.current.focus();
    }

    return (

        <>
            <Formik
                initialValues={measurement}
                enableReinitialize
                validationSchema={MeasurementRecordValidation.measurementRecordValidationSchema}
                onSubmit={save}
            >
                {({ values, handleChange, errors, touched, handleSubmit}: any) => (
                    <>
                        <div className="table-cell text-color-primary border p-2">

                            {editable ? (

                                <div className="dropdown">

                                    <Input
                                        onChange={handleChange}
                                        value={values.description}
                                        error={errors.description}
                                        touched={touched.description}
                                        name="description"
                                        placeholder="Enter Description"
                                        required
                                        type="text"
                                    />
                                    <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52">
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
                                    </ul>
                                </div>





                            ) :
                                values?.description
                            }
                        </div>
                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.nos}
                                error={errors.nos}
                                touched={touched.nos}
                                name="nos"
                                placeholder="Enter nos"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values?.nos}
                        </div>
                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.length}
                                error={errors.length}
                                touched={touched.length}
                                name="length"
                                placeholder="Enter length"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.length}
                        </div>

                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.breadth}
                                error={errors.breadth}
                                touched={touched.breadth}
                                name="breadth"
                                placeholder="Enter breadth"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.breadth}
                        </div>

                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.height}
                                error={errors.height}
                                touched={touched.height}
                                name="height"
                                placeholder="Enter height"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.height}
                        </div>


                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.quantity}
                                error={errors.quantity}
                                touched={touched.quantity}
                                name="quantity"
                                placeholder="Enter quantity"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.quantity}
                        </div>



                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <DDL
                                onChange={handleChange}
                                value={values.unit}
                                error={errors.unit}
                                touched={touched.unit}
                                name="unit"
                                required
                                readonly={!editable}
                                options={unitOptions}
                            /> : values.unit}


                        </div>


                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.rate}
                                error={errors.rate}
                                touched={touched.rate}
                                name="rate"
                                placeholder="Enter rate"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.rate}
                        </div>

                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.amount}
                                error={errors.amount}
                                touched={touched.amount}
                                name="amount"
                                placeholder="Enter amount"
                                required
                                type="number"
                                readonly={!editable}
                            /> : values.amount}
                        </div>

                        <div className="table-cell text-color-secondary pt-2 border p-2">
                            {editable ? <Input
                                onChange={handleChange}
                                value={values.remarks}
                                error={errors.remarks}
                                touched={touched.remarks}
                                name="remarks"
                                placeholder="Enter Remarks"
                                required
                                type="text"
                                readonly={!editable}
                            /> : values.remarks}
                        </div>

                        {editable && (
                            <div
                                className="mx-2 border p-1 bg-primary_green rounded text-white text-center"
                            >
                                <button onClick={handleSubmit}>Save</button>
                            </div>

                        )}

                    </>


                )}
            </Formik >

            {!editable && (

                <div
                    onClick={() => setEditable(!editable)}
                    className="mx-2 border p-1 bg-primary_green rounded text-white text-center">
                    Edit
                </div>
            )}
        </>

    )
}


interface MeasurementTableProps {
    measurements: any;
}


const MeasurementTable = ({ measurements }: MeasurementTableProps) => {
    return (
        <div className="text-xs table border-2">
            <div className="table-caption" title="Double click to change the title">
                <div className="flex justify-between bg-primary_bg_indigo p-2">
                    <div></div>
                    <div className="flex justify-center text-2xl text-white font-bold">
                        Measurements Table
                    </div>

                    <div>
                        {/* {!titleEditable && (<Button variant="primary" onClick={() => setTitleEditable(!titleEditable)}>Edit</Button>)} */}
                    </div>
                </div>

            </div>



            <div className="table-row p-6 border text-center">
                <div className="table-cell text-color-secondary p-2 border">Sr. No</div>
                <div className="table-cell text-color-primary border">Description</div>
                <div className="table-cell text-color-primary border">No</div>
                <div className="table-cell text-color-primary border">Length</div>
                <div className="table-cell text-color-primary border">Breadth</div>
                <div className="table-cell text-color-primary border">Height</div>
                <div className="table-cell text-color-primary border">Quantity</div>
                <div className="table-cell text-color-primary border">Unit</div>
                <div className="table-cell text-color-primary border">SOR Rate</div>
                <div className="table-cell text-color-primary border">Amount</div>
                <div className="table-cell text-color-primary border">Remarks</div>
                <div className="table-cell text-color-primary border">
                    Edit
                </div>
            </div>

            {measurements?.map((row: any, index: number) => {
                return (
                    <form className="table-row border" key={index}>
                        <div className="table-cell text-color-secondary text-center">{index+1}</div>
                        <MeasurementRecord measurement={row} />
                    </form>

                );
            })
            }
        </div>
    );
}



interface MeasurementManagementComponentProps {
    proposal_id: number;
}

export const MeasurementManagementComponent = (props: MeasurementManagementComponentProps) => {

    const [measurementFormVisible, setMeasurementFormVisible] = useState<boolean>(false);


    const [limit, page, paginator] = usePagination();
    const { isFetching: isFetching, isLoading: isLoading, data: measurementQueryResponseData, refetch: refetchMeasurementList } = useMeasurementList(props.proposal_id, "", limit, page);
    const [measurements, setMeasurements] = useState<[]>();
    const [totalResults, setTotalResults] = useState<number>();


    useEffect(() => {
        console.log(measurementQueryResponseData);
        setMeasurements(measurementQueryResponseData?.records);
        setTotalResults(measurementQueryResponseData?.count);
    }, [measurementQueryResponseData]);

    return (
        <>

            <div className="mx-2 p-2">
                <div className="overflow-x-auto">
                    Total Results: {totalResults}



                    {(isLoading || isFetching) ? (<LoaderSkeleton rowCount={limit} />) : (
                        <>
                            <MeasurementTable measurements={measurements} />
                            {paginator}
                        </>

                    )}

                </div>

                {measurementFormVisible && (
                    <PopupEx>
                        <AddMeasurementComponent onBack={() => setMeasurementFormVisible(false)} proposal_id={props.proposal_id} onUpdate={() => {
                            setMeasurementFormVisible(false);
                            refetchMeasurementList();
                        }} />
                    </PopupEx>

                )}
                <div className="flex justify-end">
                    <Button variant="primary" onClick={() => setMeasurementFormVisible(true)}>Add New Measurement(s)</Button>
                </div>


            </div>





        </>

    )
};
