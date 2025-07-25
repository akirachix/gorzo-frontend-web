import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import useCustomerProgression from "../../../hooks/useCustomerProgression";

function CustomerProgressionChart() {
  const { dataset, loading, error } = useCustomerProgression();

  if (loading) return <div>Loading user progression...</div>;
  if (error) return <div>Error loading user progression data</div>;

  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: "month", scaleType: "band" }]}
      series={[{ dataKey: "users", label: "New Customers per Month", color: "#F57C00" }]}
      height={300}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default CustomerProgressionChart;
