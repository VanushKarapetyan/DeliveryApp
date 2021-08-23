import React, { useEffect, useState } from 'react';
import cartIcon from "../carticon.png";

const Menu = () => {
    const [menu, setMenu] = useState(null)
    const [id, setId] = useState(null)
    const [arr, setArr] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/restaurants")
            .then(res => res.json())
            .then(result =>
                setMenu(result)
            )
    }, [])
    useEffect(() => {
        fetch("http://localhost:3000/cartItems")
            .then(res => res.json())
            .then(result =>
                setArr(result)
            )
    }, [arr])
    useEffect(() => {
        setId(localStorage.getItem("resId"))
    })

    const addCart = (event) => {
        if (menu !== null && id !== null) {
            menu[id].menu.map((child) => {
                if (arr != 0) {
                    let obj2 = arr.find(item => item.name == menu[id].menu[event.target.id].name);
                    if (obj2 == undefined) {
                        if (child.id == event.target.id) {
                            const obj = {
                                name: child.name,
                                firstPrice: child.price,
                                price: child.price,
                                quantity: child.quantity,
                                id: Math.floor(Math.random())
                            }
                            fetch("http://localhost:3000/cartItems", {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(obj)
                            }).then(() => {
                                localStorage.setItem("isChange", Math.random())
                            })
                        }
                    }
                    else {
                        fetch(`http://localhost:3000/cartItems/${obj2.id}`, {
                            method: "PATCH",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ price: +obj2.price + +obj2.firstPrice, quantity: +obj2.quantity + 1 })
                        })
                    }
                } else {
                    if (child.id == event.target.id) {
                        const obj = {
                            name: child.name,
                            firstPrice: child.price,
                            price: child.price,
                            quantity: child.quantity,
                            id: Math.floor(Math.random())
                        }
                        fetch("http://localhost:3000/cartItems", {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(obj)
                        }).then(() => {
                            localStorage.setItem("isChange", Math.random())
                        })
                    }
                }
            })
        }
    }

    return (
        <div className="container">
            <div className="menu_body">
                {menu !== null && id !== null ?
                    menu[id].menu.map((value) => {
                        return (
                            <div className="menu_block" key={value.id}>
                                <div className="menu_img_block">
                                    <img className="menu_img" src={value.src} />
                                </div>
                                <div className="menu_text_block">
                                    <p className="menu_name">{value.name}</p>
                                    <p className="menu_des">{value.des}</p>
                                    <div className="price_block">
                                        <button id={value.id} onClick={addCart}
                                            className="add_cart_btn">
                                            В корзину
                                            <img className="cart_icon" src={cartIcon} />
                                        </button>
                                        <p className="price">{value.price} ₽</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : null}
            </div>
        </div>
    );
}



export default Menu;