// Course Progress Calculator
// Run with: node progress.js

// Returns the completion percentage, or null if the total is invalid.
function calculatePercent(completed, total) {
  if (!Number.isFinite(completed) || !Number.isFinite(total) || total <= 0) {
    return null; // avoids Infinity / NaN from a zero or invalid total
  }
  return (completed / total) * 100;
}

// Classifies a percentage into a status label.
function getStatus(percent) {
  if (percent >= 90) {
    return "On Track";
  } else if (percent >= 70) {
    return "Making Progress";
  }
  return "Needs Attention";
}

// Builds the readable result for one student.
function buildReport(studentName, completedItems, totalItems) {
  const percent = calculatePercent(completedItems, totalItems);

  if (percent === null) {
    return `${studentName}: Unable to calculate progress. Total items must be greater than 0 (received ${totalItems}).`;
  }

  const status = getStatus(percent);
  return `${studentName}: ${completedItems} of ${totalItems} items complete (${percent}%) - Status: ${status}`;
}

// Required test cases
const studentName = "Taylor";

const tests = [
  { completedItems: 9, totalItems: 10 }, // 90  -> On Track
  { completedItems: 7, totalItems: 10 }, // 70  -> Making Progress
  { completedItems: 4, totalItems: 10 }, // 40  -> Needs Attention
  { completedItems: 4, totalItems: 0 },  // invalid total
];

tests.forEach(({ completedItems, totalItems }, index) => {
  console.log(`Test ${index + 1}: ${buildReport(studentName, completedItems, totalItems)}`);
});
