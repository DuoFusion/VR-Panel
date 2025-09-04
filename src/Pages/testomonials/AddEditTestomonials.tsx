import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Facebook, Instagram, LinkCircle, Xrp } from "iconsax-react";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ImageUpload, RateInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { TestomonialsFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { TestomonialsSchema } from "../../utils/ValidationSchemas";

const AddEditTestomonials = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useTestomonials, isPending: isTestomonialsAdding } = Mutations.useTestomonials();
  const { mutate: upEditTestomonials, isPending: isTestomonialsUpdating } = Mutations.useEditTestomonials();

  const initialValues: TestomonialsFormValues = {
    name: initialData?.name || "",
    role: initialData?.role || "",
    image: initialData?.image ? [initialData.image] : [],
    priority: initialData?.priority || null,
    message: initialData?.message || "",
    rating: initialData?.rating || null,
  };

  const handleNavigate = () => navigate(ROUTES.TESTOMONIALS.TESTOMONIALS);

  const handleSubmit = async (values: TestomonialsFormValues, { resetForm }: FormikHelpers<TestomonialsFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditTestomonials({ testimonialId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useTestomonials(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Testomonials`} parent="Testomonials" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Testomonials`}>
          <div className="input-items">
            <Formik<TestomonialsFormValues> initialValues={initialValues} validationSchema={TestomonialsSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="role" label="role" type="text" placeholder="Enter role" />
                    </Col>
                    <Col md="6">
                      <TextInput name="message" label="message" type="text" placeholder="Enter message" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col md="4">
                      <RateInput name="rating" label="Course Rating" allowHalf />
                    </Col>
                    <Col md="12">
                      <ImageUpload name="image" label="Image" />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isTestomonialsAdding || isTestomonialsUpdating}>
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

export default AddEditTestomonials;
