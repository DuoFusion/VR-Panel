import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { InterestFormValues } from "../../types";
import { InterestSchema } from "../../utils/ValidationSchemas";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditInterest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useInterest, isPending: isInterestAdding } = Mutations.useInterest();
  const { mutate: upEditInterest, isPending: isInterestUpdating } = Mutations.useEditInterest();

  const initialValues: InterestFormValues = {
    name: initialData?.name || "",
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.SKILL_LEVEL.SKILL_LEVEL);

  const handleSubmit = async (values: InterestFormValues, { resetForm }: FormikHelpers<InterestFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditInterest({ interestId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useInterest(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Interest`} parent="Interest" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Interest`}>
          <div className="input-items">
            <Formik<InterestFormValues> initialValues={initialValues} validationSchema={InterestSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isInterestAdding || isInterestUpdating}>
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

export default AddEditInterest;
