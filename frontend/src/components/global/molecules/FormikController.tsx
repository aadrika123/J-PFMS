import React from "react";
import TextArea from "@/components/global/atoms/Textarea";
import RadioButtons from "@/components/global/atoms/RadioButton";
import CheckBoxes from "@/components/global/atoms/Checkbox";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import SelectForNoApi from "../atoms/SelectForNoApi";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Formik Controller
 * | Status- done
 */

interface Options {
  key: string;
  value: string;
}

interface FormikControllerProps {
  control: string;
  label: string;
  name: string;
  options: Options[];
  placeholder?: string | "";
  api?: string;
  data: [];
  type?: string;
  value?: number | string;
  error?: string | undefined;
  touched?: boolean | undefined;
  readonly?: boolean;
  visibility?: boolean;
  handler?: (id: number | string) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const FormikController: React.FC<FormikControllerProps> = (props) => {
  const { control, visibility = true, ...rest } = props;
  if (visibility) {
    switch (control) {
      case "input":
        return <Input {...rest} />;
      case "textarea":
        return <TextArea {...rest} />;
      case "radio":
        return <RadioButtons {...rest} />;
      case "checkbox":
        return <CheckBoxes {...rest} />;
      case "select":
        return <Select {...rest} />;
      case "selectForNoApi":
        return <SelectForNoApi {...rest} />;
      default:
        return null;
    }
  } else {
    return null;
  }
};

export default FormikController;
