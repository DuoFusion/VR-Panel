import { Col } from "antd";
import { FormEvent, useEffect, useState } from "react";
import { Mutations, Queries } from "../../api";
import { Information } from "../../coreComponents";

const PaymentFailed = () => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const { mutate: usePaymentFailed, isPending: isPaymentFailedAdding } = Mutations.usePaymentFailed();
  const { data: PaymentFailed } = Queries.useGetPaymentFailed();
  const allPaymentFailedUs = PaymentFailed?.data;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      usePaymentFailed({ message: editorContent }, { onSuccess: () => setIsEditing(false) });
    } catch (error) {}
  };

  useEffect(() => {
    if (allPaymentFailedUs) {
      setEditorContent(allPaymentFailedUs?.message);
    }
  }, [allPaymentFailedUs]);

  return (
    <Col xl="12">
      <Information headerTitle="Payment Failed" loading={isPaymentFailedAdding} editorContent={editorContent} setEditorContent={setEditorContent} handleSubmit={handleSubmit} isEditing={isEditing} setIsEditing={setIsEditing} />
    </Col>
  );
};

export default PaymentFailed;
