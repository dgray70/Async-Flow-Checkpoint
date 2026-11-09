function mockOperation(name, value, milliseconds, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`${name} failed`));
        return;
      }

      resolve(value);
    }, milliseconds);
  });
}

function loadUser(shouldFail = false) {
  return mockOperation(
    "loadUser",
    { id: 7, name: "Jordan" },
    300,
    shouldFail,
  );
}

function loadOrders(userId) {
  return mockOperation(
    "loadOrders",
    [
      { id: 101, userId, total: 25 },
      { id: 102, userId, total: 40 },
      { id: 103, userId, total: 15 },
    ],
    300,
  );
}

async function loadDashboard() {
  try {
    // Step 1: wait for the user
    const user = await loadUser();

    // Step 2: use the user's id to load their orders
    const orders = await loadOrders(user.id);

    // Step 3: calculate the total with reduce
    const total = orders.reduce((sum, order) => sum + order.total, 0);

    console.log(`User: ${user.name}`);
    console.log(`Orders: ${orders.length}`);
    console.log(`Total: $${total.toFixed(2)}`);
  } catch (error) {
    console.error(`Dashboard could not be loaded: ${error.message}`);
  }
}

loadDashboard();
