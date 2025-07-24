import { useState, useEffect } from 'react';
import { fetchUsers,fetchProducts } from '../utils/fetchVendorPerformance';


export default function useFetchVendorPerformance() {
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [users, prods] = await Promise.all([fetchUsers(), fetchProducts()]);

        setVendors(users.filter(u => u.role === 'vendor'));
        setProducts(prods);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { vendors, products, loading, error };
}
