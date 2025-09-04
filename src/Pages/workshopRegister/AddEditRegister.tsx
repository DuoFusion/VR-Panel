import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { WorkshopRegisterFormValues } from "../../types";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";
import { WorkshopRegisterSchema } from "../../utils/ValidationSchemas";
import { PaymentMethodStatus, PaymentStatus } from "../../data";

const AddEditWorkshopRegister = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: upEditWorkshop, isPending: isWorkshopUpdating } = Mutations.useEditWorkshopRegister();
  const { data: Workshop, isLoading: isWorkshopLoading } = Queries.useGetWorkshop({});
  const { data: CouponCode, isLoading: isCouponCodeLoading } = Queries.useGetCouponCode({});

  const handleNavigate = () => navigate(ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER);

  const initialValues: WorkshopRegisterFormValues = {
    workshopId: initialData?.workshopId?._id || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    profession: initialData?.profession || "",
    paymentStatus: initialData?.paymentStatus || "",
    fees: initialData?.fees || null,
    couponCodeId: initialData?.couponCodeId?._id || "",
    paymentMethod: initialData?.paymentMethod || "",
    transactionId: initialData?.transactionId || "",
  };

  const handleSubmit = async (values: WorkshopRegisterFormValues, { resetForm }: FormikHelpers<WorkshopRegisterFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditWorkshop({ workshopRegisterId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Workshop Register`} parent="Workshop" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Workshop Register`}>
          <div className="input-items">
            <Formik<WorkshopRegisterFormValues> initialValues={initialValues} validationSchema={WorkshopRegisterSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6" xl="4">
                      <SelectInput name="workshopId" label="workshop" placeholder="select an workshop" options={generateOptions(Workshop?.data?.workshop_data)} loading={isWorkshopLoading} required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="name" label="name" type="text" placeholder="Enter name" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="email" label="email" type="email" placeholder="Enter email" />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="phoneNumber" label="phone Number" type="number" placeholder="Enter phone Number" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="city" label="city" type="text" placeholder="Enter city" />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="profession" label="profession" type="text" placeholder="Enter profession" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="paymentStatus" label="payment Status" placeholder="select an paymentStatus" options={PaymentStatus} required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="fees" label="fees" type="number" placeholder="Enter fees" />
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="couponCodeId" label="CouponCode" placeholder="select an CouponCode" options={generateOptions(CouponCode?.data?.coupon_data)} loading={isCouponCodeLoading} />
                    </Col>
                    <Col md="6">
                      <SelectInput name="paymentMethod" label="payment Method" placeholder="select an payment Method" options={PaymentMethodStatus}/>
                    </Col>
                    <Col md="6">
                      <TextInput name="transactionId" label="transactionId" type="text" placeholder="Enter transactionId" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isWorkshopUpdating}>
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

export default AddEditWorkshopRegister;
