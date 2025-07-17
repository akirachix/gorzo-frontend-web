import { useEffect , useState} from "react";
import {fetchOrders} from '../fetchorders'


export const useFetchOrders = ()=>{
   const [orders , setorders]= useState([]);
   const [loading , setLoading] = useState(false)
   const [error , setError] = useState(null)
   const baseUrl =process.env.REACT_APP_BASE_URL;
   console.log(baseUrl);


const fetchorders = async ()=>{
   try{
       setLoading(true)
       const response = await fetchOrders()
       console.log('API response:', response);
       setorders(Array.isArray(response)? response:(response.results || []))
   }
   catch (error){
       setError(error.message ?? 'An error Occured')
   }
   finally{
       setLoading(false)
   }
}
useEffect(()=>{
   // (async ()=>{
       // await fetchorders()
       fetchorders()
   },[])
   // ();
// })
return {loading, error , orders}
}
