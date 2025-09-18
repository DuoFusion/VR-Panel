import { Col } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { Mutations, Queries } from "../../api";
import { Information } from "../../coreComponents";

const PaymentSuccess = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: usePaymentSuccess, isPending: isPaymentSuccessAdding } = Mutations.usePaymentSuccess();
  const { data: PaymentSuccess } = Queries.useGetPaymentSuccess();
  const allPaymentSuccessUs = PaymentSuccess?.data;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      usePaymentSuccess({ message: editorContent }, { onSuccess: () => setIsEditing(false) });
    } catch (error) {}
  };

  useEffect(() => {
    if (allPaymentSuccessUs) {
      setEditorContent(allPaymentSuccessUs?.message);
    }
  }, [allPaymentSuccessUs]);

  return (
    <Col xl="12">
      <Information headerTitle="Payment Success" loading={isPaymentSuccessAdding} editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
    </Col>
  );
};

export default PaymentSuccess;
