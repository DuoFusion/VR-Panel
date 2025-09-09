import { Button, Spin } from "antd";
import { Form, Formik } from "formik";
import { Facebook, Instagram, LinkCircle, Xrp, Youtube } from "iconsax-react";
import { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { TextInput } from "../../attribute/formFields";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WebSettingFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { WebSettingSchema } from "../../utils/ValidationSchemas";

const WebSettingContainer = () => {
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
    useWebSetting(payload);
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Web Setting" parent="Pages" />
      <Container fluid>
        <CardWrapper title="Web Setting" bodyProps={{ className: "d-flex justify-content-center " }}>
          <div className="input-items">
            {isWebSettingAdding || isWebSettingLoading ? (
              <Spin />
            ) : (
              <Formik<WebSettingFormValues> initialValues={initialValues} validationSchema={WebSettingSchema} onSubmit={handleSubmit} enableReinitialize>
                {() => (
                  <Form>
                    <Row className="gy-3">
                      <Col md="6">
                        <TextInput name="name" label="User Name" type="text" placeholder="Enter User Name" />
                      </Col>
                      <Col md="6">
                        <TextInput name="email" label="email" type="email" placeholder="Enter email" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.instagram" label="Instagram" type="text" placeholder="Instagram Link" inputGroupIcon={<Instagram />} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.facebook" label="Facebook" type="text" placeholder="Facebook Link" inputGroupIcon={<Facebook />} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.linkedin" label="linkedin" type="text" placeholder="linkedin Link" inputGroupIcon={<LinkCircle />} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.youtube" label="youtube" type="text" placeholder="youtube Link" inputGroupIcon={<Youtube />} />
                      </Col>
                      <Col md="6">
                        <TextInput name="socialMedia.twitter" label="twitter" type="text" placeholder="twitter Link" inputGroupIcon={<Xrp />} />
                      </Col>
                      <Col md="6">
                        <TextInput name="ourStudent" label="our Student" type="text" placeholder="Enter ourStudent" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="rating" label="Web Rating" type="text" placeholder="Enter Your Web Rating" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="razorpayKeyId" label="razorpay Key Id" type="text" placeholder="Enter razorpay Key Id" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="razorpayKeySecret" label="razorpay Key Secret" type="text" placeholder="Enter razorpay Key Secret" required />
                      </Col>
                      <Col md="12">
                        <TextInput name="address" label="address" type="textarea" placeholder="Enter address" required />
                      </Col>
                      <Col sm="12">
                        <div className="text-center mt-1">
                          <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isWebSettingAdding}>
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

export default WebSettingContainer;
