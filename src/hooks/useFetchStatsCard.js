

import { useEffect, useState } from 'react';
import { fetchCustomers, fetchLiveGroups, fetchVendors } from '../utils/fetchStatsCardData';

export default function useStatsData() {
 const [vendorCount, setVendorCount] = useState(0);
 const [customerCount, setCustomerCount] = useState(0);
 const [activeGroups, setActiveGroups] = useState(0);
 const [completedGroups, setCompletedGroups] = useState(0);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
   const loadData = async () => {
     try {
       const vendors = await fetchVendors();
       const customers = await fetchCustomers();
       const liveGroups = await fetchLiveGroups();

       setVendorCount(vendors.length);
       setCustomerCount(customers.length);
       setActiveGroups(liveGroups.filter(group => group.live_status === 'open').length);
       setCompletedGroups(liveGroups.filter(group => group.live_status === 'completed').length);
     } catch (err) {
       setError(err.message || 'Failed to load data');
     } finally {
       setLoading(false);
     }
   };

   loadData();
 }, []);

 return { vendorCount, customerCount, activeGroups, completedGroups, loading, error };
}
