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

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
