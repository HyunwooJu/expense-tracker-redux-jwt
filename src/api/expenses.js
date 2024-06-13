import axios from "axios";

export const fetchExpenses = async () => {
  const response = await axios.get("http://localhost:5001/api/expenses");
  const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const mergedExpenses = [...localExpenses, ...response.data];
  const uniqueExpenses = mergedExpenses.reduce((acc, current) => {
    const x = acc.find((item) => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  return uniqueExpenses;
};

export const addExpense = async (newExpense) => {
  const response = await axios.post(
    "http://localhost:5001/api/expenses",
    newExpense
  );
  const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  localExpenses.push(response.data);
  localStorage.setItem("expenses", JSON.stringify(localExpenses));
  return response.data;
};

export const updateExpense = async (updatedExpense) => {
  const response = await axios.put(
    `http://localhost:5001/api/expenses/${updatedExpense.id}`,
    updatedExpense
  );
  const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const index = localExpenses.findIndex(
    (expense) => expense.id === updatedExpense.id
  );
  if (index !== -1) {
    localExpenses[index] = response.data;
    localStorage.setItem("expenses", JSON.stringify(localExpenses));
  }
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`http://localhost:5001/api/expenses/${id}`);
  let localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  localExpenses = localExpenses.filter((expense) => expense.id !== id);
  localStorage.setItem("expenses", JSON.stringify(localExpenses));
};
