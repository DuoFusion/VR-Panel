import { Modal } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, Key } from "react";
import { Col, Row } from "reactstrap";
import { Mutations } from "../api";
import { QuillInput, TextInput } from "../attribute/formFields";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setEmailMessageModal } from "../store/slices/LayoutSlice";
import { EmailMessageFormValues } from "../types";
import { buildPayload } from "../utils/FormHelpers";
import { EmailMessageSchema } from "../utils/ValidationSchemas";

const EmailMessageModel: FC<{ userSelect: Key[]; queryKey: string; apiUrl: string }> = ({ userSelect, queryKey, apiUrl }) => {
  const { isEmailMessageModal } = useAppSelector((store) => store.layout);

  const { mutate: useEmailMessage, isPending: isEmailMessageAdding } = Mutations.useEmailMessage(queryKey, apiUrl);

  const dispatch = useAppDispatch();

  const initialValues = {
    subject: "",
    message: "",
  };

  const handleSubmit = async (values: EmailMessageFormValues, { resetForm }: FormikHelpers<EmailMessageFormValues>) => {
    const payload = buildPayload(values, {});
    useEmailMessage(
      { to: userSelect,...payload },
      {
        onSuccess: () => {
          resetForm();
          dispatch(setEmailMessageModal());
        },
      }
    );
  };

  const onCloseModal = (resetForm: () => void) => {
    dispatch(setEmailMessageModal());
    resetForm();
  };

  return (
    <Formik<EmailMessageFormValues> initialValues={initialValues} validationSchema={EmailMessageSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ handleSubmit, resetForm }) => (
        <Modal open={isEmailMessageModal} title="Message" onOk={() => handleSubmit()} onCancel={() => onCloseModal(resetForm)} okButtonProps={{ loading: isEmailMessageAdding }}>
          <div className="input-items">
            <Form>
              <Row className="gy-3">
                <Col md="12">
                  <TextInput name="subject" label="subject" type="text" placeholder="Enter your Email subject" />
                </Col>
                <Col md="12">
                  <QuillInput name="message" label="message" required />
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      )}
    </Formik>
  );
};

export default EmailMessageModel;
