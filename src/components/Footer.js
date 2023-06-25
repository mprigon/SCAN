import React from 'react';

//import '../styles/Footer.css';

import '../components/css/style.css';

import logoScan from "./img/eqw 1.png";

const Footer = () => {
    return (
        <div className="container">
            <footer className="footer">
                <div className="logo">
                  <img src={ logoScan } alt="logo-scan" />
                </div>
                <div className="footer_text">
                    <div className="footer_address">г. Москва, Цветной б-р, 40 +7 495 771 21 11 info@skan.ru</div>
                    <div className="footer_copyright">Copyright. 2022</div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;
