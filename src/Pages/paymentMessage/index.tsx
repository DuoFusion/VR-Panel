import { Fragment } from "react";
import { Breadcrumbs } from "../../coreComponents";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

const PaymentMessageContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Payment Message" parent="Pages" />
      <PaymentSuccess />
      <PaymentFailed />
    </Fragment>
  );
};

export default PaymentMessageContainer;
