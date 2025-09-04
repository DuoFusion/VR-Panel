import type { DatePickerProps, TimePickerProps } from "antd";
import { DatePicker, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import { FieldHookConfig, useField } from "formik";
import { FC } from "react";
import { FormFeedback, Label } from "reactstrap";
import { DataAndTimeProps } from "../../types";

dayjs.extend(utc);

const DataAndTime: FC<DataAndTimeProps & FieldHookConfig<Date | null>> = ({ name, label, type, required, validate, disablePast, ...rest }) => {
  const [field, meta, helpers] = useField<Date | null>({ name, validate });

  const handleChange: DatePickerProps<Dayjs>["onChange"] | TimePickerProps["onChange"] = (value) => {
    if (value) {
      helpers.setValue(value.utc().toDate());
    } else {
      helpers.setValue(null);
    }
  };

  const commonProps = {
    value: field.value ? dayjs(field.value) : null,
    onChange: handleChange,
    status: meta.touched && meta.error ? ("error" as const) : undefined,
    ...rest,
  };

  return (
    <div className="input-box">
      {label && (
        <Label>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}
      {type === "time" ? <TimePicker {...commonProps} /> : <DatePicker {...commonProps} disabledDate={disablePast ? (current) => current && current < dayjs().startOf("day") : undefined} />}
      {meta.touched && meta.error ? <FormFeedback style={{ display: "block" }}>{meta.error}</FormFeedback> : null}
    </div>
  );
};

export default DataAndTime;
