//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 28/05/24
//    Project - PFMS
//    Component  - EstimatedCost
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import ImageModal from "./imageModal";
// import measurmentModal from "./measurmentModal";
import PdfModal from "./PdfModal";
import pdfIcon from "../../../../../assets/svg/pdf-file-2_svgrepo.com.svg";
import Image from "next/image";
import MeasurmentModal from "./measurmentModal";
// import AddMeasurement from "./AddMeasurement";
// import AddMeasurementModal from "./AddMeasurementModal";

// interface RowValues {
//   srNo: string;
//   description: string;
//   no: number;
//   length: number;
//   breadth: number;
//   height: number;
//   quantity: string;
//   unit: number;
//   bidAmount: number;
//   amount: number;
//   remarks: string;
// }

const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object().shape({
      // srNo: Yup.number().required("Sr No Required"),
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
      no: Yup.string()
        .matches(/^\d+$/, "Only digits are allowed")
        .required("Number is required"),
      length: Yup.number().required("Lenght is Required"),
      breadth: Yup.number().required("Breadth is Required"),
      height: Yup.number().required("Height is Required"),
      quantity: Yup.number().required("Quantity is Required"),
      unit: Yup.string()
        .matches(/^\d{4}$/, "Unit should be exactly 4 digits")
        .required("Unit is required"),
      bidAmount: Yup.number().required("Bid Rate is Required"),
      amount: Yup.number().required("Amount is Required"),
      remarks: Yup.string()
        .max(100, "Remarks should be 100 words max")
        .required("Remarks is Required"),
    })
  ),
});

const TableRow: React.FC<{ rowIndex: number }> = ({ rowIndex }) => {
  const handleInput = (e: any) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };
  const handleInput1 = (e: any) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  }; // Replace non-digit characters
  const handleInput2 = (e: any) => {
    e.target.value = e.target.value.replace(/[^-.\d]/g, ""); // Allow positive, negative, decimal, and digits
  };

  const [sessionData, setSessionData] = useState<any>(null);
  console.log(sessionData?.rows[0]?.description);
  useEffect(() => {
    // Function to fetch session data
    setSessionData(JSON.parse(sessionStorage.getItem("key") || "null"));
  }, []);

  return (
    <tr className="w-full">
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].srNo`}
          type="number"
          className="border-0 w-[100%] resize-none text-center mb-2"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].srNo`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].description`}
          type="text"
          value={sessionData?.rows[0]?.description}
          className="border-0 w-[100%] resize-none text-center"
          maxLength="250"
          onInput={handleInput} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].description`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea"
          name={`rows[${rowIndex}].No`}
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput1} // Filter input
        ></Field>
        <ErrorMessage
          name={`rows[${rowIndex}].no`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>

      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].Length`}
          type="number"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].length`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].Breadth`}
          type="number"
          step="0.01"
          // value={sessionData?.rows[0]?.description}
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].breadth`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].Height`}
          type="number"
          step="0.01"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].height`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].Quantity`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].quantity`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="select"
          name={`rows[${rowIndex}].unit`}
          className="border-0 w-[100%] resize-none text-center"
        >
          <optgroup label="Length">
            <option value="mm">Millimeter (mm)</option>
            <option value="cm">Centimeter (cm)</option>
            <option value="m">Meter (m)</option>
            <option value="km">Kilometer (km)</option>
          </optgroup>
          <optgroup label="Mass">
            <option value="mg">Milligram (mg)</option>
            <option value="g">Gram (g)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="t">Metric Ton (t)</option>
          </optgroup>
          <optgroup label="Volume">
            <option value="ml">Milliliter (ml)</option>
            <option value="cl">Centiliter (cl)</option>
            <option value="l">Liter (l)</option>
            <option value="kl">Kiloliter (kl)</option>
          </optgroup>
          <optgroup label="Area">
            <option value="sqm">Square Meter (sqm)</option>
            <option value="sqkm">Square Kilometer (sqkm)</option>
            <option value="ha">Hectare (ha)</option>
          </optgroup>
        </Field>
        <ErrorMessage
          name={`rows[${rowIndex}].unit`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].bidamount`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].bidAmount`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].amount`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput2} // Filter input
          maxLength="100"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].amount`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].remarks`}
          type="text"
          className="border-0 w-[100%] resize-none text-center"
          onInput={handleInput} // Filter input
          maxLength="50"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].remarks`}
          component="div"
          className="text-red-600 text-center"
        />
      </td>
      <td className="flex flex-1 justify-center items-center border border-b-0">
        {/* <EditLogo   onClick={() => handleEdit(rowIndex)} /> */}
        <div className="flex flex-1 justify-center items-center p-4">
          <svg
            onClick={() => {
              window.alert("Clicked");
            }}
            width="35px"
            height="35px"
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Page-1" stroke="none" fill="none">
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-99.000000, -400.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z"
                    id="edit-[#1479]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </td>
    </tr>
  );
};

interface TableProps {
  heading: string;
}

// type ClickHandler = () => JSX.Element;

