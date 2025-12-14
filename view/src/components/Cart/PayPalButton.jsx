/*import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AcsuQ_HNYwe4LQnqMsCVWz5-qkIEEBu-T8_pQu1A0pTrVOwszRy2USrOkGoJjVNKxNhZJZhiE-vaUV9l",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value:amount
                }
              }
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
*/
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess, onError }) {
  return (
    <PayPalScriptProvider
      options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount.toFixed(2) },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          onSuccess(details);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
}
