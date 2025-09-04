import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../../api";
import { DataAndTime, SelectInput, TextInput } from "../../attribute/formFields";
import { ROUTES } from "../../constants";
import { Breadcrumbs, CardWrapper } from "../../coreComponents";
import { CouponCodeFormValues } from "../../types";
import { buildPayload } from "../../utils/FormHelpers";
import { CouponCodeSchema } from "../../utils/ValidationSchemas";
import { DiscountTypeStatus } from "../../data";

const AddEditCouponCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const initialData = state?.editData;

  const { mutate: useCouponCode, isPending: isCouponCodeAdding } = Mutations.useCouponCode();
  const { mutate: upEditCouponCode, isPending: isCouponCodeUpdating } = Mutations.useEditCouponCode();

  const initialValues: CouponCodeFormValues = {
    name: initialData?.name || "",
    code: initialData?.code || "",
    description: initialData?.description || "",
    discount: initialData?.discount || null,
    discountType: initialData?.discountType || "",
    endDate: initialData?.endDate || "",
    startDate: initialData?.startDate || "",
    numberOfUses: initialData?.numberOfUses || null,
  };

  const handleNavigate = () => navigate(ROUTES.COUPON_CODE.COUPON_CODE);

  const handleSubmit = async (values: CouponCodeFormValues, { resetForm }: FormikHelpers<CouponCodeFormValues>) => {
    const payload = buildPayload(values, initialData);

    const onSuccessHandler = () => {
      resetForm();
      handleNavigate();
    };

    if (state?.edit) {
      upEditCouponCode({ couponId: initialData?._id, ...payload }, { onSuccess: () => onSuccessHandler() });
    } else {
      useCouponCode(payload, { onSuccess: () => onSuccessHandler() });
    }
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${state?.edit ? "Edit" : "Add"} Coupon Code`} parent="Coupon Code" />
      <Container fluid>
        <CardWrapper title={`${state?.edit ? "Edit" : "Add"} Coupon Code`}>
          <div className="input-items">
            <Formik<CouponCodeFormValues> initialValues={initialValues} validationSchema={CouponCodeSchema} onSubmit={handleSubmit} enableReinitialize>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="name" label="name" type="text" placeholder="Enter name" required />
                    </Col>
                    <Col md="6">
                      <TextInput name="code" label="code" type="text" placeholder="Enter code" required />
                    </Col>
                    <Col md="6">
                      <SelectInput name="discountType" label="discount type" options={DiscountTypeStatus} required />
                    </Col>
                    <Col md="6">
                      <TextInput name="discount" label="Discount" type="number" placeholder="Enter Discount" required />
                    </Col>
                    <Col md="6">
                      <DataAndTime name="startDate" type="date" label="start Date" format="DD/MM/YYYY" placeholder="start Date" disablePast />
                    </Col>
                    <Col md="6">
                      <DataAndTime name="endDate" type="date" label="end Date" format="DD/MM/YYYY" placeholder="end Date" disablePast />
                    </Col>
                    <Col md="12">
                      <TextInput name="numberOfUses" label="Number of Uses" type="number" placeholder="Enter Number of Uses" />
                    </Col>
                    <Col md="12">
                      <TextInput name="description" label="Description" type="textarea" placeholder="Enter Description" required />
                    </Col>
                    <Col sm="12">
                      <div className="text-center mt-1">
                        <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isCouponCodeAdding || isCouponCodeUpdating}>
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

export default AddEditCouponCode;
