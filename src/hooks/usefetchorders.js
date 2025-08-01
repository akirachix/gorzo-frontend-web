import { useEffect , useState} from "react";
import {fetchOrders,fetchGroups} from '../utils/fetchorders'


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

export const useFetchGroups = ()=>{
   const [groups , setgroups]= useState([]);
   const [loading , setLoading] = useState(false)
   const [error , setError] = useState(null)
const fetchgroups = async ()=>{
   try{
       setLoading(true)
       const response = await fetchGroups()
  

       const data = response
       console.log({data});
       
       
       setgroups(data)
   }
   catch (error){
       setError(error.message ?? 'An error Occured')
   }
   finally{
       setLoading(false)
   }
}
useEffect(()=>{
       fetchgroups()
   },[])
return {loading, error , groups}
}

