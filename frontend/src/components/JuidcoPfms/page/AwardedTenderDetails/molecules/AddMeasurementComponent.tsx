import Button from "@/components/global/atoms/buttons/Button";
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Formik, FormikProps } from "formik";

import { MeasurementRecordValidation } from "pfmslib";
import axios, { baseURL } from "@/lib/axiosConfig";
// import { useWorkingAnimation } from "@/app/v/atoms/useWorkingAnimation";
import { useSORList } from "@/hooks/data/ProjectProposalsHooks";

import toast, { Toaster } from "react-hot-toast";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useQueryClient } from "react-query";

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
            className={
              props.readonly
                ? `flex items-center justify-between rounded border shadow-lg bg-gray-200 border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`
                : `flex items-center justify-between rounded border shadow-lg bg-transparent border-zinc-400 focus-within:outline focus-within:outline-black focus-within:border-none`
            }
          >
            <input
              disabled={props.readonly}
              required={props.required}
              placeholder={props.placeholder}
              onChange={props.onChange}
              type={props.type}
              value={props?.value}
              className={
                "text-primary h-[40px] p-3 bg-transparent outline-none overflow-hidden"
              }
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
            <div
              className={
                props.readonly
                  ? "bg-gray-200 border border-1 border-gray-200"
                  : ""
              }
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
                    <option
                      key={`${item.name}-option-${index}`}
                      value={item.name}
                    >
                      {item.caption}
                    </option>
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

