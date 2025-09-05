import { Button } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Add, Minus } from "iconsax-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { CustomSwitch, ImageUpload, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CoursesFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { CoursesSchema } from "../../utils/ValidationSchemas";

const AddEditCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useCourses, isPending: isCoursesAdding } = Mutations.useCourses();
  const { mutate: upEditCourses, isPending: isCoursesUpdating } = Mutations.useEditCourses();

  const initialValues: CoursesFormValues = {
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    background: initialData?.background || "",
    duration: initialData?.duration || "",
    price: initialData?.price || null,
    totalLectures: initialData?.totalLectures || null,
    totalHours: initialData?.totalHours || "",
    priority: initialData?.priority || null,
    instructorName: initialData?.instructorName || "",
    mrp: initialData?.mrp || null,
    shortDescription: initialData?.shortDescription || "",
    instructorImage: initialData?.instructorImage ? [initialData.instructorImage] : [],
    courseImage: initialData?.courseImage ? [initialData.courseImage] : [],
    listOfLecture: initialData?.listOfLecture || [{ title: "", description: "" }],
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
                      <TextInput name="price" label="Price" type="number" placeholder="Enter price" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="mrp" label="mrp" type="number" placeholder="Enter mrp" />
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
                      <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" />
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
