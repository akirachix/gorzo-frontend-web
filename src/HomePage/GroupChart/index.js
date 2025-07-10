import React from "react";
import './index.css';
import { BarChart } from '@mui/x-charts/BarChart';




function GroupChart() {
    <BarChart
        xAxis={[{ data: ['January', 'February', 'March', 'April'] }]}
        series={[{ data: [30, 25, 17, 45], label: 'Created Groups', color: ['green'] }, { data: [25, 15, 7, 45], label: 'Completed Groups', color: [' #F57C00'] }]}
        height={300}

    />


};

export default GroupChart;