import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WhatYouLearnFormValues } from "../../types";
import { WhatYouLearnSchema } from "../../utils/ValidationSchemas";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditWhatYouLearn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useWhatYouLearn, isPending: isWhatYouLearnAdding } = Mutations.useWhatYouLearn();
  const { mutate: upEditWhatYouLearn, isPending: isWhatYouLearnUpdating } = Mutations.useEditWhatYouLearn();

  const initialValues: WhatYouLearnFormValues = {
    title: initialData?.title || "",
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.SKILL_LEVEL.SKILL_LEVEL);

  const handleSubmit = async (values: WhatYouLearnFormValues, { resetForm }: FormikHelpers<WhatYouLearnFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditWhatYouLearn({ whatYouLearnId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useWhatYouLearn(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} What You Learn`} parent="What You Learn" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} What You Learn`}>
          <div className="input-items">
            <Formik<WhatYouLearnFormValues> initialValues={initialValues} validationSchema={WhatYouLearnSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="title" type="text" placeholder="Enter title" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isWhatYouLearnAdding || isWhatYouLearnUpdating}>
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

export default AddEditWhatYouLearn;
