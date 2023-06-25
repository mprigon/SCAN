import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import '../styles/Header.css';
import '../components/css/style.css'

import logoScan from "./img/SGN_09_24_2022_1663968217400 1.png";
import userPhoto from "./img/Mask group.png"

function HeaderRegisteredUser() {
  const[accInfo, setAccInfo] = useState(
    {
      usedCompanyCount: '',
      companyLimit: ''
    }
  )
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  useEffect(() => {
    console.log("useEffect working, запускаем fetch");
    fetch('https://gateway.scan-interfax.ru/api/v1/account/info',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${token}`
                },
    })
    .then(function(response) {
        console.log('работает первый then')
        let json = response.json(); //ждем, пока получим ответ сервера в JSON
        console.log("json = ", json);
        return json
    })
    .then(function(json) {
        console.log('работает второй then')
        setAccInfo(json.eventFiltersInfo);
        console.log("accInfo = ", accInfo);
    })
  
  }, []); //пустой массив позволяет ограничивает частое обновление:
          // только при монтировании и размонтировании

  return (
    
     <React.Fragment>    
        <header className="header">
          <div className="container">
            <nav className="navbar">
              <div className="logo">
                <Link to=""><img src={ logoScan } alt="logo-scan" /></Link>
              </div>
              <ul className="menu_1">
                <li><Link to="/" className="menu__item">Главная</Link></li>
                <li><Link to="" className="menu__item">Тарифы</Link></li>
                <li><Link to="" className="menu__item">FAQ</Link></li>
                </ul>
              <div className="info_reg_user">
                <div className="info_reg_user_block1">
                  <div className="info_reg_user_text1 info_1">Использовано компаний</div>
                    <div className="info_reg_user_text2 info_2">{accInfo.usedCompanyCount}</div>
                  </div>
                  <div className="info_reg_user_block1">
                    <div className="info_reg_user_text1 info_3">Лимит по компаниям</div>
                    <div className="info_reg_user_text3 info_4">{accInfo.companyLimit}</div>
                  </div>
                </div>
                <div className="menu_reg_user">
                  <div className="menu_reg_user_text">
                    <div className="menu_reg_user_name">{user}</div>
                      <Link to="/logout" className="menu_reg_user_btn">Выйти</Link>
                    </div>                     
                    <Link to="#"><img src={ userPhoto } className="menu_reg_user_img" alt="user photo" /></Link>
                  </div>
                </nav>
          </div>
        </header>
      </React.Fragment>
    )
}

export default HeaderRegisteredUser;