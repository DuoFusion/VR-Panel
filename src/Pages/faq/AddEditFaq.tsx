import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { FaqFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { FaqSchema } from "../../utils/ValidationSchemas";

const AddEditFaq = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useFaq, isPending: isFaqAdding } = Mutations.useFaq();
  const { mutate: upEditFaq, isPending: isFaqUpdating } = Mutations.useEditFaq();

  const initialValues: FaqFormValues = {
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.FAQ.FAQ);

  const handleSubmit = async (values: FaqFormValues, { resetForm }: FormikHelpers<FaqFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditFaq({ faqId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useFaq(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Faq`} parent="Faq" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Faq`}>
          <div className="input-items">
            <Formik<FaqFormValues> initialValues={initialValues} validationSchema={FaqSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="12">
                      <TextInput name="question" label="question" type="text" placeholder="Enter Your question" required />
                    </Col>
                    <Col md="12">
                      <TextInput name="answer" label="answer" type="textarea" placeholder="Enter Your answer" required />
                    </Col>
                    <Col md="12">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isFaqAdding || isFaqUpdating}>
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

export default AddEditFaq;
