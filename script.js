const apiBase = "http://localhost:3000"; // Replace with your API base URL

// Helper to show output
const showOutput = (selector, data) => {
  const outputElement = document.getElementById(selector);
  if (outputElement) {
    if (typeof data === 'string') {
      outputElement.innerText = data;
    } else {
      outputElement.innerText = JSON.stringify(data, null, 2);
    }
  } else {
    console.error(`Element with selector "${selector}" not found.`);
  }
};

// Create User
document.getElementById("createUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  const phone = document.getElementById("userPhone").value;

  try {
    const response = await fetch(`${apiBase}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    showOutput("createUserOutput", `Name: ${data.name} Email: ${data.email} Phone: ${data.phone}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("createUserOutput", `Error: ${error.message}`);
  }
});

// Update User
document.getElementById("updateUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailId = document.getElementById("updateemailId").value;
  const name = document.getElementById("updateUserName").value;
  const email = document.getElementById("updateUserEmail").value;
  const phone = document.getElementById("updateUserPhone").value;

  try {
    const response = await fetch(`${apiBase}/users/${emailId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("Response Data:", data); // Log the response data
    showOutput("updateUserOutput", `Name: ${data.name} Email: ${data.email} Phone: ${data.phone}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("updateUserOutput", `Error: ${error.message}`);
  }

});

// Get User
document.getElementById("getUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("getemailId").value;

  const response = await fetch(`${apiBase}/users/${email}`);
  const data = await response.json();
 // console.log(data);

  const formattedData = `Name: ${data.name} Email: ${data.email} Phone: ${data.phone}`;
  showOutput("getUserOutput", formattedData);

});


// Create Product
document.getElementById("createProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("productName").value;
  const category = document.getElementById("productCategory").value;
  const price = +document.getElementById("productPrice").value;
  const stock = +document.getElementById("productStock").value;

  try {
    const response = await fetch(`${apiBase}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, price, stock }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    showOutput("createProductOutput", `Product created successfully with ID: ${data.productId}, please remember the product ID`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("createProductOutput", `Error: ${error.message}`);
  }
});

// Update Product
document.getElementById("updateProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateProductId").value;
  const name = document.getElementById("updateProductName").value;
  const category = document.getElementById("updateProductCategory").value;
  const price = +document.getElementById("updateProductPrice").value;
  const stock = +document.getElementById("updateProductStock").value;

  try {
    const response = await fetch(`${apiBase}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, price, stock }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    showOutput("updateProductOutput", `Product Updated successfully Name: ${data.name} Category: ${data.category} Price: ${data.price} Stock: ${data.stock}`);
  } catch (error) {
    //console.error("Error:", error); // Log any errors
    showOutput("updateProductOutput", `Error: ${error.message}`);
  }
});

// Get Product
document.getElementById("getProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("getProductId").value;

  try {
    const response = await fetch(`${apiBase}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    showOutput("getProductOutput", `Name: ${data.name} Category: ${data.category} Price: ${data.price} Stock: ${data.stock}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("getProductOutput", `Error: ${error.message}`);
  }
});


// Create Order
document.getElementById("createOrderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("orderUserId").value;
  const productId = +document.getElementById("orderProductId").value;
  const quantity = +document.getElementById("orderQuantity").value;

  try {
    const response = await fetch(`${apiBase}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId, quantity }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); 
    showOutput("createOrderOutput", `Order created successfully with ID: ${data}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("createOrderOutput", `Error: ${error.message}`);
  }
});

// Update Order
document.getElementById("updateOrderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateOrderId").value;
  const quantity = +document.getElementById("updateOrderQuantity").value;

  try {
    const response = await fetch(`${apiBase}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    showOutput("updateOrderOutput", `Order updated successfully: with ProductID: ${data.productId} New Quantity: ${data.quantity}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("updateOrderOutput", `Error: ${error.message}`);
  }
});

// Get Order
document.getElementById("getOrderForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("getOrderId").value;

  try {
    const response = await fetch(`${apiBase}/orders/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data
    const { productId, userId, quantity } = data;
    showOutput("getOrderOutput", `Product ID: ${productId}, User ID: ${userId}, Quantity: ${quantity}`);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("getOrderOutput", `Error: ${error.message}`);
  }
});


// Get Recent Orders
document.getElementById("getRecentOrders").addEventListener("click", async () => {
  try {
    const response = await fetch(`${apiBase}/orders/recent`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data

    const formattedData = data.map(order => {
      return `Product: ${order.product.name}, User: ${order.user.email}, Quantity: ${order.quantity}, Order Date: ${new Date(order.orderDate).toLocaleString()}`;
    }).join("\n");

    showOutput("recentOrdersOutput", formattedData);
  } catch (error) {
    //console.error("Error:", error); // Log any errors
    showOutput("recentOrdersOutput", `Error: ${error.message}`);
  }
});


// Get Orders of a Specific User
document.getElementById("getUserOrdersForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const userId = document.getElementById("getUserId").value;

  try {
    const response = await fetch(`${apiBase}/orders/${userId}/orders`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data); // Log the response data

    const formattedData = data.orders.map(order => {
      return `Product: ${order.product.name}, Quantity: ${order.quantity}, Order Date: ${new Date(order.orderDate).toLocaleString()}`;
    }).join("\n");

    showOutput("getUserOrdersOutput", formattedData);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    showOutput("getUserOrdersOutput", `Error: ${error.message}`);
  }
});

// Get Users Who Bought Product
document.getElementById("getProductUsersForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const productId = document.getElementById("getProductUsersId").value;

  try {
    const response = await fetch(`${apiBase}/orders/product/${productId}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data);

    const formattedData = data.map(user => 
      `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`
    ).join("\n");

    showOutput("productUsersOutput", formattedData || "No users found");
  } catch (error) {
    console.error("Error:", error);
    showOutput("productUsersOutput", `Error: ${error.message}`);
  }
});

// Get Total Stock
document.getElementById("getTotalStock").addEventListener("click", async () => {
  try {
    const response = await fetch(`${apiBase}/products/total-stock`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Total Stock:", data.totalStock);
    showOutput("queryOutput", `Total Stock of All Products: ${data.totalStock}`);
  } catch (error) {
    console.error("Error:", error);
    showOutput("queryOutput", `Error: ${error.message}`);
  }
});