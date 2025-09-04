import { Button } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Add, Minus } from "iconsax-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { CustomSwitch, ImageUpload, RateInput, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { DiscountStatus } from "../../data";
import { CoursesFormValues, TestimonialsType } from "../../types";
import { generateOptions } from "../../utils";
import { CoursesSchema } from "../../utils/ValidationSchemas";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useCourses, isPending: isCoursesAdding } = Mutations.useCourses();
  const { mutate: upEditCourses, isPending: isCoursesUpdating } = Mutations.useEditCourses();
  const { data: SkillLevel, isLoading: isSkillLevelLoading } = Queries.useGetSkillLevel({});
  const { data: WhatYouLearn, isLoading: isWhatYouLearnLoading } = Queries.useGetWhatYouLearn({});
  const { data: Languages, isLoading: isLanguagesLoading } = Queries.useGetLanguages({});

  const initialValues: CoursesFormValues = {
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    background: initialData?.background || "",
    duration: initialData?.duration || "",
    skillLevelId: initialData?.skillLevelId?._id || "",
    price: initialData?.price || null,
    totalLectures: initialData?.totalLectures || null,
    totalHours: initialData?.totalHours || "",
    priority: initialData?.priority || null,
    rating: initialData?.rating || null,
    whatYouLearnId: initialData?.whatYouLearnId?._id || "",
    instructorName: initialData?.instructorName || "",
    courseLanguageId: initialData?.courseLanguageId?._id || "",
    mrp: initialData?.mrp || null,
    discount: initialData?.discount || "",
    shortDescription: initialData?.shortDescription || "",
    instructorImage: initialData?.instructorImage ? [initialData.instructorImage] : [],
    courseImage: initialData?.courseImage ? [initialData.courseImage] : [],
    faq: initialData?.faq || [{ question: "", answer: "" }],
    listOfLecture: initialData?.listOfLecture || [{ title: "", description: "" }],
    testimonials: initialData?.testimonials?.length ? initialData.testimonials.map((t: TestimonialsType) => ({ ...t, image: t.image ? [t.image] : [] })) : [{ name: "", role: "", message: "", rating: null, image: [] }],
    features: initialData?.features,
  };

  const handleNavigate = () => navigate(ROUTES.COURSES.COURSES);

  const handleSubmit = async (values: CoursesFormValues, { resetForm }: FormikHelpers<CoursesFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditCourses({ courseId: state?.editData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useCourses(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Courses`} parent="Courses" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Courses`}>
          <div className="input-items">
            <Formik<CoursesFormValues> initialValues={initialValues} validationSchema={CoursesSchema} onSubmit={handleSubmit} enableReinitialize>
              {({ values }) => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <TextInput name="title" label="Title" type="text" placeholder="Enter course title" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="subtitle" label="sub title" type="text" placeholder="Enter course sub title" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="background" label="Background" type="text" placeholder="Enter course Background" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="duration" label="Duration" type="text" placeholder="Enter duration" required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="skillLevelId" label="skill Level" placeholder="Select skill Level" options={generateOptions(SkillLevel?.data?.skill_level_data)} loading={isSkillLevelLoading} required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="price" label="Price" type="number" placeholder="Enter price" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="totalLectures" label="Total Lectures" type="number" placeholder="Enter Total Lectures" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="totalHours" label="total Hours" type="text" placeholder="Enter total Hours" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="rating" label="rating" type="number" placeholder="Enter rating" required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="whatYouLearnId" label="what You Learn" placeholder="Select what You Learn" options={generateOptions(WhatYouLearn?.data?.what_you_learn_data)} loading={isWhatYouLearnLoading} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="courseLanguageId" label="course Language" placeholder="Select course Language" options={generateOptions(Languages?.data?.language_data)} loading={isLanguagesLoading} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="mrp" label="mrp" type="number" placeholder="Enter mrp" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="discount" label="discount" options={DiscountStatus} />
                    </Col>
                    <Col md="12">
                      <TextInput name="shortDescription" label="Short Description" type="textarea" placeholder="Enter short description" required />
                    </Col>
                    <Col md="2">
                      <ImageUpload name="instructorImage" label="Instructor Image" />
                    </Col>
                    <Col md="3">
                      <ImageUpload name="courseImage" label="Courses Image" required />
                    </Col>
                    <Col md="12" className="input-box">
                      <h2 className="my-3">FAQ</h2>
                      <FieldArray name="faq">
                        {({ push, remove }) => (
                          <>
                            {values.faq?.map((_, index) => (
                              <Row key={index} className="mb-3 gy-4">
                                <Col md="5">
                                  <TextInput name={`faq[${index}].question`} label={`FAQ Question ${index + 1}`} type="textarea" placeholder="Enter FAQ question" />
                                </Col>
                                <Col md="5">
                                  <TextInput name={`faq[${index}].answer`} label={`FAQ Answer ${index + 1}`} type="textarea" placeholder="Enter FAQ answer" />
                                </Col>
                                <Col md="2" className="d-flex align-items-center gap-2">
                                  {(values.faq?.length ?? 0) > 1 && (
                                    <Button type="text" onClick={() => remove(index)} danger className="m-1 p-1 action-btn btn-danger">
                                      <Minus className="action" />
                                    </Button>
                                  )}
                                  {index === (values.faq?.length ?? 0) - 1 && (
                                    <Button type="text" onClick={() => push({ question: "", answer: "" })} className="m-1 p-1 btn btn-primary action-btn">
                                      <Add className="action" />
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Col>
                    <Col md="12" className="input-box">
                      <h2 className="my-3">List of Lecture</h2>
                      <FieldArray name="listOfLecture">
                        {({ push, remove }) => (
                          <>
                            {values.listOfLecture?.map((_, index) => (
                              <Row key={index} className="mb-3 gy-4">
                                <Col md="5">
                                  <TextInput name={`listOfLecture[${index}].title`} label={`Title ${index + 1}`} type="textarea" placeholder="Enter list of Lecture Title" />
                                </Col>
                                <Col md="5">
                                  <TextInput name={`listOfLecture[${index}].description`} label={`Description ${index + 1}`} type="textarea" placeholder="Enter List of Lecture Description" />
                                </Col>
                                <Col md="2" className="d-flex align-items-center gap-2">
                                  {(values.listOfLecture?.length ?? 0) > 1 && (
                                    <Button type="text" onClick={() => remove(index)} danger className="m-1 p-1 action-btn btn-danger">
                                      <Minus className="action" />
                                    </Button>
                                  )}
                                  {index === (values.listOfLecture?.length ?? 0) - 1 && (
                                    <Button type="text" onClick={() => push({ title: "", description: "" })} className="m-1 p-1 btn btn-primary action-btn">
                                      <Add className="action" />
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Col>
                    <Col md="12" className="input-box">
                      <h2 className="mt-3">Testimonials</h2>
                      <FieldArray name="testimonials">
                        {({ push, remove }) => (
                          <>
                            {values.testimonials?.map((_, index) => (
                              <Row key={index} className="mb-3">
                                <Col md="10" className="row gy-4 m-0">
                                  <Col md="4">
                                    <TextInput name={`testimonials[${index}].name`} label="name" type="text" placeholder="Enter Your Name" />
                                  </Col>
                                  <Col md="4">
                                    <TextInput name={`testimonials[${index}].role`} label="role" type="text" placeholder="Enter your role" />
                                  </Col>
                                  <Col md="4">
                                    <RateInput name={`testimonials[${index}].rating`} label="Course Rating" allowHalf />
                                  </Col>
                                  <Col md="12" className="row gy-4 m-0">
                                    <Col md="9" className="ps-0">
                                      <TextInput name={`testimonials[${index}].message`} label="message" type="textarea" placeholder="Enter Your message" />
                                    </Col>
                                    <Col md="3">
                                      <ImageUpload name={`testimonials[${index}].image`} label="Image" />
                                    </Col>
                                  </Col>
                                </Col>
                                <Col md="2" className="d-flex align-items-center gap-2">
                                  {(values.testimonials?.length ?? 0) > 1 && (
                                    <Button type="text" onClick={() => remove(index)} danger className="m-1 p-1 action-btn btn-danger">
                                      <Minus className="action" />
                                    </Button>
                                  )}
                                  {index === (values.testimonials?.length ?? 0) - 1 && (
                                    <Button type="text" onClick={() => push({ name: "", role: "", message: "", rating: null })} className="m-1 p-1 btn btn-primary action-btn">
                                      <Add className="action" />
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            ))}
                          </>
                        )}
                      </FieldArray>
                    </Col>
                    <Col md="12">
                      <CustomSwitch name="features" title="features" />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isCoursesAdding || isCoursesUpdating}>
                          Save
                        </Button>
                        <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => handleNavigate()}>
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default AddEditCourses;
