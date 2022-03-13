// import axios from "axios"

// const login = async ()=>{
//     try {
//         const {access_token, user} = await axios.get("/login")
//         localStorage.setItem("access_token", access_token)
//     } catch (error) {
        
//     }


    
// }




// const getToken = ()=>{
//     if(localStorage.getItem("access_token")){
//         return localStorage.getItem("access_token")
//     }

// }

// const customAxios = axios.create({
//     baseUrl: "http:localhost:9090",
//     Headers: {
//         Authorization: `Bearer ${getToken()}`
//     }
// })

// export default customAxios

// axios.get("/users")