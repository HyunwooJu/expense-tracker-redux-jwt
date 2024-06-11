import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import styled from "styled-components";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SummaryContainer = styled.div`
  margin: 20px 0;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
  margin-right: 5px;
`;

const ExpenseSummary = ({ expenses = [], selectedMonth }) => {
  const categories = [...new Set(expenses.map((expense) => expense.item))];
  const categoryTotals = categories.map((category) => {
    return expenses
      .filter((expense) => expense.item === category)
      .reduce((acc, expense) => acc + expense.amount, 0);
  });

  const total = categoryTotals.reduce((acc, amount) => acc + amount, 0);

  const data = {
    labels: ["총 지출"],
    datasets: categories.map((category, index) => ({
      label: `${category}: ${categoryTotals[index]} 원 (${(
        (categoryTotals[index] / total) *
        100
      ).toFixed(2)}%)`,
      data: [categoryTotals[index]],
      backgroundColor: `hsl(${index * 30}, 70%, 50%)`,
    })),
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + " 원";
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  if (expenses.length === 0) {
    return (
      <SummaryContainer>
        <h2>{selectedMonth}월 총 지출: 0 원</h2>
        <p>지출이 없습니다.</p>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <h2>
        {selectedMonth}월 총 지출: {total.toLocaleString()} 원
      </h2>
      <div style={{ height: "100px" }}>
        <Bar data={data} options={options} />
      </div>
      <LegendContainer>
        {categories.map((category, index) => (
          <LegendItem key={index}>
            <ColorBox color={`hsl(${index * 30}, 70%, 50%)`} />
            {category}: {categoryTotals[index].toLocaleString()} 원 (
            {((categoryTotals[index] / total) * 100).toFixed(2)}%)
          </LegendItem>
        ))}
      </LegendContainer>
    </SummaryContainer>
  );
};

export default ExpenseSummary;
