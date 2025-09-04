import React from "react";
import { Rate, Space } from "antd";
import { FieldHookConfig, useField } from "formik";
import { Label } from "reactstrap";

interface RateInputProps {
  label?: string;
  name: string;
  required?: boolean;
  allowHalf?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  onChange?: (value: number) => void;
}

const RateInput: React.FC<RateInputProps> = ({ label, name, required, allowHalf = false, disabled = false, className = "", id, onChange }) => {
  const fieldConfig: FieldHookConfig<any> = { name };
  const [field, meta, helpers] = useField(fieldConfig);

  const handleChange = (value: number) => {
    helpers.setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="input-box">
      {label && (
        <Label htmlFor={id || name} className="d-block">
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}
      <div className="rate-input">
        <Rate id={id || name} value={field.value || 0} allowHalf={allowHalf} disabled={disabled} onChange={handleChange} className={meta.error && meta.touched ? `is-invalid ${className}` : className} />
      </div>
      {meta.error && meta.touched && <div className="invalid-feedback d-block">{meta.error}</div>}
    </div>
  );
};

export default RateInput;
