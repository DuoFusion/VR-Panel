import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { CustomSwitch, ImageUpload, QuillInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { BlogFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { BlogSchema } from "../../utils/ValidationSchemas";

const AddEditBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useBlog, isPending: isBlogAdding } = Mutations.useBlog();
  const { mutate: upEditBlog, isPending: isBlogUpdating } = Mutations.useEditBlog();

  const initialValues: BlogFormValues = {
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    description: initialData?.description || "",
    tag: initialData?.tag || "",
    blogImage: initialData?.blogImage ? [initialData.blogImage] : [],
    thumbnailImage: initialData?.thumbnailImage ? [initialData.thumbnailImage] : [],
    // priority: initialData?.priority || null,
    features: initialData?.features,
  };

  const handleNavigate = () => navigate(ROUTES.BLOG.BLOG);

  const handleSubmit = async (values: BlogFormValues, { resetForm }: FormikHelpers<BlogFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditBlog({ blogId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useBlog(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Blog`} parent="Blog" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Blog`}>
          <div className="input-items">
            <Formik<BlogFormValues> initialValues={initialValues} validationSchema={BlogSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="title" type="text" placeholder="Enter title" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="subtitle" label="subtitle" type="text" placeholder="Enter subtitle" required />
                    </Col>
                    {/* <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col> */}
                    <Col md="12">
                      <TextInput name="tag" label="tag" type="text" placeholder="Enter tag" required />
                    </Col>
                    <Col md="12">
                      {/* <TextInput name="description" label="description" type="textarea" placeholder="Enter description" required /> */}
                      <QuillInput name="description" label="Description" required />
                    </Col>
                    <Col md="3">
                      <ImageUpload name="blogImage" label="blog Image" required />
                    </Col>
                    <Col md="3">
                      <ImageUpload name="thumbnailImage" label="blog thumbnail Image" required />
                    </Col>
                    <Col md="12">
                      <CustomSwitch name="features" title="features" />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isBlogAdding || isBlogUpdating}>
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

export default AddEditBlog;
