"use cilent"
import React, { useState } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

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
      unit: Yup.string().required("Unit is Required"),
      quantity: Yup.number().required("Quantity is Required"),
      rate: Yup.number().required("Rate is Required"),
      cost: Yup.number().required("Cost is Required"),
      sorYear: Yup.string()
        .matches(/^\d{4}$/, "SOR should be exactly 4 digits")
        .required("SOR is required"),
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
  return (
    <tr className="w-full">
      <td className="border justify-center">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].srNo`}
          type="number"
          className="border-0 w-[100%] resize-none"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].srNo`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].description`}
          type="text"
          className="border-0 w-[100%] resize-none"
          maxLength="250"
          onInput={handleInput} // Filter input
        />
        <ErrorMessage
          name={`rows[${rowIndex}].description`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="select"
          name={`rows[${rowIndex}].unit`}
          className="border-0 w-[100%] resize-none"
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
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].quantity`}
          type="number"
          className="border-0 w-[100%] resize-none"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].quantity`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].rate`}
          type="number"
          step="0.01"
          className="border-0 w-[100%] resize-none"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].rate`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].cost`}
          type="text"
          className="border-0 w-[100%] resize-none"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].cost`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].sorYear`}
          type="text"
          className="border-0 w-[100%] resize-none"
          maxLength="4"
        />
        <ErrorMessage
          name={`rows[${rowIndex}].sorYear`}
          component="div"
          className="text-red-600"
        />
      </td>
      <td className="border">
        <Field
          as="textarea" // Render as textarea
          name={`rows[${rowIndex}].remarks`}
          type="text"
          className="border-0 w-[100%] resize-none"
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

interface TableProps {
  heading: string;
}

const Table: React.FC<TableProps> = ({ heading }) => {
  const initialValues = {
    rows: [
      {
        id: 1,
        srNo: 1,
        description: "",
        unit: "",
        quantity: "",
        rate: "",
        cost: "",
        sorYear: "",
        remarks: "",
      },
    ],
  };

  const [noRows, setNoRows] = useState<string>("");

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
          <div className="flex flex-1 w-full justify-center p-2 font-semibold ">
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
                  <div className="flex flex-1 justify-center">
                    <table className="">
                      <thead className="">
                        <tr className="">
                          <th className="border ">SrNo</th>
                          <th className="border">Description</th>
                          <th className="border">Unit</th>
                          <th className="border">Quantity</th>
                          <th className="border">Rate(Rs)</th>
                          <th className="border">Cost(Rs)</th>
                          <th className="border">SOR Year</th>
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
                              <td colSpan={8} className="border">
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
                                        if (!isNaN(rowCount) && rowCount > 0) {
                                          for (let i = 0; i < rowCount; i++) {
                                            push({
                                              id: Date.now(),
                                              srNo: values.rows.length + 1 + i,
                                              description: "",
                                              unit: "",
                                              quantity: "",
                                              rate: "",
                                              cost: "",
                                              sorYear: "",
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
                                        if (!isNaN(rowCount) && rowCount > 0) {
                                          for (let i = 0; i < rowCount; i++) {
                                            push({
                                              id: Date.now(),
                                              srNo: values.rows.length + 1 + i,
                                              description: "",
                                              unit: "",
                                              quantity: "",
                                              rate: "",
                                              cost: "",
                                              sorYear: "",
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
                                        if (!isNaN(rowCount) && rowCount > 0) {
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
                  <div className="flex mt-4 justify-between items-center">
                    <div className="flex rounded-md bg-indigo-700">
                      <Button className="rounded-md text-white bg-indigo-700  hover:bg-indigo-800 p-3">
                        Upload Reference Docs
                      </Button>
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

export default Table;
