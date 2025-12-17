const orderEmailTemplate = (order) => {
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="border:1px solid #ddd;padding:8px;">${item.name || 'Product'}</td>
        <td style="border:1px solid #ddd;padding:8px;">${item.quantity || 1}</td>
        <td style="border:1px solid #ddd;padding:8px;">$${(item.price || 0).toFixed(2)}</td>
        <td style="border:1px solid #ddd;padding:8px;">$${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
      </tr>
    `
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div style="font-family:Arial;max-width:600px;margin:auto;padding:20px;">
        <h2 style="color:#2c3e50;">🎉 Order Confirmation</h2>
        <p>Thank you for your order!</p>
        
        <div style="background:#f8f9fa;padding:15px;border-radius:5px;margin:20px 0;">
          <p style="margin:5px 0;"><strong>Order ID:</strong> ${order._id}</p>
          <p style="margin:5px 0;"><strong>Email:</strong> ${order.contactEmail}</p>
          <p style="margin:5px 0;"><strong>Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleString()}</p>
        </div>

        <h3>Order Details</h3>
        <table width="100%" style="border-collapse:collapse;margin-top:20px;">
          <thead>
            <tr style="background:#f2f2f2;">
              <th style="border:1px solid #ddd;padding:8px;text-align:left;">Product</th>
              <th style="border:1px solid #ddd;padding:8px;text-align:center;">Qty</th>
              <th style="border:1px solid #ddd;padding:8px;text-align:right;">Price</th>
              <th style="border:1px solid #ddd;padding:8px;text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <h3 style="text-align:right;margin-top:20px;">
          Grand Total: $${(order.total || 0).toFixed(2)}
        </h3>

        <div style="background:#f8f9fa;padding:15px;border-radius:5px;margin:20px 0;">
          <h4 style="margin-top:0;">Shipping Address</h4>
          <p style="margin:5px 0;">
            ${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}<br>
            ${order.shippingAddress?.address || ''}<br>
            ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}<br>
            ${order.shippingAddress?.country || ''}<br>
            <strong>Phone:</strong> ${order.shippingAddress?.phone || 'N/A'}
          </p>
        </div>

        <p style="color:#666;font-size:14px;margin-top:30px;">
          If you have any questions about your order, please contact us at ${process.env.GMAIL_USER || 'support@shopit.com'}
        </p>
      </div>
    </body>
    </html>
  `;
};

module.exports = orderEmailTemplate;
