import React from "react";
import HeaderRegisteredUser from "./HeaderRegisteredUser";
import HeaderNotRegisteredUser from "./HeaderNotRegisteredUser";

function Header() {
    let content;
    const token = localStorage.getItem('token');
    let isLoggedIn = false;
    const expire = localStorage.getItem('expire');

    if (!!token && !!expire) {
        const expireTime = new Date(Date.parse(expire));
        const timeRemain = expireTime - Date.now();
        isLoggedIn = true ? timeRemain > 0 : false;
    }

    if (isLoggedIn) {
        content = <HeaderRegisteredUser />;
    } else {
        content = <HeaderNotRegisteredUser />;
    }

    return (
        <div>
            {content}
        </div>
    );
}

export default Header;