import { Select } from "antd";
import { FieldHookConfig, useField } from "formik";
import { Label } from "reactstrap";
import { SelectInputProps } from "../../types";

const { Option } = Select;

const SelectInput = ({ label, name, required, options, placeholder, ...props }: SelectInputProps) => {
  const fieldConfig: FieldHookConfig<any> = { name };
  const [field, meta, helpers] = useField(fieldConfig);

  const handleChange = (value: any) => {
    helpers.setValue(value === undefined ? null : value);
    if (props.onChange) {
      props.onChange(value === undefined ? null : value);
    }
  };

  const handleBlur = () => {
    helpers.setTouched(true);
    if (props.onBlur) props.onBlur();
  };

  const selectOptions = props.mode === "multiple" ? options : [{ value: "", label: `Select ${label}`, disabled: true }, ...options];

  return (
    <div className="input-box">
      {label && (
        <Label htmlFor={props.id || name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}

      <Select {...props} allowClear className={meta.touched && meta.error ? "is-invalid" : ""} id={props.id || name} value={field.value ?? (props.mode === "multiple" ? [] : undefined)} onChange={handleChange} onBlur={handleBlur} placeholder={placeholder || `Select ${label}`} status={meta.touched && meta.error ? "error" : undefined} style={{ width: "100%" }}>
        {selectOptions.map((opt) => (
          <Option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </Option>
        ))}
      </Select>

      {meta.touched && meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
    </div>
  );
};

export default SelectInput;
