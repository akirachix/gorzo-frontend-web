import { useEffect , useState} from "react";
import {fetchOrders} from '../utils/fetchorders'


export const useFetchOrders = ()=>{
   const [orders , setorders]= useState([]);
   const [loading , setLoading] = useState(false)
   const [error , setError] = useState(null)



const fetchorders = async ()=>{
   try{
       setLoading(true)
       const response = await fetchOrders()
  

       const data = response
       console.log({data});
       
       
       setorders(data)
   }
   catch (error){
       setError(error.message ?? 'An error Occured')
   }
   finally{
       setLoading(false)
   }
}
useEffect(()=>{
       fetchorders()
   },[])
return {loading, error , orders}
}