const PreparedCost: React.FC<TableProps> = ({ heading }) => {
  const [noRows, setNoRows] = useState<string>("1");
  // const [measurment, setMeasurment] = useState<string | null>();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const handleClick: ClickHandler = () => <AddMeasurement />;
  // const handleClick: ClickHandler = () => setMeasurment(true);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
    const minSize = 2 * 1024; // 2 KB in bytes

    if (file.type.includes("pdf")) {
      if (file.size < minSize || file.size > maxSize) {
        alert("PDF file size should be between 2KB and 2MB");
        return;
      }
    }

    if (file.type.includes("image")) {
      if (file.size < minSize || file.size > maxSize) {
        alert("Image file size should be between 2KB and 2MB");
        return;
      }
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [pdfModal, setPdfModal] = useState<boolean>(false);
  const [measModal, setMeasModal] = useState<boolean>(false);

  const imageModalFunc = () => {
    setImageModal(true);
  };
  const pdfModalFunc = () => {
    setPdfModal(true);
  };
  const mesurmentFunc = () => {
    setMeasModal(true);
    // setImageModal(true);
  };

  if (pdfModal) {
    return (
      <>
        <PdfModal
          pdfModal={pdfModal}
          setPdfModal={setPdfModal}
          preview={preview ?? ""}
        />
      </>
    );
  }
  //
  if (measModal) {
    return (
      <>
        <MeasurmentModal measModal={measModal} setMeasModal={setMeasModal} />
      </>
    );
  }
  if (imageModal) {
    return (
      <>
        <ImageModal
          imageModal={imageModal}
          setImageModal={setImageModal}
          preview={preview ?? ""}
        />
      </>
    );
  }
  const initialValues = {
    rows: [
      {
        id: 1,
        srNo: 1,
        description: "",
        no: "",
        length: "",
        breadth: "",
        height: "",
        quantity: "",
        unit: "",
        bidAmount: "",
        amount: "",
        remarks: "",
        edit: "",
      },
    ],
  };

  // Effect to fetch session data when component mounts

  //  const handleSubmit = (values: any) => {
  //    // Save data to session storage when form is submitted
  //    sessionStorage.setItem("your_session_key", JSON.stringify(values));
  //    console.log(values);
  //  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-1 w-full justify-center p-2  ">
            <div className="flex flex-1 flex-col">
              <Accordion defaultExpanded>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    backgroundColor: "#303F9F",
                    color: "white",
                    width: "full",
                    height: "50px",
                  }}
                  className="bg-indigo-700 gap-4 text-white p-2 border-b border-l border-r"
                >
                  <ExpandMoreIcon />
                  {heading}
                </AccordionSummary>
                <AccordionDetails className="rounded-none">
                  <div className="flex  flex-1 m-[-5px] ml-[-15px] mr-[-15px]">
                    <table className="">
                      <thead className="">
                        <tr className="">
                          <th className="border p-4 ">SrNo</th>
                          <th className="border ">Description</th>
                          <th className="border">No</th>
                          <th className="border">Length</th>
                          <th className="border">Breadth</th>
                          <th className="border">Height</th>
                          <th className="border">Quantity</th>
                          <th className="border">Unit</th>
                          <th className="border">Bid Rate</th>
                          <th className="border">Amount</th>
                          <th className="border">Remarks</th>
                          <th className="border">Edit</th>
                        </tr>
                      </thead>
                      <FieldArray name="rows">
                        {({ push, pop }) => (
                          <tbody className="">
                            {values.rows.map((row, index) => (
                              <TableRow key={row.id} rowIndex={index} />
                            ))}
                            <tr>
                              <td colSpan={12} className="border">
                                <div className="flex justify-start items-center p-2 gap-4">
                                  <input
                                    className="h-[50px] w-[52px] p-4 border rounded-md "
                                    onChange={(e) => {
                                      setNoRows(e.target.value);
                                    }}
                                    placeholder="Row.."
                                    value={noRows}
                                  />
                                  <div className="flex flex-1 justify-between items-center gap-2">
                                    <div className="flex flex-row gap-4">
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
                                                description: "ddddd",
                                                no: "",
                                                length: "",
                                                breadth: "",
                                                height: "",
                                                quantity: "",
                                                unit: "",
                                                bidAmount: "",
                                                amount: "",
                                                remarks: "",
                                                edit: "",
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
                                                length: "",
                                                breadth: "",
                                                quantity: "",
                                                unit: "",
                                                bidAmount: "",
                                                amount: "",
                                                remarks: "",
                                                edit: "",
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
                                    <div className="flex flex-row mr-4">
                                      <Button
                                        className="rounded-md  flex   text-white bg-indigo-700  hover:bg-indigo-800 "
                                        onClick={mesurmentFunc}
                                      >
                                        ADD MEASUREMENT
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </FieldArray>
                    </table>
                  </div>

                  <div className="flex mt-4 justify-between items-center">
                    <div className="flex justify-start gap-2">
                      {" "}
                      <div className="flex rounded-md justify-center items-center">
                        <button
                          className="rounded-md text-white bg-indigo-700 hover:bg-indigo-800 p-3"
                          onClick={handleButtonClick}
                        >
                          Upload Reference Docs
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileSelect}
                            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx"
                          />
                        </button>
                      </div>
                      {/* <button onClick={imageModalFunc}>OPEN</button> */}
                      <div className="flex justify-start items-start">
                        {preview && (
                          <div>
                            {preview.includes("pdf") ? (
                              <div>
                                <Image
                                  src={pdfIcon} // Your PDF icon source
                                  alt="PDF Preview"
                                  height={20}
                                  width={60}
                                  className="h-20 w-50 object-cover rounded-md cursor-pointer"
                                  onClick={pdfModalFunc}
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="h-20 w-30 object-cover rounded-md cursor-pointer"
                                  onClick={imageModalFunc}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        className="border rounded-md text-indigo-700 h-[41px] w-[99px]"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        className="rounded-md bg-indigo-700 h-[41px] w-[99px]"
                        type="submit"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PreparedCost;
