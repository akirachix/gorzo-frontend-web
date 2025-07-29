import './index.css'
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useFetchOrders,useFetchGroups } from '../hooks/usefetchorders';
import { useState, useEffect, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { orders,loading:ordersLoading, error:ordersError} = useFetchOrders();
  const { groups,loading:groupsLoading,error:groupsError } = useFetchGroups();
 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 


  const pieData = [
    { label: 'Individual orders', 
      value: orders.filter(o => (o.order_type??'').toLowerCase() === 'individual').length, color: '#F5E4E4' },
    { label: 'Group orders', 
      value: orders.filter(o =>( o.order_type??'').toLowerCase() === 'group').length, color: '#F57C00' },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };


  const filteredOrders = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return orders.filter(order => {
      return (
        (order.order_type && order.order_type.toLowerCase().includes(lowerSearch)) ||
        (order.created_at && order.created_at.split('T')[0].includes(lowerSearch))
      );
    });
  }, [orders, searchTerm]);

 
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);


  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));


  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredOrders, currentPage, totalPages]);

  if (ordersLoading || groupsLoading) {
  return <div>Loading...</div>;
}

if (ordersError) {
  return <div>Error loading orders: {ordersError}</div>;
}

if (groupsError) {
  return <div>Error loading groups: {groupsError}</div>;
}

  return (
    <div className='orders_container'>
      <h2 className='order'>Orders</h2>
      <div className="top-section">

        <div className="live-groups">
          <h3>Active Groups</h3>
          
          <ul>
           
            {groups.map(group => (
               <li key={`${group.liveGroup_id}`}>
                  <span>{group.group_name}</span>
                <span>{(group.start_time ||'').split('T')[1].split('Z')[0].split('.')[0].slice(0, 5)}</span>
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
            <h3>Order type statistics</h3>
            {(pieData || []).map((data) => (
              <div key={data.label} className='legend_item'>
                <div className='legend_dot' style={{ backgroundColor: data.color }} />
                <span className='legend_label'> {data.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <input
          className='search'
          type="text"
          placeholder="Search orders by type or date"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);  
          }}
        />
        <FaSearch className='search_icon' />
      </div>

      <div className='second_part'>
        <div className='table_data'>
       
            <h3 className='type'>Type</h3>
          <h3>Price</h3>
        
       
          <h3>Status</h3>
             <h3 className='date'>Date</h3>
                <h3>Time</h3>
        </div>

        {paginatedOrders.map(data => {
          let statusClass = 'status-default';
          if (data.order_status) {
            switch (data.order_status.toLowerCase()) {
              case 'picked':
                statusClass = 'status-completed';
                break;
              case 'pending':
                statusClass = 'status-pending';
                break;
              case 'cancelled':
                statusClass = 'status-cancelled';
                break;
              case 'packed':
                statusClass = 'status-processing';
                break;
              default:
                statusClass = 'status-default';
            }
          }
          return (
            <div key={data.order_id}data-testid={`order-row-${data.order_id}`} className='table_data'>
               <p>{data.order_type}</p>
              <p>{data.total_amount}</p>
              <p className={`status ${statusClass}`}>
                {data.order_status}
              </p>
                  <p>{data.created_at.split('T')[0]}</p>
                    <p>{data.created_at.split('T')[1].split('Z')[0].split('.')[0].slice(0, 5)}</p>
            </div>
          );
        })}
      </div>

   
      <div className="pagination_controls" style={{ marginTop: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <button className='prevbtn'
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button className='nextbtn'
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default Orders;
