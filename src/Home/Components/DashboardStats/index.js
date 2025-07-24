import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUsers, faArrowTrendUp, faCartShopping, faCircleCheck, faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import StatsCard from "../StatsCard";
import useStatsData from "../../../hooks/useFetchStatsCard";
import './index.css';



function DashboardStats() {
  const {
    vendorCount,
    customerCount,
    activeGroups,
    completedGroups,
    loading,
    error
  } = useStatsData();

  if (loading) return <p>Loading stats...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="usersData">
      <StatsCard title="Total Vendors" value={vendorCount} icon={faUsers} />
      <StatsCard title="Total Customers" value={customerCount} icon={faCircleUser} />
      <StatsCard title="Active Group Buying" value={activeGroups} icon={faCircleCheck} />
      <StatsCard title="Completed Group Buys" value={completedGroups} icon={faCartShopping} />
      
    </div>
  );
}

export default DashboardStats;
