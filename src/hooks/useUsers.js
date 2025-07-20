import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl= process.env.REACT_APP_BASE_URL;
  console.log(baseUrl);


const fetchUser = async ()=>{
    try {
      setLoading(true)
      const response = await fetchUsers()
      setUsers(response)
    }
    catch(error){
      setError(error.message ?? 'An Error Occured')
    }
    finally{
      setLoading(false)
    }
  }


  useEffect(() => {
    (async () => {
       await fetchUser();
     
      } )();
    }, []);

  
  return { loading , error, users };
};

