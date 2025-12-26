
const output = document.getElementById("output");
output.innerHTML = `
  <tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;
function createPromise() {
  const delay = Math.random() * 2000 + 1000; // 1000–3000 ms
  const start = performance.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const end = performance.now();
      const timeTaken = (end - start) / 1000;
      resolve(timeTaken);
    }, delay);
  });
}
const promises = [
  createPromise(),
  createPromise(),
  createPromise()
];
Promise.all(promises).then((results) => {
  // Remove loading row
  output.innerHTML = "";

  let maxTime = Math.max(...results);

  results.forEach((time, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${index + 1}</td>
      <td>${time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td><strong>${maxTime.toFixed(3)}</strong></td>
  `;
  output.appendChild(totalRow);
});