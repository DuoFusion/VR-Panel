import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { SkillLevelFormValues } from "../../types";
import { SkillLevelSchema } from "../../utils/ValidationSchemas";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditSkillLevel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useSkillLevel, isPending: isSkillLevelAdding } = Mutations.useSkillLevel();
  const { mutate: upEditSkillLevel, isPending: isSkillLevelUpdating } = Mutations.useEditSkillLevel();

  const initialValues: SkillLevelFormValues = {
    title: initialData?.title || "",
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.SKILL_LEVEL.SKILL_LEVEL);

  const handleSubmit = async (values: SkillLevelFormValues, { resetForm }: FormikHelpers<SkillLevelFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditSkillLevel({ skillLevelId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useSkillLevel(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Skill Level`} parent="Skill Level" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Skill Level`}>
          <div className="input-items">
            <Formik<SkillLevelFormValues> initialValues={initialValues} validationSchema={SkillLevelSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="title" type="text" placeholder="Enter Skill Level title" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isSkillLevelAdding || isSkillLevelUpdating}>
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

export default AddEditSkillLevel;
