import React, { useState } from "react";

import '../styles/OurAdvantages.css';

function OurAdvantages() {
    
  let carousel = document.getElementById('carousel');
    /* этот код помечает картинки, для удобства разработки */
    let i = 1;
    for(let li of carousel.querySelectorAll('li')) {
      li.style.position = 'relative';
      li.insertAdjacentHTML('beforeend', `<span style="position:absolute;left:0;top:0">${i}</span>`);
      i++;
    }

    /* конфигурация */
    let width = 130; // ширина картинки
    let count = 3; // видимое количество изображений

    let list = carousel.querySelector('ul');
    let listElems = carousel.querySelectorAll('li');

    let position = 0; // положение ленты прокрутки

    carousel.querySelector('.prev').onclick = function() {
      // сдвиг влево
      position += width * count;
      // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
      position = Math.min(position, 0)
      list.style.marginLeft = position + 'px';
    };

    carousel.querySelector('.next').onclick = function() {
      // сдвиг вправо
      position -= width * count;
      // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
      position = Math.max(position, -width * (listElems.length - count));
      list.style.marginLeft = position + 'px';
    };

    return (
      <React.Fragment>
        <div>
          <h2>Почему именно мы</h2>
        </div>
      
        <div id="carousel" className="carousel">
          <button className="arrow prev">⇦</button>
          <div className="gallery">
            <ul>
              <li><img src="https://ru.js.cx/carousel/1.png" /></li>
              <li><img src="https://ru.js.cx/carousel/2.png" /></li>
              <li><img src="https://ru.js.cx/carousel/3.png" /></li>
              <li><img src="https://ru.js.cx/carousel/4.png" /></li>
              <li><img src="https://ru.js.cx/carousel/5.png" /></li>
              <li><img src="https://ru.js.cx/carousel/6.png" /></li>
              <li><img src="https://ru.js.cx/carousel/7.png" /></li>
              <li><img src="https://ru.js.cx/carousel/8.png" /></li>
              <li><img src="https://ru.js.cx/carousel/9.png" /></li>
              <li><img src="https://ru.js.cx/carousel/10.png" /></li>
            </ul>
          </div>
          <button className="arrow next">⇨</button>
        </div>
      </React.Fragment>
    );
  }

  export default OurAdvantages;
  