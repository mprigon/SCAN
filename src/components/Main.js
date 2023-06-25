import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import Header from './Header';

//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

import '../styles/Main.css';
import '../styles/Carousel.css';

import '../components/css/style.css';


import mainFirstImg from "./images/1_main_page.jpg";
import searchMan from "./img/2398 1.png";
import mainPicture from "./img/Group 14.png";
import tariff1Img from "./img/Group 1171274215.png";
import tariff2Img from "./img/Group 1171274216.png";
import tariff3Img from "./img/Group 1171274214.png";

import greenBird from "./img/icons8-галочка-96 1.png";

import why_we_img1 from "./img/Mask group1.png";
import why_we_img2 from "./img/Mask group2.png";
import why_we_img3 from "./img/Mask group3.png";
import why_we_img4 from "./img/5087784.png";
import why_we_img5 from "./img/download1.png";
import why_we_img6 from "./img/test-tube.png";
import why_we_img7 from "./img/1720554.png";
import why_we_img8 from "./img/download2.png";

function Main() {
    const token = localStorage.getItem('token');
    let isLoggedIn = false;
    const expire = localStorage.getItem('expire');

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
        <section>
          <div className="container">
            <div className="main_search">
              <div>
                <h1>СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕЕ ИНН</h1>
                <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
                {isLoggedIn && <Link to='request' className="main_search_btn">Запросить данные</Link>}
              </div>
              <div className="main_search_picture">
                <Link to="#"><img src={searchMan} alt="search_man" /></Link>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className='container'>
            <div className="main_why_we">
              <div className="why_we_card_block">
              <div class="why_we_header">
                <h1>Почему именно мы</h1>
              </div>
              <Carousel show={3}>
              <div className="why_we_card1">
                <img src={why_we_img1} className="card1_img" />
                <div className="card1_text">Высокая и оперативная скорость обработки заявки</div>
              </div>
              <div className="why_we_card2">
                <img src={why_we_img2} className="card2_img" />
                <div className="card2_text">Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</div>
              </div>

              <div className="why_we_card2">
                <img src={why_we_img3} className="card3_img" />
                <div className="card3_text">Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</div>
              </div>

              <div className="why_we_card2">
                <img src={why_we_img4} className="card4_img" />
                <div className="card3_text">текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент.</div>
              </div>
          
              <div className="why_we_card2">
                <img src={why_we_img5} className="card4_img" />
                <div className="card3_text">текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент.</div>
              </div>

              <div className="why_we_card2">
                <img src={why_we_img6} className="card4_img" />
                <div className="card3_text">текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент.</div>
              </div>

              <div className="why_we_card2">
                <img src={why_we_img7} className="card4_img" />
                <div className="card3_text">текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент.</div>
              </div>
              
              <div className="why_we_card2">
                <img src={why_we_img8} className="card4_img" />
                <div className="card3_text">текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент. текстовый элемент.</div>
              </div>
        </Carousel>

            </div>
          </div>
          </div>
        </section>

        <div className="container">
            <div className="main_img">
              <img src={ mainPicture } alt="main picure" />
            </div>
        </div>

        <section>
          <div className="container">
            <div className="main_tariffs">
              <div className="main_tariffs_header">наши тарифы</div>
                <div className="main_tariffs_block">
                  
                  <div className="main_tariffs_block_tariff1">
                    <div className="tariff_details">
                      <div className="tariff_details_header">
                        <div className="tariff_details_header_text">
                          <h1>Beginner</h1>
                          <p>Для небольшого исследования</p>
                        </div>
                        <img src={ tariff1Img } />
                      </div>
                      <div className="tariff_details_body_tariff1">
                      <div className="tariff_current">Текущий тариф</div>
                      <ul className="tariff_prices">
                        <li className="tariff_price1">799 ₽</li>
                        <li className="tariff_price2">1 200 ₽</li>
                      </ul>                                    
                      <div className="tariff_installment">или 150 ₽/мес. при рассрочке на 24 мес.</div>
                      <div className="tariff_conditions">
                        <h3>В тариф входит:</h3>
                        <ul>
                          <li><img src={ greenBird } />Безлимитная история запросов</li>
                          <li><img src={ greenBird } />Безопасная сделка</li>
                          <li><img src={ greenBird } />Поддержка 24/7</li>
                        </ul>
                      </div>
                      <a href="#" className="tariff_btn">Перейти в личный кабинет</a>
                      </div>                            
                    </div>
                  </div>

                  <div className="main_tariffs_block_tariff2">
                    <div className="tariff_details">
                      <div className="tariff_details_header tariff2_details_header">
                        <div className="tariff_details_header_text">
                          <h1>Pro</h1>
                          <p>Для HR и фрилансеров</p>
                        </div>
                        <img src={ tariff2Img } />
                      </div>
                      <div className="tariff_details_body">
                        <ul className="tariff_prices">
                          <li className="tariff_price1">1 299 ₽</li>
                          <li className="tariff_price2">2 600 ₽</li>
                        </ul>                                   
                        <div className="tariff_installment">или 279 ₽/мес. при рассрочке на 24 мес.</div>
                        <div className="tariff_conditions">
                          <h3>В тариф входит:</h3>
                          <ul>
                            <li><img src={ greenBird } />Все пункты тарифа Beginner</li>
                            <li><img src={ greenBird } />Экспорт истории</li>
                            <li><img src={ greenBird } />Рекомендации по приоритетам</li>
                          </ul>
                        </div>
                        <a href="#" className="tariff_inactive_btn">Подробнее</a>
                      </div>
                    </div>
                  </div>
        
                  <div className="main_tariffs_block_tariff3">
                    <div className="tariff_details">
                      <div className="tariff_details_header tariff3_details_header">
                        <div className="tariff3_details_header_text">
                         <h1>Business</h1>
                         <p>Для корпоративных клиентов</p>
                       </div>
                       <img src={ tariff3Img } />
                      </div>
                      <div className="tariff_details_body">
                        <ul className="tariff_prices">
                          <li className="tariff_price1">2 379 ₽</li>
                          <li className="tariff_price2">3 700 ₽</li>
                        </ul>                                    
                        <div className="tariff_conditions conditions_tariff3">
                          <h3>В тариф входит:</h3>
                            <ul>
                              <li><img src={ greenBird } />Все пункты тарифа Pro</li>
                              <li><img src={ greenBird } />Безлимитное количество запросов</li>
                              <li><img src={ greenBird } />Приоритетная поддержка</li>
                            </ul>
                        </div>
                        <a href="#" className="tariff_inactive_btn">Подробнее</a>
                      </div>
                    </div>                     
                  </div>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    );
  }

  export default Main;
  