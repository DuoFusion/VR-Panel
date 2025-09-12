import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations, Queries } from "../../api";
import { SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { GenderStatus, PaymentStatus } from "../../data";
import { WorkshopRegisterFormValues } from "../../types";
import { generateOptions } from "../../utils";
import { buildPayload } from "../../utils/FormHelpers";
import { WorkshopRegisterSchema } from "../../utils/ValidationSchemas";

const AddEditWorkshopRegister = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: upEditWorkshop, isPending: isWorkshopUpdating } = Mutations.useEditWorkshopRegister();
  const { data: Workshop, isLoading: isWorkshopLoading } = Queries.useGetWorkshop({});

  const handleNavigate = () => navigate(ROUTES.WORKSHOP_REGISTER.WORKSHOP_REGISTER);

  const initialValues: WorkshopRegisterFormValues = {
    workshopId: initialData?.workshopId?._id || "",
    name: initialData?.name || "",
    email: initialData?.email || "",
    gender: initialData?.gender || "",
    standard: initialData?.standard || "",
    schoolName: initialData?.schoolName || "",
    // phoneNumber: initialData?.phoneNumber || "",
    city: initialData?.city || "",
    whatsAppNumber: initialData?.whatsAppNumber || "",
    // profession: initialData?.profession || "",
    previousPercentage: initialData?.previousPercentage || "",
    targetPercentage: initialData?.targetPercentage || "",
    goal: initialData?.goal || "",
    paymentStatus: initialData?.paymentStatus || "",
    fees: initialData?.fees || null,
    // paymentMethod: initialData?.paymentMethod || "",
    razorpayPaymentId: initialData?.razorpayPaymentId || "",
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
                      <TextInput name="email" label="email" type="email" placeholder="Enter email" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="whatsAppNumber" label="whatsApp Number" type="number" placeholder="Enter whatsApp Number" required />
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="city" label="city" type="text" placeholder="Enter city" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <SelectInput name="gender" label="gender" placeholder="select an gender" options={GenderStatus} required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="standard" label="standard" type="text" placeholder="Enter Your standard" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="schoolName" label="school Name" type="text" placeholder="Enter Your school Name" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="previousPercentage" label="previous Percentage" type="number" placeholder="Enter previous Percentage" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="targetPercentage" label="target Percentage" type="number" placeholder="Enter target Percentage" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="goal" label="goal" type="text" placeholder="Enter goal" required/>
                    </Col>
                    <Col md="6" xl="4">
                      <TextInput name="fees" label="fees" type="number" placeholder="Enter fees" required/>
                    </Col>
                    <Col md="6">
                      <SelectInput name="paymentStatus" label="payment Status" placeholder="select an paymentStatus" options={PaymentStatus} required/>
                    </Col>
                    <Col md="6">
                      <TextInput name="razorpayPaymentId" label="razorpay Payment Id" type="text" placeholder="Enter razorpay Payment Id" required />
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
