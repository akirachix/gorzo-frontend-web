
import { useEffect, useState } from "react";
import { fetchCustomers } from "../utils/fetchStatsCardData";

const monthNames = [ "January", "February", "March", "April", "May", "June",
 "July", "August", "September", "October", "November", "December" ];

function useCustomerProgression() {
  const [dataset, setDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers()
      .then(customers => {
        const counts = {};

        customers.forEach(customer => {
          if (!customer.date_joined) return;
          const date = new Date(customer.date_joined);
          const year = date.getFullYear();
          const month = date.getMonth();
          const key = `${year}-${month}`;
          counts[key] = (counts[key] || 0) + 1;
        });

        const sortedKeys = Object.keys(counts).sort();

        const aggregatedData = sortedKeys.map(key => {
          const [year, month] = key.split("-");
          return {
            month: `${monthNames[parseInt(month)]} ${year}`,
            users: counts[key],
          };
        });

        setDataset(aggregatedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch customers:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { dataset, loading, error };
}

export default useCustomerProgression;
