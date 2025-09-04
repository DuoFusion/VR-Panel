import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CoursesRegisterFormValues } from "../../types";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";
import { CoursesRegisterSchema } from "../../utils/ValidationSchemas";
import { PaymentMethodStatus, PaymentStatus } from "../../data";

const AddEditCoursesRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: upEditCoursesRegister, isPending: isCoursesRegisterUpdating } = Mutations.useEditCoursesRegister();

  const { data: Courses, isLoading: isCoursesLoading } = Queries.useGetCourses({});
  const { data: CouponCode, isLoading: isCouponCodeLoading } = Queries.useGetCouponCode({});

  const initialValues: CoursesRegisterFormValues = {
    fullName: initialData?.fullName || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    paymentMethod: initialData?.paymentMethod || "",
    transactionId: initialData?.transactionId || "",
    paymentStatus: initialData?.paymentStatus || "",
    courseId: initialData?.courseId?._id || "",
    couponCodeId: initialData?.couponCodeId?._id || "",
    profession: initialData?.profession || "",
    fees: initialData?.fees || null,
  };

  const handleNavigate = () => navigate(ROUTES.COURSES_REGISTER.COURSES_REGISTER);

  const handleSubmit = async (values: CoursesRegisterFormValues, { resetForm }: FormikHelpers<CoursesRegisterFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditCoursesRegister({ courseRegisterId: state?.editData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } 
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Courses Register`} parent="Courses" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Courses Register`}>
          <div className="input-items">
            <Formik<CoursesRegisterFormValues> initialValues={initialValues} validationSchema={CoursesRegisterSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <TextInput name="fullName" label="full Name" type="text" placeholder="Enter course full Name" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="email" label="email" type="text" placeholder="Enter course email" />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="phoneNumber" label="phoneNumber" type="text" placeholder="Enter course phoneNumber" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="city" label="city" type="text" placeholder="Enter city" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="paymentMethod" label="payment Method" placeholder="select an payment Method" options={PaymentMethodStatus} required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="transactionId" label="transactionId" type="number" placeholder="Enter transactionId" required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="paymentStatus" label="payment Status" placeholder="select an paymentStatus" options={PaymentStatus} required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="courseId" label="courseId" placeholder="Select courseId" options={generateOptions(Courses?.data?.course_data)} loading={isCoursesLoading} required />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="couponCodeId" label="couponCodeId" placeholder="Select couponCodeId" options={generateOptions(CouponCode?.data?.coupon_data)} loading={isCouponCodeLoading} />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="profession" label="profession" type="text" placeholder="Enter profession" />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="fees" label="fees" type="number" placeholder="Enter fees" />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isCoursesRegisterUpdating}>
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

export default AddEditCoursesRegister;
