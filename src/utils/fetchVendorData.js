const habaUrl = "https://haba-58a6f125bb51.herokuapp.com/api/";


 export const fetchVendorProfiles = async () =>{
      try{
            const response = await fetch(`${habaUrl}/users`)
            if(!response.ok){
                throw new Error (`Something went wrong: ${response.status}`)
            }
            const result = await response.json();
            return result?.users;
        } catch (error){

            throw  new Error(error.message ?? 'An error occured')  
        }
    };