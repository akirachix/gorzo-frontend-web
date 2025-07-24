import React, { useState, useMemo, useEffect } from 'react';
import useFetchVendorPerformance from '../../../hooks/useFetchVendorPerformance';
import './index.css';

function VendorPerformance() {
  const { vendors, products, loading, error } = useFetchVendorPerformance();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortBy, sortOrder, vendors, products]);

  const vendorStats = useMemo(() => {
    return vendors.map(vendor => {
      const vendorProducts = products.filter(p => p.vendor === vendor.id);
      return {
        id: vendor.id,
        name: `${vendor.first_name} ${vendor.last_name}`,
        productsListed: vendorProducts.length,

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

  const totalPages = Math.ceil(filteredAndSorted.length / rowsPerPage);
  const currentVendors = filteredAndSorted.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vendor performance: {error.message}</div>;

  return (
    <div className="vendor-performance">
      <div className="table-header">
        <h2 id="table-title">Vendor Performance</h2>
        <input
          type="text"
          placeholder="Search vendors..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="vendor-search"
        />
      </div>
     <div className='table-wrapper'>
      <table className="vendor-table">
        <thead className="table-titles">
          <tr>
            <th onClick={() => handleSort('name')}>Vendor Name</th>
            <th onClick={() => handleSort('productsListed')}>Products Listed</th>
            <th onClick={() => handleSort('topProduct')}>Top Product</th>
          </tr>
        </thead>
        <tbody>
          {currentVendors.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center', padding: '1rem' }}>
                Vendor not found.
              </td>
            </tr>
          ) : (
            currentVendors.map(vendor => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.productsListed}</td>
                <td id = "productColumn">{vendor.topProduct}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      <div
        className="pagination-controls"
        style={{ marginTop: '1rem', textAlign: 'center' }}
      >
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default VendorPerformance;
