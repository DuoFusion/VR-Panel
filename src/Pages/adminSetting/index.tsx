import { Button, Spin } from "antd";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ImageUpload, TextInput } from "../../attribute/formFields";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { AdminSettingFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { AdminSettingSchema } from "../../utils/ValidationSchemas";
import { useAppSelector } from "../../store/hooks";

const AdminSettingContainer = () => {
  const [isEditing, setIsEditing] = useState(false);

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
    emailPassword: AdminSetting?.emailPassword || "",
    senderEmail: AdminSetting?.senderEmail || "",
    whatsappKey: AdminSetting?.whatsappKey || "",
    whatsappUrl: AdminSetting?.whatsappUrl || "",
  };

  const handleSubmit = async (values: AdminSettingFormValues) => {
    const payload = buildPayload({ profileId: user?._id, ...values }, AdminSetting);
    useAdminSetting(payload, { onSuccess: () => setIsEditing(false) });
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
                {({ dirty }) => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="12" className="text-center input-box profile-image">
                        <ImageUpload name="profilePhoto" isListType="picture-circle" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="firstName" label="User first Name" type="text" placeholder="Enter first Name" disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="lastName" label="User last Name" type="text" placeholder="Enter last Name" disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="email" label="email" type="email" placeholder="Enter email" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required disabled={!isEditing} />
                      </Col>
                      <h2 className="text-center pt-4">Send Whatsapp Message</h2>
                      <Col md="6">
                        <TextInput name="whatsappKey" label="whatsapp Key" type="text" placeholder="Enter Whatsapp Key" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="whatsappUrl" label="whatsapp Url" type="text" placeholder="Enter Whatsapp Url" required disabled={!isEditing} />
                      </Col>
                      <h2 className="text-center pt-4">Send Mail</h2>
                      <Col md="6">
                        <TextInput name="senderEmail" label="Sender email" type="email" placeholder="Enter Sender email" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="emailPassword" label="email password" type="text" placeholder="Enter email password" required disabled={!isEditing} />
                      </Col>
                      <Col sm="12">
                        <div className="text-center mt-1">
                          {!isEditing ? (
                            <Button htmlType="button" type="primary" className="btn btn-primary" size="large" onClick={() => setIsEditing(true)}>
                              Edit
                            </Button>
                          ) : (
                            <>
                              <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isAdminSettingAdding} disabled={!dirty}>
                                Save
                              </Button>
                              <Button htmlType="button" className="btn btn-light ms-3" size="large" onClick={() => setIsEditing(false)}>
                                Cancel
                              </Button>
                            </>
                          )}
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
