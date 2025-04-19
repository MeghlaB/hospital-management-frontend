import React from "react";
import Chart from "react-apexcharts";

const ApexChart = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Price",
        data: [
          [1327359600000, 30.95],
          [1327446000000, 31.34],
          [1327532400000, 31.18],
          [1327618800000, 31.05],
          [1327878000000, 31.0],
          // ... (rest of your dataset)
          [1352156400000, 34.39]
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        labels: {
          format: 'MMM dd',
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
  });

  return (
    <div className="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
