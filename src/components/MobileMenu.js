import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.png';
import userDefault from '../user-default.png';
import signin from '../signin.png';



const MobileMenu = ({ menuDisplay, mobileMenu, burgerContainer }) => {
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

    const goHome = () => {
        mobileMenu.current.classList.remove("mobile_display")
        burgerContainer.current.classList.remove("open")
    }
    const signIn = () => {
        mobileMenu.current.classList.remove("mobile_display")
        burgerContainer.current.classList.remove("open")
    }
    return (
        <div ref={mobileMenu} className="mobile_menu">
            <div>
                <NavLink onClick={goHome} to="/">
                    <div className="logo_block">
                        <img src={logo} />
                    </div>
                </NavLink>
                <ul className="footer_list footer_list1">
                    <li className="footer_item">
                        <a href="#" className="footer_link">Ресторанам</a>
                    </li>
                    <li className="footer_item">
                        <a href="#" className="footer_link">Курьерам</a>
                    </li>
                    <li className="footer_item">
                        <a href="#" className="footer_link">Пресс-центр</a>
                    </li>
                    <li className="footer_item last_item">
                        <a href="#" className="footer_link">Контакты</a>
                    </li>
                </ul>
                <div className="search_block mobile_search_block">
                    <input className="search_input mobile_search_input" type="text" placeholder="Адрес доставки" />
                </div>
            </div>
            <div>
                {islogined != false && surname !== '' && name !== '' ?
                    <div className="user_block mobile_userBlock">
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
                {islogined == false ?
                    <NavLink onClick={signIn} className="sign_btn mobile_sign_btn" to="/login">
                        <button className="sign_btn mobile_sign_btn">
                            <img src={signin} />
                            Войти
                        </button>
                    </NavLink> : null
                }
            </div>
        </div>


    );
}


export default MobileMenu;