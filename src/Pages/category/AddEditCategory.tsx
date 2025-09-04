import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ROUTES } from "../../constants";
import { CardWrapper } from "../../coreComponents";
import { TextInput } from "../../attribute/formFields";
import { CategoryFormValues } from "../../types";
import { CategorySchema } from "../../utils/ValidationSchemas";
import { Breadcrumbs } from "../../coreComponents";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useCategory, isPending: isCategoryAdding } = Mutations.useCategory();
  const { mutate: upEditCategory, isPending: isCategoryUpdating } = Mutations.useEditCategory();

  const initialValues: CategoryFormValues = {
    name: initialData?.name || "",
    priority: initialData?.priority || "",
  };

  const handleNavigate = () => navigate(ROUTES.CATEGORY.CATEGORY);

  const handleSubmit = async (values: CategoryFormValues, { resetForm }: FormikHelpers<CategoryFormValues>) => {
    const payload = buildPayload(values, initialData);
    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditCategory({ categoryId: state?.editData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useCategory(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Category`} parent="Category" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Category`}>
          <div className="input-items">
            <Formik<CategoryFormValues> initialValues={initialValues} validationSchema={CategorySchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter your name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isCategoryAdding || isCategoryUpdating}>
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

export default AddEditCategory;
