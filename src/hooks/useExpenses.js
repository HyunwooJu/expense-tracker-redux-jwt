import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

const fetchExpenses = async () => {
  const response = await apiClient.get("/expenses");
  return response.data;
};

const addExpense = async (expense) => {
  const response = await apiClient.post("/expenses", expense);
  return response.data;
};

const updateExpense = async (expense) => {
  const response = await apiClient.put(`/expenses/${expense.id}`, expense);
  return response.data;
};

const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/expenses/${id}`);
  return response.data;
};

export const useExpenses = () => {
  const queryClient = useQueryClient();
  const user = useSelector(selectUser);

  const {
    data: expenses = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (newExpense) => {
      return addExpense({ ...newExpense, createdBy: user.username });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses"]);
    },
  });

  return {
    expenses,
    error,
    isLoading,
    addExpense: addExpenseMutation.mutate,
    updateExpense: updateExpenseMutation.mutate,
    deleteExpense: deleteExpenseMutation.mutate,
  };
};
