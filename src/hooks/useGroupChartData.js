import { useEffect, useState } from "react";
import { fetchLiveGroups } from "../utils/fetchStatsCardData"; 

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const useGroupChartData = () => {
  const [chartData, setChartData] = useState({
    months: monthNames,
    allGroupCounts: Array(12).fill(0),
    completedGroupCounts: Array(12).fill(0),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLiveGroups() 
      .then(groups => {
  
        const monthCounts = {};
        for (let i = 0; i < 12; i++) {
          monthCounts[i] = { all: 0, completed: 0 };
        }

        groups.forEach(group => {
          if (!group.start_time) return;
          const startDate = new Date(group.start_time);
          if (isNaN(startDate.getTime())) return;
          const monthIndex = startDate.getMonth(); 
          monthCounts[monthIndex].all += 1;

          if (group.live_status === 'completed') {
            monthCounts[monthIndex].completed += 1;
          }
        });

     
        const allGroupCounts = monthNames.map((_, idx) => monthCounts[idx].all);
        const completedGroupCounts = monthNames.map((_, idx) => monthCounts[idx].completed);
      
        setChartData({
          months: monthNames, 
          allGroupCounts: allGroupCounts,
          completedGroupCounts: completedGroupCounts,
        });
        setLoading(false); 
      })
      .catch(err => {
        console.error("Error fetching or processing group data:", err);
        setError(err);
        setLoading(false);
      });
  }, []); 
  return { chartData, loading, error };
};

export default useGroupChartData;
