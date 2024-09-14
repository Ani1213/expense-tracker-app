document.addEventListener("DOMContentLoaded", function () {
  const expenseForm = document.getElementById("expenseForm");
  const expenseNameInput = document.getElementById("expenseName");
  const expenseAmountInput = document.getElementById("expenseAmount");
  const expenseList = document.getElementById("expenseList");
  const totalAmount = document.getElementById("totalAmount");

  let totalExpense = 0;

  // Function to update the total expense
  function updateTotalExpense() {
    totalAmount.textContent = totalExpense.toFixed(2);
  }

  // Function to delete an expense
  function deleteExpense(event) {
    const li = event.target.parentElement;
    const amount = parseFloat(li.getAttribute("data-amount"));

    totalExpense -= amount;
    li.remove();
    updateTotalExpense();
  }

  // Function to add an expense
  function addExpense(name, amount) {
    const li = document.createElement("li");
    li.textContent = `${name}: Rs${amount.toFixed(2)}`;
    li.setAttribute("data-amount", amount);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteExpense);

    li.appendChild(deleteButton);
    expenseList.appendChild(li);
  }

  // Handle form submission
  expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (name !== "" && !isNaN(amount) && amount > 0) {
      addExpense(name, amount);
      totalExpense += amount;
      updateTotalExpense();
      expenseForm.reset();
    } else {
      alert("Please enter valid expense details.");
    }
  });
});
