import * as Yup from "yup";



const measurementUnitList = ["sqm", "nos", "metre", "litre", "hour", "tonne.km", "kg", "Day", "tonne", "cum"];


const measurementRecordValidationSchema = Yup.object({
  proposal_id: Yup.number().required(),
  description: Yup.string().required(),
  nos: Yup.number().required(),

  length: Yup.number().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm" || unit[0] === "metre")
      return schema.required()
    else
      return schema;
  }),

  breadth: Yup.number().when('unit', (unit, schema) => {
    if (unit[0] === "cum" || unit[0] === "sqm")
      return schema.required()
    else
      return schema;
  }),

  height: Yup.number().when('unit', (unit, schema) => {
  if (unit[0] === "cum")
    return schema.required()
  else
    return schema;
}),


  quantity: Yup.number().required(),
  unit: Yup.string().oneOf(measurementUnitList),
  rate: Yup.number().required(),
  amount: Yup.number().required(),
  remarks: Yup.string().required(),
});


// height: Yup.number().when('unit', (unit, schema) => {
//   console.log("Unit", unit);
//   if (unit[0] === "sqm")
//     return schema.negative();
//   else
//     return schema.negative();
// }),


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
  remarks: Yup.string().required(),
});




export default {
  measurementUnitList,
  measurementRecordValidationSchema,
  measurementRecordUpdateValidationSchema
};