import { Button } from "antd";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { Add, Minus } from "iconsax-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Label, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { CustomSwitch, DataAndTime, ImageUpload, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WorkshopFormValues } from "../../types";
import { WorkshopSchema } from "../../utils/ValidationSchemas";
import { WorkshopStatus } from "../../data";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditWorkshop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useWorkshop, isPending: isWorkshopAdding } = Mutations.useWorkshop();
  const { mutate: upEditWorkshop, isPending: isWorkshopUpdating } = Mutations.useEditWorkshop();
  const { data: category, isLoading: isCategoryLoading } = Queries.useGetCategory({});

  const handleNavigate = () => navigate(ROUTES.WORKSHOP.WORKSHOP);

  const initialValues: WorkshopFormValues = {
    title: initialData?.title || "",
    shortDescription: initialData?.shortDescription || "",
    date: initialData?.date || "",
    time: initialData?.time || "",
    duration: initialData?.duration || "",
    instructorImage: initialData?.instructorImage ? [initialData.instructorImage] : [],
    instructorName: initialData?.instructorName || "",
    thumbnailImage: initialData?.thumbnailImage ? [initialData.thumbnailImage] : [],
    workshopImage: initialData?.workshopImage ? [initialData.workshopImage] : [],
    price: initialData?.price || null,
    categoryId: initialData?.categoryId?._id || "",
    status: initialData?.status || "",
    priority: initialData?.priority || null,
    fullDescription: initialData?.fullDescription || "",
    syllabus: initialData?.syllabus || "",
    faq: initialData?.faq || [{ question: "", answer: "" }],
    features: initialData?.features,
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
              {({ values }) => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <TextInput name="title" label="Title" type="text" placeholder="Enter workshop title" required />
                    </Col>
                    <Col md="6" xl="4">
                      <DataAndTime name="date" type="date" label="Start Date" format="DD/MM/YYYY" placeholder="Start Date" required disablePast />
                    </Col>
                    <Col md="6" xl="4">
                      <DataAndTime name="time" type="time" label="Meeting Time" format="HH:mm:ss" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="duration" label="Duration" type="text" placeholder="Enter duration" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="price" label="Price" type="number" placeholder="Enter price" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="categoryId" label="category" options={generateOptions(category?.data?.category_data)} loading={isCategoryLoading} />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="status" label="status" options={WorkshopStatus} required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" required />
                    </Col>
                    <Col md="12">
                      <TextInput name="syllabus" label="Syllabus" type="text" placeholder="Enter syllabus" />
                    </Col>
                    <Col md="12">
                      <TextInput name="shortDescription" label="Short Description" type="textarea" placeholder="Enter short description" required />
                    </Col>
                    <Col md="12">
                      <TextInput name="fullDescription" label="Full Description" type="textarea" placeholder="Enter full description" />
                    </Col>
                    <Col>
                      <ImageUpload name="instructorImage" label="Instructor Image" />
                    </Col>
                    <Col>
                      <ImageUpload name="thumbnailImage" label="Thumbnail Image" required />
                    </Col>
                    <Col>
                      <ImageUpload name="workshopImage" label="Workshop Image" required />
                    </Col>
                    {/* FAQ Section */}
                    <Col md="12" className="input-box">
                      <Label className="mb-3">Workshop FAQ</Label>
                      <FieldArray name="faq">
                        {({ push, remove }) => (
                          <>
                            {values.faq?.map((_, index) => (
                              <Row key={index} className="mb-3 gy-4">
                                <Col md="5">
                                  <TextInput name={`faq[${index}].question`} label={`FAQ Question ${index + 1}`} type="text" placeholder="Enter FAQ question" />
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
