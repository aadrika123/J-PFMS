import * as Yup from "yup";



const measurementUnitList = ["sqm", "nos", "metre", "litre", "hour", "tonne.km", "kg", "Day", "tonne", "cum"];


const measurementRecordValidationSchemaFrontend = Yup.object({
  description: Yup.string().required(),
  nos: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
      return schema.required()
    else
      return schema.nullable();
  }),

  length: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
      return schema.required("length is required");
    else
      return schema.nullable();
  }),

  breadth: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm")
      return schema.required("breadth is required");
    else
      return schema.nullable();
  }),

  height: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum")
      return schema.required("height is required");
    else
      return schema.nullable();
  }),


  quantity: Yup.number().required().notOneOf([0]),
  unit: Yup.string().oneOf(measurementUnitList),
  rate: Yup.number().required().notOneOf([0]),
  amount: Yup.number().required().notOneOf[0],
  remarks: Yup.string().nullable(),
});


const measurementRecordValidationSchema = Yup.object({
  proposal_id: Yup.number().required(),
  description: Yup.string().required(),
  nos: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
      return schema.required()
    else
      return schema.nullable();
  }),

  length: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
      return schema.required("length is required");
    else
      return schema.nullable();
  }),

  breadth: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm")
      return schema.required("breadth is required");
    else
      return schema.nullable();
  }),

  height: Yup.number().optional().when('unit', (unit, schema) => {
    if (unit[0] === "cum")
      return schema.required("height is required");
    else
      return schema.nullable();
  }),


  quantity: Yup.number().required().notOneOf([0]),
  unit: Yup.string().oneOf(measurementUnitList),
  rate: Yup.number().required().notOneOf([0]),
  amount: Yup.number().required().notOneOf[0],
  remarks: Yup.string().nullable(),
});

const measurementRecordUpdateValidationSchema = Yup.object({
  id: Yup.number().required(),
  proposal_id: Yup.number().required(),
  description: Yup.string().required(),
  nos: Yup.number().required(),
  length: Yup.number().required(),
  breadth: Yup.number().required(),
  height: Yup.number().required(),
  quantity: Yup.number().required().moreThan(0),
  unit: Yup.string().oneOf(measurementUnitList),
  rate: Yup.number().required().moreThan(0),
  amount: Yup.number().required().moreThan(0),
  remarks: Yup.string().nullable(),
});


const MIN_FILE_SIZE = 1024 * 10;
const MAX_FILE_SIZE = 1024 * 1024 * 2;
const MeasurementReferenceDocValidation = Yup.object({
  size: Yup.number().required().min(MIN_FILE_SIZE, "File size below lower limit. (10kb)").max(MAX_FILE_SIZE, "File size above max limit (2MB)"),
  type: Yup.string().required().oneOf([
      "application/pdf",
  ], "This file format is not supported."),
  name: Yup.string().required()
});




export default {
  measurementUnitList,
  measurementRecordValidationSchema,
  measurementRecordValidationSchemaFrontend,
  measurementRecordUpdateValidationSchema,
  MeasurementReferenceDocValidation
};