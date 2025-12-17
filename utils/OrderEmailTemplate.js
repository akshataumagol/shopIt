const orderEmailTemplate = (order) => {
  const itemsHtml = order.items
    .map((item) => {
      const name = item.name || "Product";
      const quantity = item.quantity || 1;
      const price = item.price || 0;

      return `
        <tr>
          <td>${name}</td>
          <td>${quantity}</td>
          <td>$${price}</td>
          <td>$${price * quantity}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: ${order._id}</p>

      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
        ${itemsHtml}
      </table>

      <h3>Total: $${order.total}</h3>
    </div>
  `;
};

module.exports = orderEmailTemplate;
