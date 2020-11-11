const url = process.env.REACT_APP_BASE_URL;

const createUser = async (user) => {
    try{
        let response = await fetch(`${url}/cadastro`, 
        {
           method: "post",
           headers: new Headers({ 'Content-Type': 'application/json' }),
           body: JSON.stringify(user)
        }
        );
        let message = await response.json()
        return {status: response.status, message: message.message};
    }
    catch(err){
        console.log(err);
    }
    return {status: 400, message: "Erro ao realizar cadastro."};
}

export default createUser;