import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ listExpense, listIncome }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // destroy the old chart instance
    }

    chartInstance.current = new Chart(chartContainer.current, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "Expenses",
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            borderColor: "rgba(239, 68, 68, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(239, 68, 68, 0.4)",
            hoverBorderColor: "rgba(239, 68, 68, 1)",
            data: listExpense.map((item) => item.total),
          },
          {
            label: "Income",
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            borderColor: "rgba(34, 197, 94, 1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(34, 197, 94, 0.4)",
            hoverBorderColor: "rgba(34, 197, 94, 1)",
            data: listIncome.map((item) => item.total),
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }, [listExpense, listIncome, days]);

  return (
    <div className="w-full">
      <h2 className="text-sm text-center mb-4">Income and Expenses Weekly</h2>
      <canvas ref={chartContainer} className="w-full" />
    </div>
  );
};

export default BarChart;
