import React, { useEffect, useState } from 'react';
const habaUrl = "https://haba-58a6f125bb51.herokuapp.com/api/";


function DataTable() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${habaUrl}/users`)
      .then(response => response.json())
      .then(json => {
        setData(json); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []); 

  if (loading) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          {/* Add other headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}> {/* Use a unique key */}
            <td>{item.id}</td>
            <td>{item.name}</td>
            {/* Render other fields as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;