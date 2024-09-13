// src/components/ProgressChart.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const ProgressChart = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Task Completion',
        data: [completed, total - completed],
        backgroundColor: ['#4caf50', '#e0e0e0'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="progress-chart">
      <h4>Task Completion</h4>
      <div className="chart-container">
        <Doughnut data={data} />
      </div>
      <div className="chart-text">
        {percentage.toFixed(2)}% Completed
      </div>
    </div>
  );
};

export default ProgressChart;
