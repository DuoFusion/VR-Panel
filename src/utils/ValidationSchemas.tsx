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

const faqSchema = Yup.object({
  question: fieldSchema("string", { required: false }),
  answer: fieldSchema("string", { required: false }),
});

const lectureSchema = Yup.object({
  title: fieldSchema("string", { required: false }),
  description: fieldSchema("string", { required: false }),
});

const testimonialSchema = (required: boolean) =>
  Yup.object({
    name: fieldSchema("string", { required }),
    role: fieldSchema("string", { required }),
    message: fieldSchema("string", { required }),
    rating: fieldSchema("number", { required }),
    image: imageSchema("Testimonial Image", required),
  });

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

// Category
export const CategorySchema = Yup.object({
  name: fieldSchema("string", "Name"),
  priority: fieldSchema("number", "Priority"),
});

// Workshop
export const WorkshopSchema = Yup.object({
  title: fieldSchema("string", "Title"),
  shortDescription: fieldSchema("string", "Short Description"),
  date: fieldSchema("string", "Date"),
  time: fieldSchema("string", "Time"),
  duration: fieldSchema("string", "Duration"),
  instructorImage: imageSchema("Instructor Image", false),
  instructorName: fieldSchema("string", "Instructor Name"),
  thumbnailImage: imageSchema("Thumbnail Image"),
  workshopImage: imageSchema("Workshop Image"),
  price: fieldSchema("number", { required: false, extraRules: (s) => s.min(0, "Price must be greater than or equal to 0") }),
  categoryId: fieldSchema("string", { required: false }),
  status: fieldSchema("string", { required: false }),
  priority: fieldSchema("number", "Priority"),
  syllabus: fieldSchema("string", { required: false }),
  fullDescription: fieldSchema("string", { required: false }),
  features: fieldSchema("boolean", { required: false }),
  faq: Yup.array().of(faqSchema).min(1, "At least one FAQ is required"),
});

export const WorkshopRegisterSchema = Yup.object({
  workshopId: fieldSchema("string", "Workshop"),
  name: fieldSchema("string", "name"),
  email: fieldSchema("string", { required: false }),
  phoneNumber: fieldSchema("string", "phone Number"),
  city: fieldSchema("string", { required: false }),
  profession: fieldSchema("string", { required: false }),
  paymentStatus: fieldSchema("string", "payment Status"),
  fees: fieldSchema("number", "fees"),
  couponCodeId: fieldSchema("string", { required: false }),
  paymentMethod: fieldSchema("string", "paymentMethod"),
  transactionId: fieldSchema("string", "transactionId"),
});

// Courses
export const CoursesSchema = Yup.object({
  title: fieldSchema("string", "Title"),
  subtitle: fieldSchema("string", "Sub Title"),
  background: fieldSchema("string", "Background"),
  duration: fieldSchema("string", "Duration"),
  skillLevelId: fieldSchema("string", "Skill Level"),
  price: fieldSchema("number", "Price", { extraRules: (s) => s.min(0, "Price must be greater than or equal to 0") }),
  totalLectures: fieldSchema("number", "Total Lectures"),
  totalHours: fieldSchema("string", "Total Hours"),
  priority: fieldSchema("number", "Priority"),
  rating: fieldSchema("number", "Rating"),
  whatYouLearnId: fieldSchema("string", { required: false }),
  instructorName: fieldSchema("string", { required: false }),
  courseLanguageId: fieldSchema("string", { required: false }),
  mrp: fieldSchema("number", { required: false, extraRules: (s) => s.min(0, "MRP must be greater than or equal to 0") }),
  discount: fieldSchema("string", { required: false }),
  shortDescription: fieldSchema("string", "Short Description"),
  instructorImage: imageSchema("Instructor Image", false),
  courseImage: imageSchema("Course Image"),
  faq: Yup.array().of(faqSchema).min(1, "At least one FAQ is required"),
  listOfLecture: Yup.array().of(lectureSchema).min(1, "At least one Lecture is required"),
  testimonials: Yup.array().of(testimonialSchema(false)).min(1, "At least one Testimonial is required"),
  features: fieldSchema("boolean", { required: false }),
});

// Courses Register
export const CoursesRegisterSchema = Yup.object({
  fullName: fieldSchema("string", "fullName"),
  email: fieldSchema("string", { required: false }),
  phoneNumber: fieldSchema("string", "phoneNumber"),
  city: fieldSchema("string", { required: false }),
  paymentMethod: fieldSchema("string", "paymentMethod"),
  transactionId: fieldSchema("string", "transactionId"),
  paymentStatus: fieldSchema("string", "paymentStatus"),
  courseId: fieldSchema("string", "courseId"),
  couponCodeId: fieldSchema("string", { required: false }),
  profession: fieldSchema("string", { required: false }),
  fees: fieldSchema("string", "fees"),
});

// Languages
export const LanguagesSchema = Yup.object({
  name: fieldSchema("string", "Name"),
  priority: fieldSchema("number", "Priority"),
});

// Skill Level
export const SkillLevelSchema = Yup.object({
  title: fieldSchema("string", "title"),
  priority: fieldSchema("number", "Priority"),
});

// What You Learn
export const WhatYouLearnSchema = Yup.object({
  title: fieldSchema("string", "title"),
  priority: fieldSchema("number", "Priority"),
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

// Mentors
export const MentorsSchema = Yup.object({
  name: fieldSchema("string", "name"),
  role: fieldSchema("string", "role"),
  priority: fieldSchema("number", "Priority"),
  image: imageSchema("Mentor Image"),
  experience: fieldSchema("string", { required: false }),
  instagram: fieldSchema("string", { required: false }),
  linkedin: fieldSchema("string", { required: false }),
  facebook: fieldSchema("string", { required: false }),
  x: fieldSchema("string", { required: false }),
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

// Coupon Code

export const CouponCodeSchema = Yup.object({
  name: fieldSchema("string", "Name"),
  code: fieldSchema("string", "Code"),
  description: fieldSchema("string", "description"),
  discount: fieldSchema("string", "discount"),
  discountType: fieldSchema("string", "discountType"),
  startDate: fieldSchema("string", { required: false }),
  endDate: fieldSchema("string", { required: false }),
  numberOfUses: fieldSchema("string", { required: false }),
});

// Interest
export const InterestSchema = Yup.object({
  name: fieldSchema("string", "name"),
  priority: fieldSchema("number", "Priority"),
});

// Web Setting
export const WebSettingSchema = Yup.object({
  email: fieldSchema("string", "email"),
  phoneNumber: fieldSchema("number", "phoneNumber"),
  whatsappNumber: fieldSchema("number", "whatsappNumber"),
  whatsappMessage: fieldSchema("string", { required: false }),
  address: fieldSchema("string", "address"),
  instagram: fieldSchema("string", { required: false }),
  linkedin: fieldSchema("string", { required: false }),
  facebook: fieldSchema("string", { required: false }),
  whatsapp: fieldSchema("string", { required: false }),
  razorpayKeySecret: fieldSchema("string", "razorpayKeySecret"),
  razorpayKeyId: fieldSchema("string", "razorpayKeyId"),
});
