import React from "react";
import { Navigate } from 'react-router-dom';

// Assumption: The server is sending `true` or `false`
// as the response for authentication for simplicity
function RequireAuth({ children }) {

    /* const [auth, setAuth] = useState(null);

    fetch(urls.auth, methods.get())
        .then(r => r.json())
        .then(data => setAuth(data))
        .catch(error => console.log(error)); */

    // получаем срок действия токена из localstorage
    const expire = localStorage.getItem('expire');
    const expireTime = new Date(Date.parse(expire));
    // остающееся время действия токена в милисекундах
    const timeRemain = expireTime - Date.now();

    console.log('timeRemain from RequireAuth = ', timeRemain);

    let auth = true ? timeRemain > 0 : false;   
    console.log('auth from RequireAuth = ', auth);
    if (auth) {
        console.log('ваш токен действующий!');
    }

    return (
        auth == null ?
            null : (auth ?
                children : <Navigate to={"/login"} />)
    )
}

export default RequireAuth;