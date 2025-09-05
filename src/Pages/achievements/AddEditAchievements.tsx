import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ImageUpload, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { AchievementsFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { AchievementsSchema } from "../../utils/ValidationSchemas";

const AddEditAchievements = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useAchievements, isPending: isAchievementsAdding } = Mutations.useAchievements();
  const { mutate: upEditAchievements, isPending: isAchievementsUpdating } = Mutations.useEditAchievements();

  const initialValues: AchievementsFormValues = {
    title: initialData?.title || "",
    image: initialData?.image ? [initialData.image] : [],
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.ACHIEVEMENTS.ACHIEVEMENTS);

  const handleSubmit = async (values: AchievementsFormValues, { resetForm }: FormikHelpers<AchievementsFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditAchievements({ achievementId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useAchievements(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Achievements`} parent="Achievements" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Achievements`}>
          <div className="input-items">
            <Formik<AchievementsFormValues> initialValues={initialValues} validationSchema={AchievementsSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="title" type="text" placeholder="Enter title" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col>
                      <ImageUpload name="image" label="Image" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isAchievementsAdding || isAchievementsUpdating}>
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

export default AddEditAchievements;
