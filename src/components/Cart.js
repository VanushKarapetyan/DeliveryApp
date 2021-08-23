import React, { useEffect, useRef, useState } from 'react';
import close from '../close.png';

const Cart = ({ cartDisplay, count, items1, updowntotal }) => {
    const [sum, setSum] = useState(0);
    const [isChange, setIschange] = useState(null)
    useEffect(() => {
        setIschange(JSON.parse(localStorage.getItem("isChange")))
    }, [localStorage.getItem("isChange")])

    const cartHide = () => {
        document.getElementById("cart_body").classList.remove("cart_body_display")
        document.body.style.overflow = 'auto'
    }
    const cartBody = useRef(null);
    const cart = useRef(null);
    document.addEventListener("mouseup", (e) => {
        if (e.target.contains(cartBody.current)) {
            cart.current.classList.remove("cart_body_display")
            document.body.style.overflow = 'auto'
        }
    })

    function upTotal(event) {
        if (items1 !== []) {
            items1.map((item) => {
                if (item.id == event.target.id) {
                    localStorage.setItem("itemId", item.id)
                    fetch(`http://localhost:3000/cartItems/${item.id}`, {
                        method: "PATCH",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ price: (+item.quantity + 1) * +item.firstPrice, quantity: +event.target.nextElementSibling.innerHTML + 1 })
                    })
                    updowntotal()
                }
            })
        }
    }

    const downTotal = (event) => {
        if (items1 !== []) {
            items1.map((item) => {
                if (item.id == event.target.previousElementSibling.previousElementSibling.id) {
                    if (+event.target.previousElementSibling.innerHTML > 1) {
                        localStorage.setItem("itemId", item.id)
                        fetch(`http://localhost:3000/cartItems/${item.id}`, {
                            method: "PATCH",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ price: +item.price - +item.firstPrice, quantity: +event.target.previousElementSibling.innerHTML - 1 })
                        })
                        updowntotal()
                    }
                }
            })
        }
    }

    const deleteItem = (e) => {
        if (e.target.tagName == "I") {
            let dataKey = e.target.parentElement.getAttribute('data-key')
            let conf = window.confirm('Вы уверены, что хотите удалить этот товар из корзины')
            if (conf == true) {
                fetch(`http://localhost:3000/cartItems/${dataKey}`, { method: 'DELETE' })
            }
        }
        else {
            let dataKey = e.target.getAttribute('data-key')
            let conf = window.confirm('Вы уверены, что хотите удалить этот товар из корзины')
            if (conf == true) {
                fetch(`http://localhost:3000/cartItems/${dataKey}`, { method: 'DELETE' })
                updowntotal()
            }
        }
        updowntotal()
    }

    const empty = () => {
        let conf = window.confirm('Вы уверены, что хотите очистить корзину')
        if (conf == true) {
            items1.map(item => {
                fetch(`http://localhost:3000/cartItems/${item.id}`, { method: 'DELETE' })
                updowntotal()
            })
        }
    }

    return (
        <div ref={cart} id="cart_body" className="cart_body">
            <div ref={cartBody} id="cart_block" className="cart_block">
                <div className="cart_min_block">
                    <div className="cart_header">
                        <p className="cart_title">Корзина</p>
                        <button onClick={cartHide} className="close_cart">
                            <img src={close} />
                        </button>
                    </div>
                    <div className="cart_body_block">
                        {
                            items1 == 0 ?
                                <div className="empty_box">
                                    <p>Ваша корзина пуста</p>
                                </div>
                                : items1.map(item => {
                                    return (
                                        <div key={item.id} className="cart_item">
                                            <div className="item_name_block">
                                                <p className="item_name">{item.name}</p>
                                            </div>
                                            <div className="cart_right">
                                                <p className="item_price">{item.price} ₽</p>

                                                <div className="quantity_block">
                                                    <button id={item.id} onClick={upTotal} className="plus_btn">+</button>
                                                    <p className="item_quantity">{item.quantity}</p>
                                                    <button onClick={downTotal} className="plus_btn minus_btn">-</button>
                                                    <button data-key={item.id} onClick={deleteItem} className="delete_btn">
                                                        <i className="material-icons blue_text">delete</i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                    <div className="cart_footer">
                        <div className="all_price">
                            <p>{count}₽</p>
                        </div>
                        <div className="order_btn_block">
                            <button className="order_btn">Оформить заказ</button>
                            {items1 == 0 ? null : 
                            <button onClick={empty} className="cancel">Очистить</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;