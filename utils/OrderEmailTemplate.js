const orderEmailTemplate = (order) => {
  console.log("Generating email template for order:", order._id);
  
  
  const items = order.items || [];
  
  console.log("Order items count:", items.length);
  
  const itemsHtml = items
    .map((item) => {
      const name = item.name || "Product";
      const quantity = item.quantity || 1;
      const price = item.price || 0;
      return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${price.toFixed(2)}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(price * quantity).toFixed(2)}</td>
        </tr>
      `;
    })
    .join("");
  
  const total = order.total || order.subtotal || 0;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h2 { color: #2c3e50; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f8f9fa; padding: 12px; text-align: left; border: 1px solid #ddd; }
        .total-row { background-color: #f8f9fa; font-weight: bold; }
        .info-section { margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>🎉 Order Confirmation</h2>
        <p>Thank you for your order!</p>
        
        <div class="info-section">
          <strong>Order ID:</strong> ${order._id}<br>
          <strong>Order Date:</strong> ${new Date(order.createdAt || Date.now()).toLocaleString()}<br>
          <strong>Email:</strong> ${order.contactEmail}
        </div>
        
        <h3>Order Details</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th style="text-align: center;">Quantity</th>
              <th style="text-align: right;">Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="3" style="padding: 12px; text-align: right; border: 1px solid #ddd;">Order Total:</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #ddd;">$${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
        
        <div class="info-section">
          <h4>Shipping Address</h4>
          <p>
            ${order.shippingAddress?.firstName || ''} ${order.shippingAddress?.lastName || ''}<br>
            ${order.shippingAddress?.address || ''}<br>
            ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postalCode || ''}<br>
            ${order.shippingAddress?.country || ''}<br>
            Phone: ${order.shippingAddress?.phone || 'N/A'}
          </p>
        </div>
        
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          If you have any questions about your order, please contact us.
        </p>
      </div>
    </body>
    </html>
  `;
};

module.exports = orderEmailTemplate;
