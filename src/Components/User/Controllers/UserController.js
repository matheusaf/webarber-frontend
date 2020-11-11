const url = process.env.REACT_APP_BASE_URL;

const loginUser = async(user) =>{
    try{
        let response = await fetch(`${url}/login`, {
               method: "post",
               headers: new Headers({'Content-Type': 'application/json'}),
               body: JSON.stringify(user)
      })
        let usuario = await response.json();
        return {response: response, usuario: usuario};

    }
    catch(err){
        console.log(err);
    }
    return {response:{status:400}, usuario: null};
}

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
const fetchUserData = async(token, userId) =>{
    try{
        let res = await fetch(`${url}/conta/`, {method: "get", headers:new Headers({"Content-Type":"application-json", "Authorization": `Bearer ${token}`})});
        let data = await res.json();
        return data
    }
    catch(err){
        console.log(err);
    }
    return null;
}

export {
    loginUser,
    validateUser,
    fetchUserData
}