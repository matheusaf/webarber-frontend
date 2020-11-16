const url = process.env.REACT_APP_BASE_URL;

const validateUser = async(cachedUser) => {
    try{
        let response = await fetch(`${url}/conta`,
                {method: "get", 
                headers: new Headers({"Content-Type": "application/json", 
                                        "Authorization": `Bearer ${cachedUser.sessionToken}`, body: null
        })}).then(data=>data.json())
        return response.message !== "Token inválido";
    }
    catch(err){
        console.log(err);
    }
    return false;
}

// const fetchUserData = async(token, userId) =>{
//     try{
//         let res = await fetch(`${url}/conta/`, {method: "get", headers:new Headers({"Content-Type":"application-json", "Authorization": `Bearer ${token}`})});
//         let data = await res.json();
//         return data
//     }
//     catch(err){
//         console.log(err);
//     }
//     return null;
// }

export {
    validateUser,
    // fetchUserData
}