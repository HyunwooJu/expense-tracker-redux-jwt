import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../api/expenses";
import { useSelector } from "react-redux";
import { selectUser } from "../store/authSlice";

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
