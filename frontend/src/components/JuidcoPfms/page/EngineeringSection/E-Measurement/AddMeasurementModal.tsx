//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 27/05/23
//    Revision - 1
//    Project - JUIDCO
//    Component  - AddMeasurementModal
//    DESCRIPTION - AddMeasurementModal
//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";

interface AddMeasurementModalProps {
  measurementModal: boolean;
  // setMeasurementModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMeasurementModal?: (value: boolean) => void;
}
// interface TableRowProps {
//   rowIndex: number;
// }
// Assuming you have a function to fetch data based on the search query
// const fetchData = async (searchQuery: string) => {
//   // Fetch data based on the search query
//   // For example:
//   const response = await fetch(
//     `http://localhost:2001/api/pfms/v1/prepared-estimated/get?search=${searchQuery}`
//   );
//   const data = await response.json();
//   return data;
// };
const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object().shape({
      srNo: Yup.number().required("Sr No Required"),
      description: Yup.string()
        .max(250, "Description should be 250 words max")
        .test(
          "word-count",
          "Description should not exceed 250 words",
          function (value) {
            const wordCount = value ? value.trim().split(/\s+/).length : 0;
            return wordCount <= 250;
          }
        )
        .required("Description is Required"),
      no: Yup.number().required("No of works is required"),
      lenght: Yup.number().required("Lenght is Required"),
      breadth: Yup.number().required("Breadth is Required"),
      height: Yup.number().required("Height is Required"),
      unit: Yup.string().required("Unit is Required"),
      bidRate: Yup.number().required("Bid Rate is required"),
      remarks: Yup.string()
        .max(100, "Remarks should be 100 words max")
        .required("Remarks is Required"),
    })
  ),
});

const TableRow: React.FC<{ rowIndex: number }> = ({ rowIndex }) => {
  // const handleInput = (e: any) => {
  //   e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  // };
  // ........................
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [bidrate, setBidRate] = useState<string>("");
  const [isTyping, setisTyping] = useState<boolean>(false);
  const [selectoption, setSelectoption] = useState<string>("");
  console.log(searchQuery, "search");
  const fetchData = async () => {
    // Fetch data based on the search query
    // For example:
    const response = await fetch(
      `http://localhost:2001/api/pfms/v1/prepared-estimated/get?search=${searchQuery}`
    );
    const data = await response.json();
    // setSelectoption(data)
    return data;
  };

  const fetchData1 = async () => {
    // Fetch data based on the search query
    // For example:
    const response = await fetch(
      `http://localhost:2001/api/pfms/v1/prepared-estimated/get`
    );
    const data = await response.json();
    setSelectoption(data);
    return data;
  };
  useEffect(() => {
    fetchData1();
  }, []);

  console.log("selectoption", selectoption);

  const handleSearchChange = async (e: any) => {
    setisTyping(true);
    setSearchQuery(e.target.value);
    // Fetch data based on the search query
    const searchData = await fetchData();

    console.log(searchData, "search");
    // Update unit and bid rate based on the search results
    setUnit(searchData.unit);
    setBidRate(searchData.bidrate);
  };
  console.log(searchQuery, unit, bidrate);
  // .............................//
  console.log("Selection option >>> ", selectoption);

  return (
    <tr className="w-full">
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].srNo`}
          type="number"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].srNo`}
          component="div"
          className="text-red-600"
        />
      </td>
     <td className="border justify-center">
  <div className="dropdown">
    <Field
      as="select"
      type="select"
      name={`rows[${rowIndex}].description`}
      placeholder="Select an option"
      className="border-0 w-[100%] resize-none mt-2 text-center"
      maxLength="250"
      value={searchQuery}
      onChange={handleSearchChange}
    >
      <option value="">Select an option</option>
      {selectoption?.data?.map((item: any) => (
        <option key={item.description} value={item.description}>
          {item.description}
        </option>
      ))}
    </Field>
  </div>
</td>

          {/* <ul
            tabIndex={0}
            className="border-0 w-[100%] resize-none text-center"
          >
            {Array.isArray(searchQuery) && (
              <select className="border border-1">
                {searchQuery.map((item: any, index: number) => (
                  <option key={index} onClick={() => handleSearchChange(index)}>
                    <tr>{item?.sno} {item?.description}</tr>
                  </option>
                ))}
              </select>
            )}
          </ul> */}
          {/* {isTyping &&
            selectoption?.data?.map((item: any) => (
            <>
                <li onClick={() => {
                  setisTyping(false);
           }}>{item.description}</li> 
            </>
            ))} */}
          {/* <li key={item.id} onClick={() => handleSelectOption(item)}>
                {item.description}
              </li> */}
        {/* </div> */}
        {/* <ErrorMessage
          name={`rows[${rowIndex}].description`}
          component="div"
          className="text-red-600"
        /> */}
      {/* </td> */}

      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].no`}
          type="number"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].no`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].lenght`}
          type="number"
          step="0.01"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].lenght`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].breadth`}
          type="number"
          step="0.01"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].breadth`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].height`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].height`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea"
          name={`rows[${rowIndex}].unit`}
          className="border-0 w-[100%] resize-none text-center"
        ></Field>
        <ErrorMessage
          name={`rows[${rowIndex}].unit`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].bidRate`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].bidRate`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].remarks`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
          maxLength="100"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].remarks`}
          component="div"
          className="text-red-600"
        />
      </td>
    </tr>
  );
};

