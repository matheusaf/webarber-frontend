const url = process.env.REACT_APP_BASE_URL;

const validateUser = async(cachedUser) => {
    try{
        if(cachedUser){
            let response = await fetch(`${url}/conta`, {method: "get",  headers: new Headers({"Content-Type": "application/json", "Authorization": `Bearer ${cachedUser.sessionToken}`, body: null})})
                        .then((data) => data.json());
            return response.message !== "Token inválido";
        }
    }
    catch(err){
        alert(err);
    }
    return false;
};

const setCacheUser = (user) => {
    if(user){
        const cachedUser = localStorage.getItem("webarberUser");
        if(cachedUser){
            localStorage.removeItem("webarberUser");
        }
        let {id, nome, idTipo, sessionToken, CPF, CNPJ} = user;
        let webarberUser = {id: id, nome: nome, idTipo: idTipo, sessionToken: sessionToken, CPF: CPF, CNPJ: CNPJ };
        localStorage.setItem("webarberUser", JSON.stringify(webarberUser));
    } 
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
    setCacheUser
    // fetchUserData
};
