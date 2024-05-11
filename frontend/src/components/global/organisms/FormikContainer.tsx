"use client";

import React, { memo, useCallback } from "react";
import { Formik } from "formik";
import FormikController from "../molecules/FormikController";
import { FieldTypeProps, FormikErrors, FormikTouched, FormikWrapperProps } from "@/utils/types/formikTypes";
import Button from "../atoms/buttons/Button";
import goBack from "@/utils/helper";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Container
 * | Status- Intermittently Updating
 */

const FormikWrapper: React.FC<FormikWrapperProps> = (props) => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    fields,
    readonly = false,
    onClose,
    enableReinitialize,
  } = props;

  //////////////// Filtering Fields //////////////
  const filterFields = (fields: any) => {
    return fields.map((field: any) => {
      if (field.CHILDRENS) {
        const filteredChildren = filterFields(field.CHILDRENS);
        field.CHILDRENS = filteredChildren.filter((child:FieldTypeProps ) => child.VISIBILITY !== false);
      }
      return field.VISIBILITY !== false ? field : null;
    }).filter(Boolean); // Filter out null values
  };

  const formikController = (
    item: any,
    handleChange: (e: React.ChangeEvent<unknown>) => void,
    handleBlur: (e: React.FocusEvent<unknown>) => void,
    values: any,
    errors: FormikErrors,
    touched: FormikTouched
  ) => {
    return (
      <FormikController
        readonly={readonly || item.READONLY}
        type={item.TYPE}
        control={item.CONTROL || ""}
        label={item.HEADER || ""}
        name={item.ACCESSOR || ""}
        placeholder={item.PLACEHOLDER}
        api={item.API}
        data={item.DATA || []}
        options={item.OPTIONS || []}
        onChange={handleChange}
        onBlur={handleBlur}
        visibility={item.VISIBILITY}
        handler={item.HANDLER}
        value={item.VALUE ? item.VALUE : values[item.ACCESSOR as keyof typeof values]}
        error={errors[item.ACCESSOR as keyof typeof errors]}
        touched={touched[item.ACCESSOR as keyof typeof touched]}
      />
    );
  };

  /////////////////////////// Generating Fields ///////////////////////////////
  const generateFields = useCallback(
    (
      n: any,
      handleChange: (e: React.ChangeEvent<unknown>) => void,
      handleBlur: (e: React.FocusEvent<unknown>) => void,
      values: any,
      errors: FormikErrors,
      touched: FormikTouched
    ) => {
      const d: JSX.Element[] = [];
      let d1: JSX.Element[] = [];

      ///////////////////////// Push the Individual Fields in d[] /////////////////
      function pushD1(item: JSX.Element[]) {
        if (item.length > 0) {
          d.push(
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-4 ">{...d1}</div>
          );
          d1 = [];
        }
      }

      n.forEach((item: FieldTypeProps, index: number) => {
        if (item.TITLE) {
          pushD1(d1); /// Pushing D1[] into D[]
          d.push(
            <div key={index}>
              <h2 className="text-[22px] text-primary mt-8 mb-4">{item.TITLE}</h2>
              {item?.CHILDRENS && item?.CHILDRENS?.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-x-6 gap-4">
                  {item.CHILDRENS.map(
                    (innerItem: FieldTypeProps, index: number) => {
                      return (
                        <div key={index}>
                          {formikController(
                            innerItem,
                            handleChange,
                            handleBlur,
                            values,
                            errors,
                            touched
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        } else if (item.CONTROL === "checkbox" || item.CONTROL === "radio") {
          pushD1(d1); /// Pushing D1[] into D[]
          d.push(
            <div key={index} className="mt-2">
              {formikController(
                item,
                handleChange,
                handleBlur,
                values,
                errors,
                touched
              )}
            </div>
          );
        } else {
          d1.push(
            <div key={index}>
              {formikController(
                item,
                handleChange,
                handleBlur,
                values,
                errors,
                touched
              )}
            </div>
          );
        }
      });
      pushD1(d1); /// Pushing D1[] into D[]
      return d;
    },
    [fields]
  );

  return (
    <section className="border bg-white shadow-xl p-6 px-10">
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={enableReinitialize}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              {generateFields(
                filterFields(fields),
                handleChange,
                handleBlur,
                values,
                errors, 
                touched
              )}
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  onClick={onClose || goBack}
                  variant="cancel"
                  buttontype="button"
                >
                  {onClose ? "Close" : "Back"}
                </Button>

                {!readonly && dirty && (
                  <>
                    <Button
                      variant="cancel"
                      buttontype="button"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                    <Button variant="primary" buttontype="submit" className="animate-pulse">
                      Save
                    </Button>
                  </>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default memo(FormikWrapper);
