import { Button, Spin } from "antd";
import { Form, Formik } from "formik";
import { Facebook, Instagram, LinkCircle, Xrp, Youtube } from "iconsax-react";
import { Fragment, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { ImageUpload, TextInput } from "../../attribute/formFields";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WebSettingFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { WebSettingSchema } from "../../utils/ValidationSchemas";

const WebSettingContainer = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: useWebSetting, isPending: isWebSettingAdding } = Mutations.useWebSetting();

  const { data, isLoading: isWebSettingLoading } = Queries.useGetWebSetting();
  const WebSetting = data?.data;

  const initialValues: WebSettingFormValues = {
    name: WebSetting?.name || "",
    email: WebSetting?.email || "",
    phoneNumber: WebSetting?.phoneNumber || 0,
    razorpayKeyId: WebSetting?.razorpayKeyId || "",
    razorpayKeySecret: WebSetting?.razorpayKeySecret || "",
    ourStudent: WebSetting?.ourStudent || "",
    rating: WebSetting?.rating || "",
    address: WebSetting?.address || "",
    instructorName: WebSetting?.instructorName || "",
    instructorAbout: WebSetting?.instructorAbout || "",
    instructorImage: WebSetting?.instructorImage ? [WebSetting.instructorImage] : [],
    shortDescription: WebSetting?.shortDescription || "",
    socialMedia: {
      instagram: WebSetting?.socialMedia?.instagram || "",
      facebook: WebSetting?.socialMedia?.facebook || "",
      youtube: WebSetting?.socialMedia?.youtube || "",
      linkedin: WebSetting?.socialMedia?.linkedin || "",
      twitter: WebSetting?.socialMedia?.twitter || "",
    },
  };

  const handleSubmit = async (values: WebSettingFormValues) => {
    const payload = buildPayload(values, WebSetting);
    useWebSetting(payload, { onSuccess: () => setIsEditing(false) });
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Web Setting" parent="Pages" />
      <Container fluid>
        <CardWrapper title="Web Setting" bodyProps={{ className: "d-flex justify-content-center " }}>
          <div className="input-items">
            {isWebSettingLoading ? (
              <Spin />
            ) : (
              <Formik<WebSettingFormValues> initialValues={initialValues} validationSchema={WebSettingSchema} onSubmit={handleSubmit} enableReinitialize>
                {({ dirty }) => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="6">
                        <TextInput name="name" label="User Name" type="text" placeholder="Enter User Name" disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="email" label="email" type="email" placeholder="Enter email" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.instagram" label="Instagram" type="text" placeholder="Instagram Link" inputGroupIcon={<Instagram />} disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.facebook" label="Facebook" type="text" placeholder="Facebook Link" inputGroupIcon={<Facebook />} disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.linkedin" label="linkedin" type="text" placeholder="linkedin Link" inputGroupIcon={<LinkCircle />} disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.youtube" label="youtube" type="text" placeholder="youtube Link" inputGroupIcon={<Youtube />} disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.twitter" label="twitter" type="text" placeholder="twitter Link" inputGroupIcon={<Xrp />} disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="ourStudent" label="our Student" type="text" placeholder="Enter ourStudent" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="rating" label="Web Rating" type="text" placeholder="Enter Your Web Rating" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="razorpayKeyId" label="razorpay Key Id" type="text" placeholder="Enter razorpay Key Id" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="razorpayKeySecret" label="razorpay Key Secret" type="text" placeholder="Enter razorpay Key Secret" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="address" label="address" type="textarea" placeholder="Enter address" required disabled={!isEditing} />
                      </Col>
                      <Col md="6">
                        <TextInput name="shortDescription" label="Web short Description" type="textarea" placeholder="Enter short Description" required disabled={!isEditing} />
                      </Col>
                      <h2>Instructor</h2>
                      <Col md="12">
                        <TextInput name="instructorName" label="Instructor Name" type="text" placeholder="Enter instructor name" required disabled={!isEditing} />
                      </Col>
                      <Col md="12">
                        <TextInput name="instructorAbout" label="Instructor About" type="textarea" placeholder="Enter instructor About" required disabled={!isEditing} />
                      </Col>
                      <Col>
                        <ImageUpload name="instructorImage" label="Instructor Image" required disabled={!isEditing} />
                      </Col>
                      <Col sm="12">
                        <div className="text-center mt-1">
                          {!isEditing ? (
                            <Button htmlType="button" type="primary" className="btn btn-primary" size="large" onClick={() => setIsEditing(true)}>
                              Edit
                            </Button>
                          ) : (
                            <>
                              <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isWebSettingAdding} disabled={!dirty}>
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

export default WebSettingContainer;
