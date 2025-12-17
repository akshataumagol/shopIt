/*const fetch = require('node-fetch');

const getAccessToken = async () => {
  const client = process.env.REACT_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const auth = Buffer.from(`${client}:${secret}`).toString('base64');
  const res = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials'
  });
  const data = await res.json();
  return data.access_token;
};

const createOrder = async (total, currency = 'USD') => {
  const token = await getAccessToken();
  const res = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ intent: 'CAPTURE', purchase_units: [{ amount: { currency_code: currency, value: String(total) } }] })
  });
  return res.json();
};

const captureOrder = async (orderId) => {
  const token = await getAccessToken();
  const res = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  return res.json();
};

module.exports = { createOrder, captureOrder };*/
const axios = require("axios");

const PAYPAL_BASE_URL = "https://api-m.sandbox.paypal.com";

// Get PayPal access token
const getAccessToken = async () => {
  const client = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!client || !secret) {
    throw new Error("PayPal credentials are missing");
  }

  const auth = Buffer.from(`${client}:${secret}`).toString("base64");

  const res = await axios.post(
    `${PAYPAL_BASE_URL}/v1/oauth2/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 10000,
    }
  );

  return res.data.access_token;
};

// Create PayPal order
const createOrder = async (total, currency = "USD") => {
  const token = await getAccessToken();

  const res = await axios.post(
    `${PAYPAL_BASE_URL}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: total.toFixed(2),
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }
  );

  return res.data;
};

// Capture PayPal order
const captureOrder = async (orderId) => {
  const token = await getAccessToken();

  const res = await axios.post(
    `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }
  );

  return res.data;
};

module.exports = {
  createOrder,
  captureOrder,
};

