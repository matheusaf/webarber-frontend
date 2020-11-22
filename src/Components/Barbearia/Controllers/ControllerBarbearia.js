const url = process.env.REACT_APP_BASE_URL;

const fetchBarbeariasModerador = async (sessionToken, userId) => {
    try {
        const res = await fetch(`${url}/barbearias/moderador/${userId}`, 
                            {method: 'get',
                                headers: new Headers({"Content-Type": "application/json", 
                                    "Authorization": `Bearer ${sessionToken}`})});
        if(res.status === 200){
            let data = await res.json();
            if(data[0] === undefined){
                data = [data];
            }
            return data;
        }
    } 
    catch (err) {
        console.log(err);
    }
}

const fetchBarbearia = async (barbeariaId) => {
    try {
        const res = await fetch(`${url}/barbearias/barbearia/${barbeariaId}`, {method: 'get'});
        if(res.status === 200){
            let data = await res.json();
            return data;
        }
    } 
    catch (err) {
        console.log(err);
    }
    return null;
}

// const fetchBarbeariaNome = async (nomeBarbearia)

const validarBarbearia = async (user_id, barbeariaId) =>{
    try {
        const res = await fetch(`${url}/barbearias/moderador/${user_id}`, {method: 'get'});
        if(res.status === 200){
            let data = await res.json();
            return data.user_id === user_id;
        }
    } 
    catch (err) {
        console.log(err);
    }
    return false;
}

const editarBarbearia = async (user_id) => {
    try {
        const res = await fetch(`${url}/barbearias/moderador/${user_id}`, {method: 'get'});
        if(res.status === 200){
            let data = await res.json();
            if(data[0] === undefined){
                data = [data];
            }
            return data;
        }
    } 
    catch (err) {
        console.log(err);
    }
}

    async function fetchBarbeariaNome(nome) {
        try {
            const res = await fetch(`${url}/barbearias/${nome}`,{ method: 'get'});
            if(res.status === 200){
                let result = await res.json();
                if(result[0] === undefined){
                    result = [result];
                }
                return result;
            }
        } catch (err) {
            console.log(err);
        }
        return null
    }

export{
    fetchBarbeariasModerador,
    fetchBarbeariaNome,
    fetchBarbearia,
    validarBarbearia, 
    editarBarbearia
}