const AddMeasurementModal: React.FC<AddMeasurementModalProps> = (props) => {
  const initialValues = {
    rows: [
      {
        id: 1,
        srNo: 1,
        description: "",
        no: "",
        lenght: "",
        breadth: "",
        height: "",
        unit: "",
        bidRate: "",
        remarks: "",
      },
    ],
  };

  const handleCancelClick = () => {
    if (props.setMeasurementModal) {
      props.setMeasurementModal(false);
      console.log("abbs");
    }
  };
  const [noRows, setNoRows] = useState<string>("");
  // sessionStorage.setItem("key", JSON.stringify(values));

  // console.log("values", values);

  const handleSubmit = (values: any) => {
    console.log("values", values);
    sessionStorage.setItem("key", JSON.stringify(values));
    window.location.reload();
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity ${
          props.measurementModal
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        } z-[1000]`}
      >
        <div
          className={`bg-white  px-10 pb-48 pt-8 rounded-lg m shadow-lg relative transform transition-transform ${
            props.measurementModal ? "scale-100 modal-pop" : "scale-95"
          }`}
        >
          <button
            className="absolute top-1 right-2 text-gray-500 hover:text-blue-700"
            onClick={handleCancelClick}
          >
            <p className="text-3xl pr-3">&times;</p>
          </button>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col items-center  p-4 font-semibold">
                  <div className="flex justify-center w-full text-white bg-indigo-700">
                    {" "}
                    <h2 className="text-2xl m-4 items-center flex">
                      Add Measurement
                    </h2>
                  </div>
                  <div className="flex flex-1 flex-col w-full  text-center">
                    <div className="flex flex-1 justify-center text-center">
                      <table className="w-[90rem] text-center">
                        <thead>
                          <tr>
                            <th className="border">SrNo</th>
                            <th className="border">Description</th>
                            <th className="border">No of Works</th>
                            <th className="border">Lenght</th>
                            <th className="border">Breadth</th>
                            <th className="border">Height</th>
                            <th className="border">Unit</th>
                            <th className="border">Bid Rate</th>
                            <th className="border">Remarks/InputRef</th>
                          </tr>
                        </thead>
                        <FieldArray name="rows">
                          {({ push, pop }) => (
                            <tbody className="">
                              {values.rows.map((row, index) => (
                                <TableRow key={row.id} rowIndex={index} />
                              ))}
                              <tr>
                                <td colSpan={9} className="border">
                                  <div className="flex justify-start items-center p-2 gap-4">
                                    <input
                                      className="h-[50px] w-[52px] border rounded-md "
                                      onChange={(e) => {
                                        setNoRows(e.target.value);
                                      }}
                                      placeholder="Row.."
                                      value={noRows}
                                    />
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() => {
                                          const rowCount = parseInt(noRows);
                                          if (
                                            !isNaN(rowCount) &&
                                            rowCount > 0
                                          ) {
                                            for (let i = 0; i < rowCount; i++) {
                                              push({
                                                id: Date.now(),
                                                srNo:
                                                  values.rows.length + 1 + i,
                                                description: "",
                                                no: "",
                                                lenght: "",
                                                breadth: "",
                                                height: "",
                                                unit: "",
                                                bidRate: "",
                                                remarks: "",
                                              });
                                            }
                                          }
                                        }}
                                        className="flex justify-center text-center rounded-md text-white bg-indigo-700  hover:bg-indigo-800 h-[41] w-[180px]"
                                      >
                                        Manage Rows
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          const rowCount = parseInt(noRows);
                                          if (
                                            !isNaN(rowCount) &&
                                            rowCount > 0
                                          ) {
                                            for (let i = 0; i < rowCount; i++) {
                                              push({
                                                id: Date.now(),
                                                srNo:
                                                  values.rows.length + 1 + i,
                                                description: "",
                                                no: "",
                                                lenght: "",
                                                breadth: "",
                                                height: "",
                                                unit: "",
                                                bidRate: "",
                                                remarks: "",
                                              });
                                            }
                                          }
                                        }}
                                        className="flex justify-center text-center rounded-md text-white bg-indigo-700  hover:bg-indigo-800"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="42"
                                          height="41"
                                          viewBox="0 0 42 41"
                                          fill="none"
                                        >
                                          <rect
                                            width="42"
                                            height="41"
                                            rx="4.52059"
                                            fill="#4338CA"
                                          />
                                          <path
                                            d="M20 28.3459V13"
                                            stroke="white"
                                            strokeWidth="1.79855"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M12 20.6729H28"
                                            stroke="white"
                                            strokeWidth="1.79855"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          const rowCount = parseInt(noRows);
                                          if (
                                            !isNaN(rowCount) &&
                                            rowCount > 0
                                          ) {
                                            for (let i = 0; i < rowCount; i++) {
                                              pop();
                                            }
                                          }
                                        }}
                                        className="flex justify-center text-center rounded-md text-white bg-indigo-700 hover:bg-indigo-800 "
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="42"
                                          height="41"
                                          viewBox="0 0 42 41"
                                          fill="none"
                                        >
                                          <rect
                                            width="42"
                                            height="41"
                                            rx="4.52059"
                                            fill="#4338CA"
                                          />
                                          <path
                                            d="M13 20H29"
                                            stroke="white"
                                            strokeWidth="2.12046"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </Button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          )}
                        </FieldArray>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mr-2"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AddMeasurementModal;