const MeasurementRecord = forwardRef<CanProvideData, MeasurementRecordProps>(
  (props: MeasurementRecordProps, ref) => {
    // const initialValues = {
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
      remarks: "",
    };

    const [currentValues, setCurrentValues] = useState<any>(initialValues);

    const [searchText, setSearchText] = useState<string>("");
    const {
      isFetching: isFetching,
      isLoading: isLoading,
      data: sorQueryResponseData,
    } = useSORList(searchText);
    const [sorListVisible, setSorListVisible] = useState<boolean>(false);

    const [nosFieldEnabled, setNosFieldEnabled] = useState<boolean>(false);
    const [lengthFieldEnabled, setLengthFieldEnabled] =
      useState<boolean>(false);
    const [breadthFieldEnabled, setBreadthFieldEnabled] =
      useState<boolean>(false);
    const [heightFieldEnabled, setHeightFieldEnalbed] =
      useState<boolean>(false);
    const [quantityFieldEnabled, setQuantityFieldEnabled] =
      useState<boolean>(false);

    const [unit, setUnit] = useState<string>("");
    const [length, setLength] = useState<number>(0);
    const [breadth, setBreadth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);

    const [rate, setRate] = useState<number>(0);
    const [nos, setNos] = useState<number>(0);

    const formikRef = useRef<FormikProps<any>>(null);

    useImperativeHandle(ref, () => ({
      async getData() {
        formikRef?.current?.handleSubmit();
        const data: any = await formikRef?.current?.validateForm();
        console.log(formikRef.current?.values);

        if (Object.keys(data).length == 0) {
          const d = {
            ...formikRef.current?.values,
            proposal_id: props.proposal_id,
          };
          console.log("final values: ", d);
          return d;
        } else {
          toast.error(data[Object.keys(data)[0]]);
          return null;
        }
      },
    }));

    const unitOptions = MeasurementRecordValidation.measurementUnitList.map(
      (unit) => {
        return { name: unit, caption: unit };
      }
    );

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

        return {
          ...currentValues,
          nos: "",
          length: "",
          breadth: "",
          height: "",
        };
      }
    };

    useEffect(() => {
      setCurrentValues({
        ...currentValues,
        quantity: quantity,
        amount: quantity * rate,
      });
    }, [quantity]);

    useEffect(() => {
      console.log("unit", unit);
      if (unit == "cum") {
        const newQty = nos * length * breadth * height;
        setCurrentValues({
          ...currentValues,
          nos: nos,
          length: length,
          breadth: breadth,
          height: height,
          quantity: newQty,
          amount: rate * newQty,
        });
      } else if (unit == "sqm") {
        const newQty = nos * length * breadth;
        setCurrentValues({
          ...currentValues,
          nos: nos,
          length: length,
          breadth: breadth,
          quantity: newQty,
          amount: rate * newQty,
        });
      } else if (unit == "metre") {
        const newQty = nos * length;
        setCurrentValues({
          ...currentValues,
          nos: nos,
          length: length,
          quantity: newQty,
          amount: rate * newQty,
        });
      }
    }, [nos, length, breadth, height]);

    const selectItem = (index: number) => {
      console.log("selected item", sorQueryResponseData[index]);
      setSorListVisible(false);
      const modifiedValues = enableDisableFieldsBasedOnUnitValue(
        sorQueryResponseData[index].unit
      );

      setRate(sorQueryResponseData[index].rate);
      setUnit(sorQueryResponseData[index].unit);

      setCurrentValues({
        ...modifiedValues,
        description: sorQueryResponseData[index].description,
        unit: sorQueryResponseData[index].unit,
        rate: sorQueryResponseData[index].rate,
      });
    };

    return (
      <Formik
        innerRef={formikRef}
        initialValues={currentValues}
        enableReinitialize
        validationSchema={
          MeasurementRecordValidation.measurementRecordValidationSchemaFrontend
        }
        onSubmit={() => {}}
      >
        {({ values, handleChange, errors, touched }: any) => (
          <>
            <div className="table-cell text-color-primary">
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

                {sorListVisible && (
                  <ul
                    onMouseLeave={() => setSorListVisible(false)}
                    className="p-2 shadow bg-base-100 w-52 fixed"
                  >
                    <li>
                      <input
                        type="text"
                        placeholder="search"
                        onChange={(event) => setSearchText(event.target.value)}
                        className="my-2 border border-1 w-full text-xl px-2"
                      />
                    </li>

                    {isLoading || isFetching ? (
                      <span>Loading ...</span>
                    ) : (
                      sorQueryResponseData?.map((item: any, index: number) => {
                        return (
                          <li
                            key={index}
                            className="border border-1 p-1 hover:bg-primary_bg_indigo hover:text-white cursor-pointer"
                            onClick={() => selectItem(index)}
                          >
                            {item?.sno} {item?.description}
                          </li>
                        );
                      })
                    )}
                  </ul>
                )}
              </div>
            </div>

            <div className="table-cell text-color-primary">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  // do custom things if required
                  setNos(Number(e.target.value));
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
                  setLength(Number(e.target.value));
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
                  setBreadth(Number(e.target.value));
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
                  setHeight(Number(e.target.value));
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
                  setQuantity(Number(e.target.value));

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
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  // do custom things if required
                  setUnit(e.target.value);

                  // call formik onchange handler
                  handleChange(e);
                }}
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
                  setRate(Number(e.target.value));

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
      </Formik>
    );
  }
);

MeasurementRecord.displayName = "SORRecordRow";

interface SORTableProps {
  tableIndex: number;
  proposal_id: number;
}

