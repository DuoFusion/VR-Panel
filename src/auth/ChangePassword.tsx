import { Button } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { Fragment } from "react/jsx-runtime";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../api";
import { CardWrapper } from "../coreComponents";
import { TextInput } from "../attribute/formFields";
import { ChangePasswordPayload } from "../types";
import { useAppSelector } from "../store/hooks";
import { ChangePasswordSchema } from "../utils/ValidationSchemas";
import { Breadcrumbs } from "../coreComponents";

const ChangePasswordContainer = () => {
  const { mutate: ChangePassword, isPending } = Mutations.useChangePassword();
  const { user } = useAppSelector((store) => store.auth);

  const handleSubmit = async (values: ChangePasswordPayload, { resetForm }: FormikHelpers<ChangePasswordPayload>) => {
    ChangePassword(
      {
        email: user?.email,
        ...values,
      },
      {
        onSuccess: () => resetForm(),
      }
    );
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Change Password" parent="Pages" />
      <Container fluid>
        <CardWrapper title="Change Password">
          <div className="input-items">
            <Formik initialValues={{ password: "", confirmPassword: "" }} validationSchema={ChangePasswordSchema} onSubmit={handleSubmit}>
              {() => (
                <Form>
                  <Row className="gy-3">
                    <Col md="6">
                      <TextInput name="password" label="New Password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col md="6">
                      <TextInput name="confirmPassword" label="Confirm Password" type="password" placeholder=" * * * * * * * * * " required />
                    </Col>
                    <Col sm="12" className="text-center">
                      <Button htmlType="submit" type="primary" className="btn btn-primary" size="large" loading={isPending}>
                        Save
                      </Button>
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

export default ChangePasswordContainer;
