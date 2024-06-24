'use client'

import Button from "@/components/global/atoms/buttons/Button";
import Input from "@/components/global/atoms/Input";
import SelectForNoApi from "@/components/global/atoms/SelectForNoApi";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { Formik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { measurementUnitList } from "../StaticList";

type AddMeasurementsProps = {
  onBack: () => void;
  handleAdd: () => void;
};

const AddMeasurements: React.FC<AddMeasurementsProps> = (props) => {
  const { onBack, handleAdd } = props;
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

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

  const readOnly = false;
  return (
    <div>
      {workingAnimation}
      <Toaster />
      <Formik
        // innerRef={formikRef}
        initialValues={{}}
        enableReinitialize
        validationSchema={{}}
        onSubmit={() => {}}
      >
        {({ values, handleChange, handleBlur, errors, touched }: any) => (
          <>
            <div>
              <Input
                label="Description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description}
                touched={touched.description}
                name="description"
                placeholder="Enter description"
                required
                type="text"
                readonly={readOnly}
                labelColor="black font-medium"
              />
              <Input
                label="Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nos}
                error={errors.nos}
                touched={touched.nos}
                name="nos"
                placeholder="Enter number"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />
              <Input
                label="Length"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.length}
                error={errors.length}
                touched={touched.length}
                name="length"
                placeholder="Enter length"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />
              <Input
                label="Breadth"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.breadth}
                error={errors.breadth}
                touched={touched.breadth}
                name="breadth"
                placeholder="Enter breadth"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />

              <Input
                label="Height"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height}
                error={errors.height}
                touched={touched.height}
                name="height"
                placeholder="Enter height"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />

              <Input
                label="Quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
                error={errors.quantity}
                touched={touched.quantity}
                name="quantity"
                placeholder="Enter quantity"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />

              <SelectForNoApi
                data={measurementUnitList}
                onBlur={handleBlur}
                value={values.unit}
                error={errors.unit}
                touched={touched.unit}
                required
                name="unit"
                label="Unit"
                placeholder="Select Unit"
                labelColor="black font-medium"
                readonly={readOnly}
              />
              <Input
                label="Rate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.rate}
                error={errors.rate}
                touched={touched.rate}
                name="rate"
                placeholder="Enter rate"
                required
                type="number"
                readonly={readOnly}
                labelColor="black font-medium"
              />
            </div>
            {/* <div className="table-cell text-color-primary">
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
            </div> */}
          </>
        )}
      </Formik>
      <div className="flex gap-2 justify-end">
        <div>
          <Button variant="primary" onClick={handleAdd}>
            Save
          </Button>
        </div>
        <div>
          <Button variant="primary" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMeasurements;
