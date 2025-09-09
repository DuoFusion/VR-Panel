import { Button, Spin } from "antd";
import { Form, Formik } from "formik";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ImageUpload, TextInput } from "../../attribute/formFields";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { AdminSettingFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { AdminSettingSchema } from "../../utils/ValidationSchemas";
import { useAppSelector } from "../../store/hooks";

const AdminSettingContainer = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { mutate: useAdminSetting, isPending: isAdminSettingAdding } = Mutations.useAdminSetting();
  const { data, isLoading: isAdminSettingLoading } = Queries.useGetAdminSetting(user?._id || "");
  const AdminSetting = data?.data;

  const initialValues: AdminSettingFormValues = {
    firstName: AdminSetting?.firstName || "",
    lastName: AdminSetting?.lastName || "",
    email: AdminSetting?.email || "",
    phoneNumber: AdminSetting?.phoneNumber || 0,
    profilePhoto: AdminSetting?.profilePhoto ? [AdminSetting?.profilePhoto] : [],
  };

  const handleSubmit = async (values: AdminSettingFormValues) => {
    const payload = buildPayload({ profileId: user?._id, ...values }, AdminSetting);
    useAdminSetting(payload);
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Admin Setting" parent="Pages" />
      <Container fluid>
        <CardWrapper title="Admin Setting">
          <div className="input-items">
            {isAdminSettingLoading ? (
              <div className="d-flex justify-content-center ">
                <Spin />
              </div>
            ) : (
              <Formik<AdminSettingFormValues> initialValues={initialValues} validationSchema={AdminSettingSchema} onSubmit={handleSubmit} enableReinitialize>
                {() => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="12" className="text-center input-box profile-image">
                        <ImageUpload name="profilePhoto" isListType="picture-circle" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="firstName" label="User first Name" type="text" placeholder="Enter first Name" />
                      </Col>
                      <Col md="6">
                        <TextInput name="lastName" label="User last Name" type="text" placeholder="Enter last Name" />
                      </Col>
                      <Col md="6">
                        <TextInput name="email" label="email" type="email" placeholder="Enter email" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required />
                      </Col>
                      <Col sm="12">
                        <div className="text-center mt-1">
                          <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isAdminSettingAdding}>
                            Save
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </CardWrapper>
      </Container>
    </Fragment>
  );
};

export default AdminSettingContainer;
