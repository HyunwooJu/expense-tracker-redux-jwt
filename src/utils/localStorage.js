export const getExpensesFromLocalStorage = () => {
  const expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

export const saveExpensesToLocalStorage = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

export const removeExpenseFromLocalStorage = (id) => {
  let expenses = getExpensesFromLocalStorage();
  expenses = expenses.filter((expense) => expense.id !== id);
  saveExpensesToLocalStorage(expenses);
};
