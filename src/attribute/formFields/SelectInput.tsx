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

  const selectOptions = [{ value: "", label: `Select ${label}`, disabled: true }, ...options];

  return (
    <div className="input-box">
      {label && (
        <Label htmlFor={props.id || name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}

      <Select {...props} allowClear className={meta.error ? "is-invalid" : ""} id={props.id || name} value={field.value === null ? undefined : field.value} onChange={handleChange} placeholder={placeholder || "Select an option"} status={meta.touched && meta.error ? "error" : ""} style={{ width: "100%" }}>
        {selectOptions.map((opt) => (
          <Option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </Option>
        ))}
      </Select>

      {meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
    </div>
  );
};

export default SelectInput;
