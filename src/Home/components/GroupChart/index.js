import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import useGroupChartData from "../../../hooks/useGroupChartData";

function GroupChart() {
  const { chartData, loading, error } = useGroupChartData();

  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band",        
          data: chartData.months    
        }
      ]}
      series={[
        {
          data: chartData.allGroupCounts,    
          label: "All Groups",
          color: "green"
        },
        {
          data: chartData.completedGroupCounts,
          label: "Completed Groups",
          color: "#F57C00"
        }
      ]}
      height={300}
    />
  );
}

export default GroupChart;
