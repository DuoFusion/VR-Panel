import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { CustomSwitch, ImageUpload, QuillInput, RateInput, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CoursesFormValues, LanguagesType } from "../../types";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";
import { CoursesSchema } from "../../utils/ValidationSchemas";
import { LevelStatus } from "../../data";

const AddEditCourses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useCourses, isPending: isCoursesAdding } = Mutations.useCourses();
  const { mutate: upEditCourses, isPending: isCoursesUpdating } = Mutations.useEditCourses();
  const { data: Languages, isLoading: isLanguagesLoading } = Queries.useGetLanguages({});

  const initialValues: CoursesFormValues = {
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    // background: initialData?.background || "",
    duration: initialData?.duration || "",
    price: initialData?.price || null,
    totalLectures: initialData?.totalLectures || null,
    totalHours: initialData?.totalHours || "",
    priority: initialData?.priority || null,
    // whatWillYouLearn: initialData?.whatWillYouLearn || "",
    // instructorName: initialData?.instructorName || "",
    description: initialData?.description || "",
    review: initialData?.review || "",
    level: initialData?.level || "",
    mrp: initialData?.mrp || null,
    languageId: initialData?.languageId?.map((language: LanguagesType) => language?._id) ?? [],
    // shortDescription: initialData?.shortDescription || "",
    // instructorImage: initialData?.instructorImage ? [initialData.instructorImage] : [],
    courseImage: initialData?.courseImage ? [initialData.courseImage] : [],
    thumbnailImage: initialData?.thumbnailImage ? [initialData.thumbnailImage] : [],
    // listOfLecture: initialData?.listOfLecture || [{ title: "", description: "" }],
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
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <TextInput name="title" label="Title" type="text" placeholder="Enter course title" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="subtitle" label="sub title" type="text" placeholder="Enter course sub title" required />
                    </Col>
                    {/* <Col md="6" xl="4">
                      <TextInput name="background" label="Background" type="text" placeholder="Enter course Background" required />
                    </Col> */}
                    <Col md="6" xl="4">
                      <TextInput name="duration" label="Duration" type="text" placeholder="Enter duration" required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="languageId" label="language" placeholder="select an language" options={generateOptions(Languages?.data?.language_data)} loading={isLanguagesLoading} mode="multiple" required />
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
                     <Col md="6">
                      <RateInput name="review" label="Course review" required />
                    </Col>
                    <Col md="6">
                      <SelectInput name="level" label="skill Level" placeholder="select an skill Level" options={LevelStatus} loading={isLanguagesLoading} required />
                    </Col>
                    <Col md="12">
                      <QuillInput name="description" label="Description" required />
                    </Col>
                    {/* <Col md="12">
                      <QuillInput name="whatWillYouLearn" label="what Will You Learn" required />
                    </Col> */}
                    {/* <Col md="6">
                      <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" />
                    </Col> */}
                    {/* <Col md="12">
                      <TextInput name="shortDescription" label="Short Description" type="textarea" placeholder="Enter short description" required />
                    </Col> */}
                    {/* <Col>
                      <ImageUpload name="instructorImage" label="Instructor Image" required/>
                    </Col> */}
                    <Col>
                      <ImageUpload name="thumbnailImage" label="Thumbnail Image" required />
                    </Col>
                    <Col>
                      <ImageUpload name="courseImage" label="Courses Image" required />
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
