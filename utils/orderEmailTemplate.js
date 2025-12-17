const orderEmailTemplate = (order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price}</td>
        <td>$${item.price * item.quantity}</td>
      </tr>
    `
    )
    .join("");

  return `
    <h2>Order Confirmation</h2>
    <p>Order ID: ${order._id}</p>
    <p>Email: ${order.contactEmail}</p>

    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>Product</th>
        <th>Qty</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      ${itemsHtml}
    </table>

    <h3>Total: $${order.total}</h3>
  `;
};

module.exports = orderEmailTemplate;
