import axios from "axios";

export const fetchExpenses = async () => {
  const response = await axios.get("/api/expenses");
  const localExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
  return [...response.data, ...localExpenses];
};
