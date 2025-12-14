# Ecommerce Backend (Express + MongoDB)

Quick start:

1. Copy `.env.example` to `.env` and fill values (Mongo URI, JWT secret, PayPal keys).
2. Install dependencies:

```powershell
cd "c:\Users\Admin\Desktop\cosmic\shopIT\ecommnerce backend"
npm install
```

3. Run in development (nodemon):

```powershell
npm run dev
```

API highlights:
- Authentication: `POST /api/auth/register`, `POST /api/auth/login`
- Products: `GET /api/products`, `GET /api/products/:id` (admin create/update/delete)
- Cart: authenticated endpoints under `/api/cart`
- Orders: create `/api/orders` (creates server order + Paypal order), capture `/api/orders/paypal/capture/:orderId`
- Admin: manage categories and list users under `/api/admin` (admin-only)

Notes:
- PayPal helper uses sandbox endpoints; set `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` in `.env`.
- Images uploaded via `multipart/form-data` are stored in `uploads/` (local disk). For production, swap to S3 or similar.
