import { FC } from "react";
import { useField } from "formik";
import { Switch } from "antd";
import { Label } from "reactstrap";
import { CustomSwitchProps } from "../../types";

const CustomSwitch: FC<CustomSwitchProps> = ({ name, title }) => {
  const [field, meta, helpers] = useField<boolean>({ name });
  
  return (
    <div className="input-box">
      <div className="d-flex align-items-center">
        {title && (
          <Label className="mb-0 me-2" htmlFor={name}>
            {title}
          </Label>
        )}

        <Switch
          id={name}
          checked={!!field.value}
          onChange={(checked) => {
            helpers.setValue(checked);
            helpers.setTouched(true);
          }}
        />
      </div>
      {meta.touched && meta.error && <div className="invalid-feedback d-block">{meta.error}</div>}
    </div>
  );
};

export default CustomSwitch;
