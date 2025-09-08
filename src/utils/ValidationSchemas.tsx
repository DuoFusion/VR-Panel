import * as Yup from "yup";
import { FieldOptions, FieldTypeMap } from "../types";

// ---------- Generic field schema factory ----------

type FieldSchemaArgs<K extends keyof FieldTypeMap> = [type: K, options?: FieldOptions<FieldTypeMap[K]>] | [type: K, label: string, options?: FieldOptions<FieldTypeMap[K]>];

export function fieldSchema<K extends keyof FieldTypeMap>(...args: FieldSchemaArgs<K>): FieldTypeMap[K] {
  let type: K;
  let label: string;
  let options: FieldOptions<FieldTypeMap[K]> | undefined;

  if (typeof args[1] === "string") {
    [type, label, options] = args as [K, string, FieldOptions<FieldTypeMap[K]>?];
  } else {
    [type, options] = args as [K, FieldOptions<FieldTypeMap[K]>?];
    label = "Field";
  }

  const { required = true, extraRules, minItems } = options || {};
  let schema: FieldTypeMap[K];

  switch (type) {
    case "string":
      schema = Yup.string() as FieldTypeMap[K];
      schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "boolean":
      schema = Yup.boolean() as FieldTypeMap[K];
      schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "number":
      schema = Yup.number().typeError(`${label} must be a number`) as FieldTypeMap[K];
      schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.nullable().notRequired() as FieldTypeMap[K]);
      break;

    case "array":
      schema = Yup.array() as FieldTypeMap[K];
      if (minItems && minItems > 0) {
        schema = (schema as Yup.ArraySchema<any[], Yup.AnyObject>).min(minItems, `${label} is required`) as FieldTypeMap[K];
      }
      schema = required ? (schema.required(`${label} is required`) as FieldTypeMap[K]) : (schema.notRequired() as FieldTypeMap[K]);
      break;

    default:
      throw new Error(`Unsupported field type: ${type}`);
  }

  return extraRules ? extraRules(schema) : schema;
}

// ---------- Reusable helpers ----------

const imageSchema = (label: string, required = true) => fieldSchema("array", label, required ? { minItems: 1 } : { required: false });

// ---------- Schemas ----------

