//////////////////////////////////////////////////////////////////////////////////////
//    Author - Rahul Kumar
//    Version - 1.0
//    Date - 28/05/24
//    Project - PFMS
//    status -close
//    Component  - MBRecord Bill
//    DESCRIPTION -
//////////////////////////////////////////////////////////////////////////////////////
"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PdfModal from "./PdfModal";
import ImageModal from "./imageModal";
import Image from "next/image";
import pdfIcon from "../../../../../assets/svg/pdf-file-2_svgrepo.com.svg";
import MeasurmentModal from "./measurmentModal";

const RunningBill_Form: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
const [measModal, setMeasModal] = useState<boolean>(false);
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
  // Set initial state values
  const [extraItem, setExtraItem] = useState<string>("yes");
  const [remark, setRemark] = useState<string>("yes");

   const mesurmentFunc = () => {
     setMeasModal(true);
     // setImageModal(true);
   };
  const imageModalFunc = () => {
    setImageModal(true);
  };
  const pdfModalFunc = () => {
    setPdfModal(true);
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

  const validationSchema = Yup.object().shape({
    runningbill: Yup.string().required("Required"),
    // recordDate: Yup.date().required("Required"),
    bookNo: Yup.string().required("Required"),
    fromPage: Yup.string().required("Required"),
    toPage: Yup.string().required("Required"),
    // checkedBy: Yup.string().required("Required"),
    // checkedDate: Yup.date().required("Required"),
    remarkInput: Yup.string().max(250, "Max 250 words").required("Required"),
  });

  return (
    <Formik
      initialValues={{
        extraItem: "",
        remark: "",
        remarkInput: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <div className="m-2 ">
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ backgroundColor: "#303F9F", color: "white" }}
                className="bg-indigo-700 gap-4 text-white p-2 border-b border-l border-r w-full h-11"
              >
                <ExpandMoreIcon /> Running Bill
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-self-start m-5 flex-col">
                  <div className="flex justify-start">
                    <b>Fill Details</b>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex flex-row items-center m-2 gap-36 rounded-xl">
                      <div className="flex flex-col justify-start">
                        <label htmlFor="runningbill">Running Bill Number</label>
                        <Field
                          as="textarea"
                          id="runningbill"
                          name="runningbill"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        ></Field>
                        <ErrorMessage
                          name="runningbill"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                      <div className="flex flex-col w-1/2  mt-4 ml-10">
                        <label htmlFor="weatherFinalBill">
                          Wether Final Bill
                        </label>
                        <div>
                          <label htmlFor="weatherYes" className="mr-4">
                            <Field
                              id="weatherYes"
                              name="weatherFinalBill"
                              type="radio"
                              value="yes"
                              className="mr-1"
                              checked={true}
                            />
                            Yes
                          </label>
                          <label htmlFor="weatherNo">
                            <Field
                              id="weatherNo"
                              name="weatherFinalBill"
                              type="radio"
                              value="no"
                              className="mr-1"
                            />
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name="weatherFinalBill"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row flex-1 justify-between m-2 gap-36 rounded-xl">
                      <div className="flex flex-1 flex-col ">
                        <label htmlFor="extraItem">Extra Item</label>
                        <div>
                          <label htmlFor="extraYes" className="mr-4">
                            <Field
                              id="extraYes"
                              name="extraItem"
                              type="radio"
                              value="yes"
                              className="mr-1"
                              checked={extraItem === "yes"} // Check if extraItem state is "yes"
                              onChange={() => setExtraItem("yes")} // Update state on change
                            />
                            Yes
                          </label>
                          <label htmlFor="extraNo">
                            <Field
                              id="extraNo"
                              name="extraItem"
                              type="radio"
                              value="no"
                              className="mr-1"
                              checked={extraItem === "no"} // Check if extraItem state is "no"
                              onChange={() => setExtraItem("no")} // Update state on change
                            />
                            No
                          </label>
                        </div>
                        {extraItem === "yes" && (
                          <button
                            className="bg-indigo-700 text-white  mt-4 w-48 h-12 text-center rounded-md "
                            onClick={mesurmentFunc}
                          >
                            Add Extra Item
                          </button>
                        )}
                      </div>
                      <div className="flex flex-1 justify-start items-start flex-col ">
                        <label htmlFor="remark">Remark</label>
                        <div>
                          <label htmlFor="remarkYes" className="mr-4">
                            <Field
                              id="remarkYes"
                              name="remark"
                              type="radio"
                              value="yes"
                              className="mr-1"
                              checked={remark === "yes"} // Check if remark state is "yes"
                              onChange={() => setRemark("yes")} // Update state on change
                            />
                            Yes
                          </label>
                          <label htmlFor="remarkNo">
                            <Field
                              id="remarkNo"
                              name="remark"
                              type="radio"
                              value="no"
                              className="mr-1"
                              checked={remark === "no"} // Check if remark state is "no"
                              onChange={() => setRemark("no")} // Update state on change
                            />
                            No
                          </label>
                        </div>
                        {remark === "yes" && (
                          <Field
                            id="remarkInput"
                            name="remarkInput"
                            type="text"
                            placeholder="Enter Remark"
                            style={{
                              border: "2px solid #cccc",
                              height: "54px",
                              width: "634px",
                              padding: "20px",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                      </div>
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
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RunningBill_Form;
