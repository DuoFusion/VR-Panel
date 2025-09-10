import { useField, useFormikContext } from "formik";
import ReactQuill from "react-quill-new";
import { FormFeedback, Label } from "reactstrap";
import { ToolbarOptions } from "../../data";
import { FC } from "react";

interface QuillInputProps {
  label?: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  modules?: any;
}

const QuillInput: FC<QuillInputProps> = ({ label, name, required, placeholder, modules = { toolbar: ToolbarOptions } }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  return (
    <div className="input-box">
      {label && (
        <Label for={name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}

      <ReactQuill id={name} theme="snow" value={field.value || ""} modules={modules} placeholder={placeholder} onChange={(content) => setFieldValue(name, content)} className={`description-quill ${meta.touched && meta.error ? "is-invalid" : ""}`} />

      {meta.touched && meta.error ? <FormFeedback>{meta.error}</FormFeedback> : null}
    </div>
  );
};

export default QuillInput;
