import { Button } from "antd";
import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { Mutations } from "../api";
import { ROUTES } from "../constants";
import { TextInput } from "../attribute/formFields";
import { useAppDispatch } from "../store/hooks";
import { loginSuccess } from "../store/slices/AuthSlice";
import { LoginPayload } from "../types";
import { LoginSchema } from "../utils/ValidationSchemas";

const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate: Login, isPending } = Mutations.useLogin();

  const handleSubmit = async (values: LoginPayload) => {
    Login(values, {
      onSuccess: (response) => {
        dispatch(loginSuccess(response?.data));
        navigate(ROUTES.DASHBOARD);
      },
    });
  };

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div className="login-main">
              <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
                {() => (
                  <Form>
                    <h3>Login</h3>
                    <p>Enter your Email Id & Password to login</p>

                    <TextInput label="email address" name="email" type="email" placeholder="rarex49098@firain.com" />
                    <TextInput name="password" label="password" type="password" placeholder=" * * * * * * * * * " />

                    <div className="checkbox p-0">
                      <Link to={ROUTES.FORGOT_PASSWORD}>Forgot Password</Link>
                    </div>

                    <div className="text-end mt-3">
                      <Button htmlType="submit" type="primary" block className="btn btn-primary" size="large" loading={isPending}>
                        Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginContainer;