const MeasurementTable = forwardRef<CanProvideData, SORTableProps>(
  (props: SORTableProps, ref) => {
    const [rowCountInputValue, setRowCountInputValue] = useState<number>(1);

    const [rows, setRows] = useState<any[]>([
      <MeasurementRecord
        key="row-0"
        ref={(element: any) => {
          addRowRef(0, element);
        }}
        proposal_id={props.proposal_id}
      />,
    ]);

    const [rowRefs, setRowRefs] = useState<any | null>({});
    const addRowRef = (index: number, element: any) => {
      if (element != null) {
        rowRefs[index] = element;
      }
    };

    const addRow = () => {
      const index = rows.length;
      const newRows = [
        ...rows,
        <MeasurementRecord
          key={`row-${index}`}
          ref={(element: any) => {
            addRowRef(index, element);
          }}
          proposal_id={props.proposal_id}
        />,
      ];
      setRows(newRows);
    };

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
    };

    const addNRows = (n: number) => {
      const existingRowCount = rows.length;
      const newRows = [...rows];
      for (
        let index = existingRowCount;
        index < existingRowCount + n;
        index++
      ) {
        newRows.push(
          <MeasurementRecord
            key={`row-${index}`}
            ref={(element: any) => {
              addRowRef(index, element);
            }}
            proposal_id={props.proposal_id}
          />
        );
      }
      setRows(newRows);
    };

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

        return atleastOneFormInvalid ? null : { records: data };
      },
    }));

    return (
      <>
        <div className="mx-2 p-2">
          <div className="overflow-x-auto hide-scrollbar">
            <div className="text-xs table rounded-none border-2">
              <div
                className="table-caption"
                title="Double click to change the title"
              >
                <div className="flex justify-between bg-primary_bg_indigo p-2">
                  <div></div>
                  <div className="flex justify-center text-2xl text-white">
                    Add Measurements/Labours/Materials
                  </div>

                  <div>
                    {/* {!titleEditable && (<Button variant="primary" onClick={() => setTitleEditable(!titleEditable)}>Edit</Button>)} */}
                  </div>
                </div>
              </div>

              <div className="table-row p-6 border text-center">
                <div className="table-cell text-color-secondary p-2">
                  Sr. No
                </div>
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
                      <div className="table-cell text-color-secondary text-center">
                        {index + 1}
                      </div>
                      {row}
                    </form>
                  </>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex justify-left gap-2">
              <div>
                <select
                  className="text-center h-[100%] border-2 rounded"
                  onChange={(event) =>
                    setRowCountInputValue(Number(event.target.value))
                  }
                >
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                </select>
              </div>
              <div>
                <Button
                  variant="primary"
                  onClick={() => addNRows(rowCountInputValue)}
                >
                  {rowCountInputValue == 1
                    ? `Add 1 Row`
                    : `Add ${rowCountInputValue} Rows`}
                </Button>
              </div>
              <div>
                <Button variant="primary" onClick={addRow}>
                  +
                </Button>
              </div>
              <div>
                <Button variant="primary" onClick={removeLastRow}>
                  -
                </Button>
              </div>
            </div>
            <div>
              {/* <Button variant="primary" onClick={() => props.deleteMe(props.tableIndex)}>Remove Table</Button> */}
            </div>
          </div>
        </div>
      </>
    );
  }
);

MeasurementTable.displayName = "SORTable";

interface AddMeasurementComponentProps {
  proposal_id: number;
  onBack: () => void;
  onUpdate: () => void;
}

export const AddMeasurementComponent = ({
  proposal_id,
  onUpdate,
  onBack,
}: AddMeasurementComponentProps) => {
  // document input form
  const queryClient  = useQueryClient()

  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

  // const documents = new Documents(10);

  const [tableRefs] = useState<any | null>({});
  const addTableRef = (index: number, element: any) => {
    if (element != null) {
      tableRefs[index] = element;
    }
  };

  const [documentSelectionFormRef] = useState<any | null>({});
  const setDocumentSelectionFormRef = (element: any) => {
    documentSelectionFormRef[0] = element;
  };

  const recordMeasurements = async (data: any) => {
    activateWorkingAnimation();
    try {
      const res = await axios({
        url: `${baseURL}/project-verification/measurements/create`,
        method: "POST",
        data: {
          data: data,
        },
      })

      onUpdate();

      queryClient.invalidateQueries(["measurements"])
        
    } catch (error) {
      console.log(error);
    } finally{
        hideWorkingAnimation();
    }
  };

  const onSubmit = async () => {
    // collect the table data
    const table = tableRefs[0];
    const data = await table.getData();

    if (data != null) recordMeasurements(data);
  };

  return (
    <>
      {workingAnimation}

      <Toaster />
      <div>
        <MeasurementTable
          tableIndex={0}
          ref={(element: any) => {
            addTableRef(0, element);
          }}
          proposal_id={proposal_id}
        />
      </div>

      {/* {documents.render()} */}

      <div className="flex gap-2 justify-end">
        <div>
          <Button variant="primary" onClick={onSubmit}>
            Save
          </Button>
        </div>
        <div>
          <Button variant="primary" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
};