// Login
export const LoginSchema = Yup.object({
  email: fieldSchema("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: fieldSchema("string", "Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character") }),
});

// Change Password
export const ChangePasswordSchema = Yup.object({
  password: fieldSchema("string", "New Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "New Password must include at least one special character") }),
  confirmPassword: fieldSchema("string", "Confirm Password", { extraRules: (s) => s.oneOf([Yup.ref("password")], "Passwords must match") }),
});

// Workshop
export const WorkshopSchema = Yup.object({
  title: fieldSchema("string", "Title"),
  // shortDescription: fieldSchema("string", "Short Description"),
  // date: fieldSchema("string", "Date"),
  // time: fieldSchema("string", "Time"),
  duration: fieldSchema("string", "Duration"),
  instructorImage: imageSchema("Instructor Image", false),
  instructorName: fieldSchema("string", "Instructor Name"),
  languageId: fieldSchema("array", "language", { minItems: 1 }),
  // thumbnailImage: imageSchema("Thumbnail Image"),
  // workshopImage: imageSchema("Workshop Image"),
  price: fieldSchema("number", { extraRules: (s) => s.min(0, "Price must be greater than or equal to 0") }),
  // mrp: fieldSchema("number", { required: false, extraRules: (s) => s.min(0, "MRP must be greater than or equal to 0") }),
  priority: fieldSchema("number", "Priority"),
  // fullDescription: fieldSchema("string", { required: false }),
  features: fieldSchema("boolean", { required: false }),
});

export const WorkshopRegisterSchema = Yup.object({
  workshopId: fieldSchema("string", "Workshop"),
  name: fieldSchema("string", "name"),
  gender: fieldSchema("string", "gender"),
  standard: fieldSchema("string", "standard"),
  schoolName: fieldSchema("string", "school Name"),
  city: fieldSchema("string", "city"),
  whatsAppNumber: fieldSchema("string", "phone Number"),
  email: fieldSchema("string", "email", { extraRules: (s) => s.email("Invalid email address") }),
  previousPercentage: fieldSchema("number", "previous Percentage"),
  targetPercentage: fieldSchema("number", "target Percentage"),
  goal: fieldSchema("string", "goal"),
  fees: fieldSchema("number", "fees"),
  paymentStatus: fieldSchema("string", "payment Status"),
  transactionId: fieldSchema("string", "transactionId"),
});

// Courses
export const CoursesSchema = Yup.object({
  title: fieldSchema("string", "Title"),
  subtitle: fieldSchema("string", "Sub Title"),
  // background: fieldSchema("string", "Background"),
  duration: fieldSchema("string", "Duration"),
  price: fieldSchema("number", "Price", { extraRules: (s) => s.min(0, "Price must be greater than or equal to 0") }),
  totalLectures: fieldSchema("number", "Total Lectures"),
  totalHours: fieldSchema("string", "Total Hours"),
  priority: fieldSchema("number", "Priority"),
  languageId: fieldSchema("array", "language", { minItems: 1 }),
  whatWillYouLearn: fieldSchema("string", { required: false }),
  instructorName: fieldSchema("string", { required: false }),
  mrp: fieldSchema("number", { required: false, extraRules: (s) => s.min(0, "MRP must be greater than or equal to 0") }),
  // shortDescription: fieldSchema("string", "Short Description"),
  instructorImage: imageSchema("Instructor Image", false),
  // courseImage: imageSchema("Course Image"),
  // listOfLecture: Yup.array().of(lectureSchema).min(1, "At least one Lecture is required"),
  features: fieldSchema("boolean", { required: false }),
});

// Courses Register
export const CoursesRegisterSchema = Yup.object({
  name: fieldSchema("string", "name"),
  gender: fieldSchema("string", "gender"),
  standard: fieldSchema("string", "standard"),
  schoolName: fieldSchema("string", "school Name"),
  city: fieldSchema("string", "city"),
  whatsAppNumber: fieldSchema("string", "phone Number"),
  email: fieldSchema("string", "email", { extraRules: (s) => s.email("Invalid email address") }),
  previousPercentage: fieldSchema("number", "previous Percentage"),
  targetPercentage: fieldSchema("number", "target Percentage"),
  goal: fieldSchema("string", "goal"),
  fees: fieldSchema("number", "fees"),
  paymentStatus: fieldSchema("string", "payment Status"),
  transactionId: fieldSchema("string", "transactionId"),
  courseId: fieldSchema("string", "courseId"),
});

// Banner
export const BannerSchema = Yup.object({
  title: fieldSchema("string", "title"),
  type: fieldSchema("string", "type"),
  subTitle: fieldSchema("string", { required: false }),
  cta: fieldSchema("string", { required: false }),
  priority: fieldSchema("number", "Priority"),
  image: imageSchema("Banner Image"),
});

// Achievements
export const AchievementsSchema = Yup.object({
  title: fieldSchema("string", "title"),
  priority: fieldSchema("number", "Priority"),
  image: imageSchema("Banner Image"),
});

// Testomonials
export const TestomonialsSchema = Yup.object({
  name: fieldSchema("string", "name"),
  role: fieldSchema("string", { required: false }),
  message: fieldSchema("string", "message"),
  rating: fieldSchema("number", { required: false }),
  priority: fieldSchema("number", "Priority"),
  image: imageSchema("Testimonial Image", false),
});

// FAQ
export const FaqSchema = Yup.object({
  question: fieldSchema("string", { required: false }),
  answer: fieldSchema("string", { required: false }),
});

// Web Setting
export const WebSettingSchema = Yup.object({
  name: fieldSchema("string", "name"),
  email: fieldSchema("string", "email"),
  phoneNumber: fieldSchema("number", "phoneNumber"),
  razorpayKeyId: fieldSchema("string", "razorpayKeyId"),
  razorpayKeySecret: fieldSchema("string", "razorpayKeySecret"),
  ourStudent: fieldSchema("string", "ourStudent"),
  rating: fieldSchema("string", "rating"),
  instagram: fieldSchema("string", { required: false }),
  linkedin: fieldSchema("string", { required: false }),
  facebook: fieldSchema("string", { required: false }),
  youtube: fieldSchema("string", { required: false }),
  twitter: fieldSchema("string", { required: false }),
});

// Languages
export const LanguagesSchema = Yup.object({
  name: fieldSchema("string", "Name"),
  priority: fieldSchema("number", "Priority"),
});

// Admin Setting
export const AdminSettingSchema = Yup.object({
  firstName: fieldSchema("string", "firstName"),
  lastName: fieldSchema("string", "lastName"),
  email: fieldSchema("string", "email"),
  phoneNumber: fieldSchema("number", "phoneNumber"),
  profilePhoto: imageSchema("profile Photo"),
});
