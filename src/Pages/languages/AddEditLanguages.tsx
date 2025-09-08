import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { LanguagesFormValues } from "../../types";
import { LanguagesSchema } from "../../utils/ValidationSchemas";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditLanguages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useLanguages, isPending: isLanguagesAdding } = Mutations.useLanguages();
  const { mutate: upEditLanguages, isPending: isLanguagesUpdating } = Mutations.useEditLanguages();

  const initialValues: LanguagesFormValues = {
    name: initialData?.name || "",
    priority: initialData?.priority || null,
  };
  const handleNavigate = () => navigate(ROUTES.LANGUAGE.LANGUAGE);

  const handleSubmit = async (values: LanguagesFormValues, { resetForm }: FormikHelpers<LanguagesFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditLanguages({ languageId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useLanguages(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Languages`} parent="Languages" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Languages`}>
          <div className="input-items">
            <Formik<LanguagesFormValues> initialValues={initialValues} validationSchema={LanguagesSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter Language name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isLanguagesAdding || isLanguagesUpdating}>
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

export default AddEditLanguages;
