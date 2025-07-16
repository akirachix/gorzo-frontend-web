import React, { useState, useEffect, useMemo } from 'react';
import './index.css';

const habaUrl = 'https://corsproxy.io/?https://haba-58a6f125bb51.herokuapp.com/api/';

function VendorPerformance() {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, productRes] = await Promise.all([
          fetch(`${habaUrl}users`),
          fetch(`${habaUrl}products`)
        ]);
        const userData = await userRes.json();
        const productData = await productRes.json();

        setVendors(userData.filter(u => u.role === 'vendor'));
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const vendorStats = useMemo(() => {
    return vendors.map(vendor => {
      const vendorProducts = products.filter(p => p.vendor=== vendor.user_id);
      return {
        id: vendor.user_id,
        name: `${vendor.first_name} ${vendor.last_name}`,
        productsListed: vendorProducts.length,
        sales: 0, 
        topProduct: vendorProducts.length > 0 ? vendorProducts[0].product_name : '-'
      };
    });
  }, [vendors, products]);

  const filteredAndSorted = useMemo(() => {
    let filtered = vendorStats.filter(v =>
      v.name.toLowerCase().includes(query.toLowerCase())
    );

    filtered.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [vendorStats, query, sortBy, sortOrder]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="vendor-performance">
      <div className="table-header">
        <h2 id='table-title'>Vendor Performance</h2>
        <input
          type="text"
          placeholder="Search vendors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="vendor-search"
        />
      </div>

      <table className="vendor-table">
        <thead className='table-titles'>
          <tr>
            <th onClick={() => handleSort('name')}>Vendor Name</th>
            <th onClick={() => handleSort('productsListed')}>Products Listed</th>
            <th onClick={() => handleSort('sales')}>Total Sales (Ksh)</th>
            <th onClick={() => handleSort('topProduct')}>Top Product</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSorted.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.name}</td>
              <td>{vendor.productsListed}</td>
              <td>{vendor.sales}</td>
              <td>{vendor.topProduct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorPerformance;