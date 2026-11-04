// Data and Functions Challenge

const inventory = [
  { id: 1, name: "Laptop Stand", category: "hardware", price: 45, active: true },
  { id: 2, name: "USB Hub", category: "hardware", price: 30, active: true },
  { id: 3, name: "Old Adapter", category: "hardware", price: 10, active: false },
  { id: 4, name: "Code Editor Add-on", category: "software", price: 15, active: true },
  { id: 5, name: "Diagram Tool", category: "software", price: 20, active: true },
];

// Returns a new array containing only active items.
function getActiveItems(items) {
  return items.filter((item) => item.active);
}

// Returns a new array containing only the item names.
function getItemNames(items) {
  return items.map((item) => item.name);
}

// Returns the total price of the supplied items.
function getTotalValue(items) {
  return items.reduce((total, item) => total + item.price, 0);
}

// Returns a new array of items whose category strictly equals the supplied category.
function getCategoryItems(items, category) {
  return items.filter((item) => item.category === category);
}

// ---------- Tests ----------
function check(label, actual, expected) {
  const pass = actual === expected;
  console.log(`${pass ? "PASS" : "FAIL"} - ${label}: ${actual} (expected ${expected})`);
  return pass;
}

const before = JSON.stringify(inventory);

const activeItems = getActiveItems(inventory);
const allNames = getItemNames(inventory);
const hardwareItems = getCategoryItems(inventory, "hardware");
const softwareItems = getCategoryItems(inventory, "software");
const missingItems = getCategoryItems(inventory, "furniture");

const results = [
  check("Active item count", activeItems.length, 4),
  check("All item names count", allNames.length, 5),
  check("Active total value", getTotalValue(activeItems), 110),
  check("Hardware item count", hardwareItems.length, 3),
  check("Software item count", softwareItems.length, 2),
  check("Nonexistent category returns empty array",
    Array.isArray(missingItems) && missingItems.length === 0, true),
  check("Original inventory unchanged", JSON.stringify(inventory) === before, true),
];

console.log("\nActive item names:", getItemNames(activeItems));
console.log(results.every(Boolean) ? "\nAll tests passed." : "\nSome tests FAILED.");
