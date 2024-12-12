
### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-api
```

2. Install dependencies:

```bash
npm install
```

3. Build and start:
```bash
npm start
```

### API Endpoints

## Users
- POST /users - Create user
- PUT /users/:emailId - Update user
- GET /users/:email - Get user

## Products
- POST /products - Create product
- PUT /products/:id - Update product
- GET /products/:id - Get product
- GET /products/total-stock - Get total stock

## Orders
- POST /orders - Create order
- PUT /orders/:id - Update order
- GET /orders/:id - Get order details
- GET /orders/recent - Get recent orders
- GET /orders/:userId/orders - Get user's orders
- GET /orders/product/:productId/users - Get product buyers

### Testing the API

1. Open index.html in a browser
2. Use the forms to interact with the API
3. View responses in the output sections