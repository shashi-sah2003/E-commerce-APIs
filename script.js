const apiBase = "http://localhost:3000"; 

// Helper function to show output on the page
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

// Function to create and display table
const showTable = (selector, data) => {
  const outputElement = document.getElementById(selector);
  if (!outputElement) {
    console.error(`Element with selector "${selector}" not found.`);
    return;
  }

  outputElement.innerHTML = "";

  if (data.length === 0) {
    outputElement.innerText = "No recent orders found.";
    return;
  }

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  const headers = ["Order ID", "User", "Product", "Quantity", "Order Date"];
  const headerRow = document.createElement("tr");

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.innerText = header;
    th.style.border = "1px solid #ddd";
    th.style.padding = "8px";
    th.style.textAlign = "left";
    th.style.backgroundColor = "#f4f4f4";
    headerRow.appendChild(th);
  });

  table.appendChild(headerRow);

  data.forEach((order) => {
    const row = document.createElement("tr");

    const orderIdCell = document.createElement("td");
    orderIdCell.innerText = order.id;
    orderIdCell.style.border = "1px solid #ddd";
    orderIdCell.style.padding = "8px";
    row.appendChild(orderIdCell);

    const userCell = document.createElement("td");
    if (order.user) {
      userCell.innerText = `${order.user.name}`;
    } else {
      userCell.innerText = "Guest";
    }
    userCell.style.border = "1px solid #ddd";
    userCell.style.padding = "8px";
    row.appendChild(userCell);

    const productCell = document.createElement("td");
    productCell.innerText = `${order.product.name} (${order.product.category})`;
    productCell.style.border = "1px solid #ddd";
    productCell.style.padding = "8px";
    row.appendChild(productCell);

    const quantityCell = document.createElement("td");
    quantityCell.innerText = order.quantity;
    quantityCell.style.border = "1px solid #ddd";
    quantityCell.style.padding = "8px";
    row.appendChild(quantityCell);

    const dateCell = document.createElement("td");
    dateCell.innerText = new Date(order.orderDate).toLocaleString();
    dateCell.style.border = "1px solid #ddd";
    dateCell.style.padding = "8px";
    row.appendChild(dateCell);

    table.appendChild(row);
  });

  outputElement.appendChild(table);
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
    console.log("Response Data:", data); 
    showOutput("createUserOutput", `Name: ${data.name} Email: ${data.email} Phone: ${data.phone}`);
  } catch (error) {
    console.error("Error:", error); 
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
    showOutput("updateUserOutput", `Name: ${data.name} Email: ${data.email} Phone: ${data.phone}`);
  } catch (error) {
    showOutput("updateUserOutput", `Error: ${error.message}`);
  }

});

// Get User
document.getElementById("getUserForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("getemailId").value;

  const response = await fetch(`${apiBase}/users/${email}`);
  const data = await response.json();
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
    console.log("Response Data:", data); 
    showOutput("createProductOutput", `Product created successfully with ID: ${data.productId}, please remember the product ID`);
  } catch (error) {
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
    console.log("Response Data:", data); 
    showOutput("updateProductOutput", `Product Updated successfully Name: ${data.name} Category: ${data.category} Price: ${data.price} Stock: ${data.stock}`);
  } catch (error) {
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
    console.log("Response Data:", data); 
    showOutput("getProductOutput", `Name: ${data.name} Category: ${data.category} Price: ${data.price} Stock: ${data.stock}`);
  } catch (error) {
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
    console.error("Error:", error);
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
    console.log("Response Data:", data); 
    showOutput("updateOrderOutput", `Order updated successfully: with ProductID: ${data.productId} New Quantity: ${data.quantity}`);
  } catch (error) {
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
    console.log("Response Data:", data); 
    const { productId, userId, quantity } = data;
    showOutput("getOrderOutput", `Product ID: ${productId}, User ID: ${userId}, Quantity: ${quantity}`);
  } catch (error) {
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
    console.log("Recent Orders:", data);

    showTable("recentOrdersOutput", data);
  } catch (error) {
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
    console.log("Response Data:", data); 

    const formattedData = data.orders.map(order => {
      return `Product: ${order.product.name}, Quantity: ${order.quantity}, Order Date: ${new Date(order.orderDate).toLocaleString()}`;
    }).join("\n");

    showOutput("getUserOrdersOutput", formattedData);
  } catch (error) {
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