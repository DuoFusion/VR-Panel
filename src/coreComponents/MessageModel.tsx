import { Modal } from "antd";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, Key } from "react";
import { Col, Row } from "reactstrap";
import { Mutations } from "../api";
import { ImageUpload, TextInput } from "../attribute/formFields";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setMessageModal } from "../store/slices/LayoutSlice";
import { MessageFormValues } from "../types";
import { buildPayload } from "../utils/FormHelpers";
import { MessageSchema } from "../utils/ValidationSchemas";

const MessageModel: FC<{ userSelect: Key[]; queryKey: string; apiUrl: string }> = ({ userSelect, queryKey, apiUrl }) => {
  const { isMessageModal } = useAppSelector((store) => store.layout);

  const { mutate: useMessage, isPending: isMessageAdding } = Mutations.useMessage(queryKey, apiUrl);

  const dispatch = useAppDispatch();

  const initialValues = {
    message: "",
    imageUrl: [],
  };

  const handleSubmit = async (values: MessageFormValues, { resetForm }: FormikHelpers<MessageFormValues>) => {
    const payload = buildPayload(values, {});
    useMessage(
      { studentIds: userSelect, ...payload },
      {
        onSuccess: () => {
          resetForm();
          dispatch(setMessageModal());
        },
      }
    );
  };

  const onCloseModal = (resetForm: () => void) => {
    dispatch(setMessageModal());
    resetForm();
  };

  return (
    <Formik<MessageFormValues> initialValues={initialValues} validationSchema={MessageSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ handleSubmit, resetForm }) => (
        <Modal open={isMessageModal} title="Message" onOk={() => handleSubmit()} onCancel={() => onCloseModal(resetForm)} okButtonProps={{ loading: isMessageAdding }}>
          <div className="input-items">
            <Form>
              <Row className="gy-3">
                <Col md="12">
                  <TextInput name="message" label="Message" type="textarea" placeholder="Enter your message" />
                  {/* <QuillInput name="message" label="message" required /> */}
                </Col>
                <Col>
                  <ImageUpload name="imageUrl" label="Message Image" />
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
      )}
    </Formik>
  );
};

export default MessageModel;
