import React from "react";
import './index.css';
import { LineChart } from '@mui/x-charts/LineChart';


const dataset = [
  { month: 'January', sales: 2000 },
  { month: 'February', sales: 2500 },
  { month: 'March', sales: 2300 },
  { month: 'April', sales: 2300 },
  { month: 'May', sales: 2700 },
  { month: 'June', sales: 3000 },
];


function SalesChart (){
      <LineChart
            dataset={dataset}
            xAxis={[{ dataKey: 'month', scaleType: 'band' }]} 
            series={[{ dataKey: 'sales', label: 'Monthly Sales', color: '#F57C00' }]}
            height={300}
            grid={{ vertical: true, horizontal: true }}
                                                   />


};

export default SalesChart;