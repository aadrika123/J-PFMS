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

const MBRecord: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    person: Yup.string().required("Required"),
    recordDate: Yup.date().required("Required"),
    bookNo: Yup.string().required("Required"),
    fromPage: Yup.string().required("Required"),
    toPage: Yup.string().required("Required"),
    checkedBy: Yup.string().required("Required"),
    checkedDate: Yup.date().required("Required"),
    remarks: Yup.string().max(250, "Max 250 words").required("Required"),
  });

  return (
    <Formik
      initialValues={{
        person: "",
        recordDate: "",
        bookNo: "",
        fromPage: "",
        toPage: "",
        checkedBy: "",
        checkedDate: "",
        remarks: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <div className="m-2 font-semibold">
            <Accordion defaultExpanded>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                sx={{ backgroundColor: "#303F9F", color: "white" }}
                className="bg-indigo-700 gap-4 text-white p-2 border-b border-l border-r w-full h-11"
              >
                <ExpandMoreIcon /> MB Record for Bill No
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex justify-self-start m-5 flex-col">
                  <div className="flex justify-start">
                    <b>Fill Details</b>
                  </div>
                  <div className="flex flex-col ">
                    <div className="flex flex-row items-center m-2 gap-36 rounded-xl">
                      <div className="flex flex-col justify-start">
                        <label htmlFor="person">
                          Person Recording the measurement
                        </label>
                        <Field
                          as="textarea"
                          id="person"
                          name="person"
                          placeholder="Auto Fetch"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        ></Field>
                        <ErrorMessage
                          name="person"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                      <div className="flex flex-col justify-end ml-20 ">
                        <label htmlFor="bookNo">Measurement Book No</label>
                        <Field
                          id="bookNo"
                          name="bookNo"
                          type="text"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="bookNo"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row items-center m-2 gap-36 rounded-xl">
                      <div className="flex flex-col justify-start ">
                        <label htmlFor="toPage">To Page</label>
                        <Field
                          id="toPage"
                          name="toPage"
                          type="text"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="toPage"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                      <div className="flex flex-col justify-end ml-20">
                        <label htmlFor="fromPage">From Page</label>
                        <Field
                          id="fromPage"
                          name="fromPage"
                          type="text"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="fromPage"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                    </div>

                    {/* <div className="flex flex-row items-center m-2 gap-36 rounded-xl">
                      <div className="flex flex-col justify-start ">
                        <label htmlFor="toPage">To Page</label>
                        <Field
                          id="toPage"
                          name="toPage"
                          type="text"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="toPage"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                      <div className="flex flex-col justify-end ml-20">
                        <label htmlFor="checkedBy">Checked By</label>
                        <Field
                          id="checkedBy"
                          name="checkedBy"
                          type="text"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="checkedBy"
                          className="text-red-600"
                          component="div"
                        />
                      </div>
                    </div> */}

                    <div className="flex flex-row items-center m-2 gap-36 rounded-xl">
                      {/* <div className="flex flex-col justify-start">
                        <label htmlFor="checkedDate">Checked Date</label>
                        <Field
                          id="checkedDate"
                          name="checkedDate"
                          type="date"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                        />
                        <ErrorMessage
                          name="checkedDate"
                          className="text-red-600"
                          component="div"
                        />
                      </div> */}
                      <div className="flex flex-col justify-start">
                        <label htmlFor="remarks">Remarks</label>
                        <Field
                          id="remarks"
                          name="remarks"
                          as="textarea"
                          placeholder="XYZ VALUE"
                          style={{
                            border: "2px solid #cccc",
                            height: "54px",
                            width: "634px",
                            padding: "20px",
                            borderRadius: "5px",
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                          ) => {
                            setFieldValue(
                              "remarks",
                              e.target.value.replace(/[^a-zA-Z\s]/g, "")
                            );
                          }}
                        />
                        <ErrorMessage name="remarks" component="div" />
                        <div onClick={handleChange} className="text-red-600">
                          Word count:{" "}
                          {
                            values.remarks
                              .replace(/[^a-zA-Z\s]/g, "") // Remove non-alphabetic characters
                              .split(/\s+/)
                              .filter(Boolean).length // Filter out empty strings
                          }{" "}
                          / 50
                        </div>
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

export default MBRecord;
