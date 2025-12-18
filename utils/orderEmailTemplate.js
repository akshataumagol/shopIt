// utils/orderEmailTemplate.js
const orderEmailTemplate = (order) => {
  const itemsHtml = order.items
    .map((item) => {
      const name = item.name || "Product";
      const quantity = item.quantity || 1;
      const price = item.price || 0;
      return `
        <tr>
          <td style="border:1px solid #ddd;padding:8px;">${name}</td>
          <td style="border:1px solid #ddd;padding:8px;">${quantity}</td>
          <td style="border:1px solid #ddd;padding:8px;">₹${price}</td>
          <td style="border:1px solid #ddd;padding:8px;">₹${(price * quantity).toFixed(2)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family:Arial;max-width:600px;margin:auto;">
      <h2>Your Order Confirm</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Email:</strong> ${order.contactEmail}</p>
      <table width="100%" style="border-collapse:collapse;margin-top:20px;">
        <thead>
          <tr style="background:#f2f2f2;">
            <th style="border:1px solid #ddd;padding:8px;">Product</th>
            <th style="border:1px solid #ddd;padding:8px;">Qty</th>
            <th style="border:1px solid #ddd;padding:8px;">Price</th>
            <th style="border:1px solid #ddd;padding:8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3 style="text-align:right;margin-top:20px;">
        Grand Total: ₹${order.total}
      </h3>
    </div>
  `;
};

module.exports = orderEmailTemplate;
