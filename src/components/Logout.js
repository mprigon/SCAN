import React, {useState} from "react";
import { Link } from "react-router-dom";

import Main from "./Main";
import Layout from "./Layout";
import Header from "./Header";

import '../components/css/style.css';

function Logout() {
  const [value,setValue] = useState();
  function clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    localStorage.removeItem('user');
    setValue({}); // вызывает обновление компонента
  }
  
  const token = localStorage.getItem('token');
  let isLoggedIn = false;
  const expire = localStorage.getItem('expire');
  const user = localStorage.getItem('user')

  if (!!token && !!expire) {
    const expireTime = new Date(Date.parse(expire));
    const timeRemain = expireTime - Date.now();
    isLoggedIn = true ? timeRemain > 0 : false;
  }

  return (
    <React.Fragment>
      <nav>
        <Header />
      </nav>
      <div className="container">
        <div>
          {isLoggedIn && <p>Вы зарегистрированы как {user}</p>}
          {isLoggedIn && <p>Выйти из системы и удалить регистрационные данные из браузера?</p>}
          {isLoggedIn && <button onClick={clearAuthData}>Выйти и удалить</button>}
        </div>
        {!isLoggedIn && <p>Вы успешно вышли из системы, данные удалены</p>};
        <Link to="/">Вернуться на главную страницу</Link>
      </div>      
    </React.Fragment>

    )
}

export default Logout;