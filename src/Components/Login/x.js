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