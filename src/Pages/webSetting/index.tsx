import { Button, Spin } from "antd";
import { Form, Formik } from "formik";
import { Facebook, Instagram, LinkCircle, Whatsapp } from "iconsax-react";
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
    email: WebSetting?.email || "",
    phoneNumber: WebSetting?.phoneNumber || 0,
    whatsappNumber: WebSetting?.whatsappNumber || 0,
    whatsappMessage: WebSetting?.whatsappMessage || "",
    razorpayKeyId: WebSetting?.razorpayKeyId || "",
    razorpayKeySecret: WebSetting?.razorpayKeySecret || "",
    address: WebSetting?.address || "",
    socialMedia: {
      instagram: WebSetting?.socialMedia?.instagram || "",
      facebook: WebSetting?.socialMedia?.facebook || "",
      whatsapp: WebSetting?.socialMedia?.whatsapp || "",
      linkedin: WebSetting?.socialMedia?.linkedin || "",
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
                        <TextInput name="email" label="email" type="email" placeholder="Enter email" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="whatsappNumber" label="whatsapp Number" type="number" placeholder="Enter whatsapp Number" required />
                      </Col>
                      <Col md="6">
                        <TextInput name="whatsappMessage" label="whatsapp Message" type="text" placeholder="Enter whatsapp Message" />
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
                        <TextInput name="socialMedia.whatsapp" label="whatsapp" type="text" placeholder="whatsapp Link" inputGroupIcon={<Whatsapp />} />
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
