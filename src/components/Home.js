import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SectionImg from '../section.png';
import star from '../star.png';

const Home = () => {
    const [res, setRes] = useState(null)
    const [res2, setRes2] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/restaurants")
            .then(res => res.json())
            .then(result =>
                setRes(result)
            )
    }, [])
    useEffect(() => {
        fetch("http://localhost:3000/restaurants")
            .then(res => res.json())
            .then(result =>
                setRes2(result)
            )
    }, [])

    const clearBtn = useRef(null)
    const clearValue = () => {
        clearBtn.current.previousElementSibling.value = ''
        setRes(res2)
        clearBtn.current.classList.remove("btn_display")
    }
    const search = (event) => {

        if (event.target.value !== '' && res !== null) {
            clearBtn.current.classList.add("btn_display")
            var answer = '';
            function translit(word) {
                var converter = {
                    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                    'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
                    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
                    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
                    'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
                    'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
                    'э': 'e', 'ю': 'yu', 'я': 'ya',
                };
                var converter2 = {
                    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
                    'e': 'е', 'yo': 'ё', 'zh': 'ж', 'z': 'з', 'и': 'i',
                    'y': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
                    'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т',
                    'u': 'у', 'f': 'ф', 'h': 'х', 'c': 'ц', 'we': 'ч',
                    'sh': 'ш', 'sch': 'щ', 'y': 'ы', 'yu': 'ю', 'ya': 'я',
                };



                function isRus(text) {
                    if (/[а-я]/i.test(text)) {
                        for (var i = 0; i < word.length; i++) {
                            if (converter[word[i]] == undefined) {
                                answer += word[i];
                            } else {
                                answer += converter[word[i]];
                            }
                        }
                    } else {
                        for (var i = 0; i < word.length; i++) {
                            if (converter2[word[i]] == undefined) {
                                answer += word[i];
                            } else {
                                answer += converter2[word[i]];
                            }
                        }
                    }
                }
                isRus(event.target.value)
            }
            translit(event.target.value);
            const result = res2.filter(word => word.name.indexOf(event.target.value) !== -1 || word.name.toLowerCase().indexOf(event.target.value) !== -1 || word.name.toUpperCase().indexOf(event.target.value) !== -1 || word.name.indexOf(answer) !== -1 || word.name.toLowerCase().indexOf(answer) !== -1 || word.name.toUpperCase().indexOf(answer) !== -1)
            setRes(result)
            if (event.target.value.length > 1 && !(/[а-я]/i.test(event.target.value))) {
                function translit(word) {
                    const converter = {
                        'sch': 'щ',

                        'yo': 'ё', 'zh': 'ж', 'ch': 'ч', 'sh': 'ш', 'yu': 'ю', 'ya': 'я',

                        'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д',
                        'e': 'е', 'z': 'з', 'i': 'и', 'y': 'й', 'k': 'к',
                        'l': 'л', 'm': 'м', 'n': 'н', 'o': 'о', 'p': 'п',
                        'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф',
                        'h': 'х', 'c': 'ц', 'y': 'ы',
                    };

                    for (const [key, value] of Object.entries(converter)) {
                        word = word.replaceAll(key, value);
                    }

                    return word;
                }

                const result = res2.filter(word => word.name.indexOf(translit(event.target.value)) !== -1 || word.name.toLowerCase().indexOf(translit(event.target.value)) !== -1 || word.name.toUpperCase().indexOf(translit(event.target.value)) !== -1)
                setRes(result)
            }
        }
        else if (event.target.value === '' && res2 !== null) {
            clearBtn.current.classList.remove("btn_display")
            setRes(res2)
        }
    }


    return (
        <div>
            <div className="container">
                <div className="first_section">
                    <div className="text_block">
                        <p className="section_title">Онлайн-сервис доставки еды на дом</p>
                        <p className="section_des">Блюда из любимого ресторана привезет курьер в перчатках, маске и с антисептиком</p>
                    </div>
                </div>
                <div className="restaurants_block">

                    <div className="restaurants_header">
                        <p className="restaurants_title">Рестораны</p>
                        <div className="search_box">
                            <input autoComplete="off" onChange={search} id="searchInput" className="restaurants_search" type="text" placeholder="Поиск блюд и ресторанов" />
                            <button onClick={clearValue} ref={clearBtn} className="clear_value_btn">
                                <i className="material-icons">close</i>
                            </button>
                        </div>

                    </div>
                    <div className="restaurants_body">
                        {res !== null && res !== [] ? res.map((restaurant) => {
                            return (
                                <NavLink onClick={() => localStorage.setItem("resId", restaurant.id)} className="home_link" id={restaurant.id} key={restaurant.id} to="/menu">
                                    <div className="res_block">
                                        <div className="res_img_block">
                                            <img className="res_img" src={restaurant.src} />
                                        </div>
                                        <div className="rex_text_block">
                                            <div className="res_name_block">
                                                <p className="res_name">{restaurant.name}</p>
                                                <div className="res_time_block">
                                                    {restaurant.time}
                                                </div>
                                            </div>
                                            <div className="star_des_block">
                                                <div className="star_block">
                                                    <div className="star_img_block">
                                                        <img src={star} />
                                                    </div>
                                                    <p className="stars_text">{restaurant.stars}</p>
                                                </div>
                                                <div className="res_des_block">
                                                    <p className="res_text">{restaurant.des}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;