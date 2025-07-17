import './index.css'
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {useFetchOrders} from '../orders/hooks/usefetchorders';




const Orders = () =>{
    const{loading,error, orders}= useFetchOrders()
const pieData = [
 { label: 'Individual orders', value: orders.filter(o => o.order_type === 'individual').length, color: '#F5E4E4'},
 { label: 'Group orders', value: orders.filter(o => o.order_type === 'group').length, color:'#F57C00'   },
];
   const settings = {
   margin: { right: 5 },
   width: 200,
   height: 200,
   hideLegend: true,
};
 
 if (loading){
           return< h1> loading ...</h1>
       }
 if (error){
           return< h1>{error}</h1>
       }
   return(
        <div className='orders_container'>
           <div className="top-section">
             
 <div className="live-groups">
                       <h3>Live Groups</h3>
                       <ul>
                           {(orders ||[]).map((group, index) => (
                               <li key={orders.group_id}>
                                 
                                   <span>{group.order_type}</span>
                                   <span>{group.created_at.split('T')[0]}</span>
                               </li>
                           ))}
                       </ul>
                   </div>


                   <div className='pie_info'>
               <div className="chart-box">
                   <PieChart
                       series={[{ data: pieData, innerRadius: 50, outerRadius: 75, arcLabel: 'value' }]}
                       {...settings}
                   />
               </div>
               <div className='legend'>
                   {(pieData ||[]).map((data) => (
                       <div key={data.label} className='legend_item'>
                           <div className='legend_dot'
                               style={{ backgroundColor: data.color }} >
                           </div>
                           <span className='legend_label'> {data.label}</span>
                       </div>
                   ))}
               </div>
               </div>
           </div>
           <div className='second_part'>
               <div className='table_data'>
                       <h3>Order ID</h3>
                       <h3>Price</h3>
                       <h3 className='type'>Type</h3>
                </div>
                       {(orders || []).map(data => (
                           <div key={data.order_id} className='table_data'>
                               <p>{data.order_id}</p>
                               <p>{data.total_amount}</p>
                               <p>{data.order_type}</p>
                           </div>
                       ))
                       }
                
          
           </div>
       </div>
   )
}
export default Orders;
