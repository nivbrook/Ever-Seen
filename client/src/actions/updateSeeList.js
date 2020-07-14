import axios from "axios";

export const updateSeeList = ()=>{
    const seeList = JSON.parse(localStorage.getItem("seeList"))
    const user = JSON.parse(localStorage.getItem("user"))
    
    axios.put("http://localhost:5000/api/users/update/"+user.id, seeList)
    .then(res=>console.log(res))
    .catch(console.log)
}