// ---convert string to capital case---
// input -> 'bill_number', 'Bill number' 'bill-number', 'bill number'
// output -> 'Bill Number'
export const titleCase = (str) => str.replace(/_|-/g, ' ').replace(
  /\w\S*/g,
  (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
);
