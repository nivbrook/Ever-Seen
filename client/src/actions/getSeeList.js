import axios from "axios";

const getSeeList = ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    
    axios.get("http://localhost:5000/api/users/seelist/"+user.id)
        .then(seeList=>localStorage.setItem("seeList", JSON.stringify(seeList.data)))
        .catch(console.log)
}

export default getSeeList;