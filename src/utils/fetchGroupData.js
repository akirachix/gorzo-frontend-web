const groupUrls = "https://haba-58a6f125bb51.herokuapp.com/api/LiveGroup/";


 export const fetchUserProfiles = async () =>{
      try{
            const response = await fetch(`${bassUrl}/users`)
            if(!response.ok){
                throw new Error (`Something went wrong: ${response.status}`)
            }
            const result = await response.json();
            return result?.users;
        } catch (error){

            throw  new Error(error.message ?? 'An error occured')  
        }
    };