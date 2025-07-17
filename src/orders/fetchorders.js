const baseUrl =process.env.REACT_APP_BASE_URL;
export const fetchOrders = async () =>{
   try{
       const response = await fetch(`${baseUrl}/orders`, {
           method: "GET",
       })
       console.log({response});
      
     if(!response.ok){
           throw new Error(`something went wrong: ${response.status} but dont worry everything will be fine soon`)
       }
       const result = await response.json();
       return result
   }
   catch (error){
       throw new Error(error.message ?? "An error Occured");
   }
}
