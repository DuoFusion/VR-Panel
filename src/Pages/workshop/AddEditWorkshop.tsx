import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { CustomSwitch, ImageUpload, QuillInput, RateInput, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { LanguagesType, WorkshopFormValues } from "../../types";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";
import { WorkshopSchema } from "../../utils/ValidationSchemas";
import { LevelStatus } from "../../data";

const AddEditWorkshop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useWorkshop, isPending: isWorkshopAdding } = Mutations.useWorkshop();
  const { mutate: upEditWorkshop, isPending: isWorkshopUpdating } = Mutations.useEditWorkshop();
  const { data: Languages, isLoading: isLanguagesLoading } = Queries.useGetLanguages({});

  const handleNavigate = () => navigate(ROUTES.WORKSHOP.WORKSHOP);

  const initialValues: WorkshopFormValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    // date: initialData?.date || "",
    // time: initialData?.time || "",
    duration: initialData?.duration || "",
    review: initialData?.review || "",
    level: initialData?.level || "",
    // instructorImage: initialData?.instructorImage ? [initialData.instructorImage] : [],
    // instructorName: initialData?.instructorName || "",
    thumbnailImage: initialData?.thumbnailImage ? [initialData.thumbnailImage] : [],
    workshopImage: initialData?.workshopImage ? [initialData.workshopImage] : [],
    price: initialData?.price || 0,
    languageId: initialData?.languageId?.map((language: LanguagesType) => language?._id) ?? [],
    // mrp: initialData?.mrp || null,
    priority: initialData?.priority || state?.nextPriority || null,
    // fullDescription: initialData?.fullDescription || "",
    features: initialData?.features,
    link: initialData?.link || "",
  };

  const handleSubmit = async (values: WorkshopFormValues, { resetForm }: FormikHelpers<WorkshopFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };
    if (state?.edit) {
      upEditWorkshop({ workshopId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useWorkshop(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Workshop`} parent="Workshop" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Workshop`}>
          <div className="input-items">
            <Formik<WorkshopFormValues> initialValues={initialValues} validationSchema={WorkshopSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="Title" type="text" placeholder="Enter workshop title" required />
                    </Col>
                    {/* <Col md="6" xl="4">
                      <DataAndTime name="date" type="date" label="Date" format="DD/MM/YYYY" required disablePast />
                    </Col> */}
                    {/* <Col md="6" xl="4">
                      <DataAndTime name="time" type="time" label="Time" format="HH:mm:ss" required />
                    </Col> */}
                    <Col md="6">
                      <TextInput name="duration" label="Duration" type="text" placeholder="Enter duration" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="price" label="Price" type="number" placeholder="Enter price" required />
                    </Col>
                    {/* <Col md="6" xl="4">
                      <TextInput name="mrp" label="mrp" type="number" placeholder="Enter mrp" />
                    </Col> */}
                    <Col md="6">
                      <SelectInput name="languageId" label="language" placeholder="select an language" options={generateOptions(Languages?.data?.language_data)} loading={isLanguagesLoading} mode="multiple" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col md="6">
                      <RateInput name="review" label="Course review" required />
                    </Col>
                    <Col md="6">
                      <SelectInput name="level" label="skill Level" placeholder="select an skill Level" options={LevelStatus} loading={isLanguagesLoading} required />
                    </Col>
                    <Col md="6">
                      <TextInput name="link" label="Lecture Link" type="text" placeholder="Enter Lecture Link" required />
                    </Col>
                    <Col md="12">
                      <QuillInput name="description" label="Description" required />
                    </Col>
                    {/* <Col md="6" xl="4">
                      <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" required />
                    </Col> */}
                    {/* <Col md="12">
                      <TextInput name="shortDescription" label="Short Description" type="textarea" placeholder="Enter short description" required />
                    </Col> */}
                    {/* <Col md="12">
                      <TextInput name="fullDescription" label="Full Description" type="textarea" placeholder="Enter full description" />
                    </Col> */}
                    {/* <Col>
                      <ImageUpload name="instructorImage" label="Instructor Image" required/>
                    </Col> */}
                    <Col>
                      <ImageUpload name="thumbnailImage" label="Thumbnail Image" required />
                    </Col>
                    <Col>
                      <ImageUpload name="workshopImage" label="Workshop Image" required />
                    </Col>
                    <Col md="12">
                      <CustomSwitch name="features" title="features" />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isWorkshopAdding || isWorkshopUpdating}>
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

export default AddEditWorkshop;
