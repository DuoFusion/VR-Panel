import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { ImageUpload, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { BannerFormValues } from "../../types";
import { BannerSchema } from "../../utils/ValidationSchemas";
import { BannerStatus } from "../../data";
import { buildPayload } from "../../utils/FormHelpers";

const AddEditBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useBanner, isPending: isBannerAdding } = Mutations.useBanner();
  const { mutate: upEditBanner, isPending: isBannerUpdating } = Mutations.useEditBanner();

  const initialValues: BannerFormValues = {
    title: initialData?.title || "",
    type: initialData?.type || "",
    subTitle: initialData?.subTitle || "",
    cta: initialData?.cta || "",
    image: initialData?.image ? [initialData.image] : [],
    priority: initialData?.priority || null,
  };

  const handleNavigate = () => navigate(ROUTES.BANNER.BANNER);
  
  const handleSubmit = async (values: BannerFormValues, { resetForm }: FormikHelpers<BannerFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditBanner({ bannerId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useBanner(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Banner`} parent="Banner" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Banner`}>
          <div className="input-items">
            <Formik<BannerFormValues> initialValues={initialValues} validationSchema={BannerSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="title" label="title" type="text" placeholder="Enter title" required />
                    </Col>
                    <Col md="6">
                      <SelectInput name="type" label="type" options={BannerStatus} required />
                    </Col>
                    <Col md="6">
                      <TextInput name="subTitle" label="sub Title" type="text" placeholder="Enter sub Title" />
                    </Col>
                    <Col md="6">
                      <TextInput name="cta" label="cta" type="text" placeholder="Enter cta" />
                    </Col>
                    <Col md="6">
                      <TextInput name="priority" label="Priority" type="number" placeholder="Enter priority" required />
                    </Col>
                    <Col>
                      <ImageUpload name="image" label="Image" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isBannerAdding || isBannerUpdating}>
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

export default AddEditBanner;
