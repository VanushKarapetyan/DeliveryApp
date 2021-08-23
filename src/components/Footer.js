import React from 'react';
import logo from '../logo.png';
import instagram from '../instagram.png';
import facebook from '../facebook.png';
import vkantakte from '../vkantakte.png';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer_row">
                    <div className="footer_left">
                        <div className="logo_block footer_logo">
                            <img src={logo} />
                        </div>
                        <ul className="footer_list">
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
                    </div>
                    <div className="footer_right">
                        <div className="instagram_img_block">
                            <a href="#">
                                <img src={instagram} alt={instagram} />
                            </a>
                        </div>
                        <div className="instagram_img_block">
                            <a href="#">
                                <img src={facebook} alt={facebook} />
                            </a>
                        </div>
                        <div className="vkantakte_img_block">
                            <a href="#">
                                <img src={vkantakte} alt={vkantakte} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Footer;