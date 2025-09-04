import { ColorPickerProps, DatePickerProps, GetProp, TimePickerProps, UploadProps } from "antd";
import type { GlobalConfigProps } from "antd/es/config-provider";
import { UploadListType } from "antd/es/upload/interface";
import { FormikHelpers } from "formik";
import { FormEvent, ReactNode } from "react";
import { Card, CardBody, InputProps } from "reactstrap";
import * as Yup from "yup";
import { Params } from "./Api";
import { Dayjs } from "dayjs";

export type AntdNotificationType = "success" | "error" | "info" | "warning" | "open";

export interface GlobalConfigPropsWithStack extends GlobalConfigProps {
  stack?: {
    threshold?: number;
  };
}

// ************ Form/Input Fields ***********

export interface TextInputProps extends InputProps {
  label?: string;
  name: string;
  children?: ReactNode;
  required?: boolean;
  inputGroupIcon?: any;
}

export interface OtpInputProps {
  val: string[];
  setVal: (val: string[]) => void;
  submitForm?: (values: { otp: string }, formikHelpers: FormikHelpers<{ otp: string }>) => void;
}

export interface SelectInputProps {
  label?: string;
  name: string;
  required?: boolean;
  options: { value: string | number | null; label: string; disabled?: boolean }[];
  placeholder?: string;
  [key: string]: any;
}

export interface ColorPickerInputProps extends Omit<ColorPickerProps, "value" | "onChange"> {
  label?: string;
  name: string;
  required?: boolean;
  [key: string]: any;
}

// ************ Upload ***********

export interface UploadResponse {
  data: string;
  error: Record<string, unknown>;
  message: string;
  status: number;
}

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export interface ImageUploadProps {
  multiple?: boolean;
  name?: string;
  accept?: string;
  isListType?: UploadListType;
  label?: string;
  required?: boolean;
}

// ************ Svg's ***********

export interface SvgProps {
  iconId: string | undefined;
  className?: string;
  style?: {
    height?: number;
    width?: number;
    fill?: string;
    marginRight?: number;
  };
  onClick?: () => void;
}

// ************ Images ***********

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  style?: object;
  height?: number;
  id?: string;
  title?: string;
  width?: number;
}

// ************ Common Api Data Type ***********

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface PageStatus {
  totalData: number;
  state: PageState;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, unknown>;
}

export interface CommonDataType {
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// ************ Breadcrumbs ***********

export interface BreadcrumbsProps {
  mainTitle: string;
  parent: string;
}

// ************ CardHeaderProp ***********

export interface TypeFilterOption {
  label: string;
  value: string;
}

export interface CardHeaderProps {
  title?: string;
  headClassName?: string;
  onSearch?: (key: string) => void;
  searchClassName?: string;
  buttonLabel?: string;
  isEditing?: boolean;
  onButtonClick?: () => void;
  onTypeFilterChange?: (id: string) => void;
  onActiveFilterChange?: (checked: boolean) => void;
  setIsEditing?: (val: boolean) => void;
  isActive?: boolean;
  typeFilterOptions?: TypeFilterOption[];
  cardProps?: React.ComponentProps<typeof Card>;
  bodyProps?: React.ComponentProps<typeof CardBody>;
  children?: React.ReactNode;
  typeFilterPlaceholder?: string;
}

// ************ Basic Table Filter Helper Options ***********

export interface UseBasicTableFilterHelperOptions {
  initialParams?: Params;
  debounceDelay?: number;
  sortKey?: string;
}

// ************ Validation Yup schema ***********

export type FieldTypeMap = {
  string: Yup.StringSchema<string | null | undefined>;
  number: Yup.NumberSchema<number | null | undefined>;
  boolean: Yup.BooleanSchema<boolean | null | undefined>;
  array: Yup.ArraySchema<any[], Yup.AnyObject>;
};

export interface FieldOptions<T> {
  required?: boolean;
  extraRules?: (schema: T) => T;
  minItems?: number;
}

// ************ Data and Time ***********

export type PickerType = "time" | "date";
export type AntdPickerProps = Partial<DatePickerProps<Dayjs>> & Partial<TimePickerProps>;

export interface DataAndTimeProps extends AntdPickerProps {
  name: string;
  label?: string;
  type: PickerType;
  required?: boolean;
  disablePast?: boolean;
}

// ************ Switch ***********

export interface CustomSwitchProps {
  name: string;
  title?: string;
}

// ************ Information ***********

export interface InformationProp {
  headerTitle?: string;
  editorContent: string;
  setEditorContent: (content: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  loading: boolean;
}
