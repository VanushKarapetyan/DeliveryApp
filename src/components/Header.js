import React, { useEffect, useRef, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import logo from '../logo.png';
import cart from '../cart.png';
import signin from '../signin.png';
import userDefault from '../user-default.png';


const Header = ({ onToggle, menuDisplay, burgerContainer }) => {
    const [islogined, setIslogined] = useState(false)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/cartItems")
            .then(res => res.json())
            .then(result =>
                setItems(result)
            )
        if (localStorage.getItem("personName") !== null && localStorage.getItem("personSurname") !== null) {
            setName(localStorage.getItem("personName")[0].toUpperCase() + localStorage.getItem("personName").slice(1))
            setSurname(localStorage.getItem("personSurname")[0].toUpperCase() + localStorage.getItem("personSurname").slice(1))
        }
        if (localStorage.getItem("isLogined") !== null) {
            if (islogined !== JSON.parse(localStorage.getItem("isLogined"))) {
                setIslogined(JSON.parse(localStorage.getItem("isLogined")))
            } else {
                return
            }
        } else {
            setIslogined(false)
        }
    }, [items])
    const logout = () => {
        let result = window.confirm("Вы действительно хотите выйти")
        if (result === true) {
            localStorage.clear()
            localStorage.setItem("isLogined", false)
            setIslogined(false)
        }
    }

    const burgerMenu = () => {
        burgerContainer.current.classList.toggle("open")
        menuDisplay()
    }
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header_row">
                        <NavLink to="/">
                            <div className="logo_block">
                                <img src={logo} />
                            </div>
                        </NavLink>
                        <div className="search_block">
                            <input className="search_input" type="text" placeholder="Адрес доставки" />
                        </div>
                        {islogined != false && surname !== '' && name !== '' ?
                            <div className="user_block">
                                <div className="userIcon_block">
                                    <img src={userDefault} />
                                    <div className="nmae_block">
                                        <div className="name_img_block">
                                            <img src={userDefault} />
                                        </div>
                                        <div className="user_btn_block">
                                            <div className="name_text_block">
                                                <p className="account_name">{name}</p>
                                                <p>{surname}</p>
                                            </div>
                                            <button onClick={logout} className="logout_btn">
                                                Выйти
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null}
                        <div className="header_btn_block">
                            {islogined == false ?
                                <NavLink className="sign_btn" to="/login">
                                    <button className="sign_btn">
                                        <img src={signin} />
                                        Войти
                                    </button>
                                </NavLink> : null
                            }
                            <button onClick={onToggle} className="cart_btn">
                                <img src={cart} />
                                Корзина
                            </button>
                            <button onClick={onToggle} className="cart_btn cart_btn_two">
                                <img src={cart} />
                            </button>
                            <div ref={burgerContainer} onClick={burgerMenu} className="wrapper-menu">
                                <div className="line-menu half start"></div>
                                <div className="line-menu"></div>
                                <div className="line-menu half end"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}


export default Header;