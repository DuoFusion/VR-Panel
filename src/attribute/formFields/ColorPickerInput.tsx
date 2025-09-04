import { ColorPicker } from "antd";
import { FieldHookConfig, useField } from "formik";
import { Label } from "reactstrap";
import { useEffect, useState } from "react";
import { ColorPickerInputProps } from "../../types";

const parseGradientString = (gradient: string) => {
  if (!gradient?.startsWith("linear-gradient")) return gradient;

  const matchColors = [...gradient.matchAll(/rgb\([^)]+\)/g)].map((c) => c[0]);
  const matchPercents = [...gradient.matchAll(/(\d+)%/g)].map((p) => parseInt(p[1], 10));

  if (matchColors.length && matchPercents.length) {
    return matchColors.map((color, i) => ({
      color,
      percent: matchPercents[i] ?? (i === 0 ? 0 : 100),
    }));
  }

  return gradient;
};

const gradientArrayToCss = (colors: { color: string; percent: number }[]) => {
  if (!Array.isArray(colors)) return colors;
  const stops = colors.map((c) => `${c.color} ${c.percent}%`).join(", ");
  return `linear-gradient(90deg, ${stops})`;
};

const ColorPickerInput = ({ label, name, required, ...props }: ColorPickerInputProps) => {
  const fieldConfig: FieldHookConfig<any> = { name };
  const [field, meta, helpers] = useField(fieldConfig);
  const [pickerValue, setPickerValue] = useState<any>("#1677ff");

  // Load value from Formik into picker format
  useEffect(() => {
    if (field.value?.startsWith("linear-gradient")) {
      setPickerValue(parseGradientString(field.value));
    } else if (field.value) {
      setPickerValue(field.value);
    } else {
      setPickerValue("#1677ff");
    }
  }, [field.value]);

  const handleChange = (color: any) => {
    let valueToSave = color;
    if (Array.isArray(color)) {
      // Gradient mode → convert to CSS
      valueToSave = gradientArrayToCss(color);
    } else if (color?.toCssString) {
      // Solid color mode
      valueToSave = color.toCssString();
    }
    helpers.setValue(valueToSave);
    setPickerValue(color);
  };

  return (
    <div className="input-box">
      {label && (
        <Label htmlFor={props.id || name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <ColorPicker
          {...props}
          mode={["single", "gradient"]}
          value={pickerValue}
          onChange={handleChange}
        />
      </div>

      {meta.touched && meta.error && (
        <div className="invalid-feedback d-block">{meta.error}</div>
      )}
    </div>
  );
};

export default ColorPickerInput;
