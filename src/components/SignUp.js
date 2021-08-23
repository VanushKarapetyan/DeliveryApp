import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Route, Router, useHistory } from 'react-router-dom';


const Signup = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [classes, setClasses] = useState('bi bi-eye-slash d_none')
    const [accounts, setAccounts] = useState('')

    const nameOnchange = (event) => {
        if (event.target.value !== '') {
            setName(event.target.value)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
        }
    }
    const surnameOnchange = (event) => {
        if (event.target.value !== '') {
            setSurname(event.target.value)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
        }
    }
    const passOnchange = (event) => {
        if (event.target.value !== '') {
            setPass(event.target.value)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
            document.getElementById("russ").classList.add("d_none")
            document.getElementById("pass_exists").classList.add("d_none")
            fetch("http://localhost:3000/Accounts")
                .then(res => res.json())
                .then(result =>
                    setAccounts(result),
                )
        }
    }

    const confpassOnchange = (event) => {
        if (event.target.value !== '') {
            setConfpass(event.target.value)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
            document.getElementById("russ").classList.add("d_none")
            document.getElementById("pass_exists").classList.add("d_none")
        }
    }

    useEffect((e) => {
        if (pass.length > 0) {
            setClasses(classes.replace(" d_none", ""))
        } else {
            if (classes == 'bi bi-eye-slash') {
                setClasses(classes + " d_none")
            }
        }
    })


    const password = document.querySelector('#password');
    const togglePassword = (e) => {
        if (pass.length > 0) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            e.target.classList.toggle('bi-eye');
        }
    }
    const history = useHistory();
    const signup = (e) => {
        e.preventDefault()
        if (name !== '' && surname !== '' && pass.indexOf(' ') <= -1 || confpass.indexOf(' ') <= -1 || name.indexOf(' ') <= -1 || surname.indexOf(' ') <= -1 && pass.length >= 6 && /^[A-Za-z0-9]*$/.test(pass) && pass == confpass) {
            accounts.forEach(account => {
                if (account.name == name && account.surname == surname && account.password != pass) {
                    let isTrue = window.confirm("У вас есть учетная запись, сменить пароль?")
                    if (isTrue == true) {
                        fetch(`http://localhost:3000/Accounts/${account.id}`, {
                            method: "PATCH",
                            headers: { "Content-type": "application/json" },
                            body: JSON.stringify({ password: pass })
                        })
                        e.preventDefault()
                        setName('')
                        setSurname('')
                        setPass('')
                        setConfpass('')
                        history.push("/home")
                        localStorage.setItem("isLogined", true)
                        localStorage.setItem("personName", name)
                        localStorage.setItem("personSurname", surname)
                    }
                }
                else if (account.password !== pass) {
                    const obj = {
                        name: name,
                        surname: surname,
                        password: pass,
                        id: Math.floor(Math.random)
                    }
                    fetch("http://localhost:3000/Accounts", {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(obj)
                    }).then(() => {
                    })
                    e.preventDefault()
                    setName('')
                    setSurname('')
                    setPass('')
                    setConfpass('')
                    history.push("/home")
                    localStorage.setItem("isLogined", true)
                    localStorage.setItem("personName", name)
                    localStorage.setItem("personSurname", surname)
                }
                else if (account.name == name && account.surname == surname && account.password == pass) {
                    let isTrue2 = window.confirm('У вас уже есть учетная запись, войти в него?')
                    if (isTrue2 == true) {
                        localStorage.setItem("isLogined", true)
                        history.push("/home")
                        localStorage.setItem("personName", account.name)
                        localStorage.setItem("personUrl", account.url)
                        localStorage.setItem("personSurname", account.surname)
                    }
                }
                else if (account.password == pass && account.name !== name && account.surname !== surname) {
                    document.getElementById("pass_exists").classList.remove("d_none")
                }
            });
        }
        else if (name == '' || surname == '' || pass == '' || confpass == '') {
            document.getElementById("surnameis_required").classList.remove("d_none")
        }
        else if (pass.indexOf(' ') >= -1 || confpass.indexOf(' ') >= -1 || name.indexOf(' ') >= -1 || surname.indexOf(' ') >= -1) {
            document.getElementById("probel_no").classList.remove("d_none")
        }
        else if (!/^[A-Za-z0-9]*$/.test(pass)) {
            document.getElementById("russ").classList.remove("d_none")
        }
        else if (pass.length < 6) {
            document.getElementById("minsix").classList.remove("d_none")
        } else if (pass !== confpass) {
            document.getElementById("mismatch").classList.remove("d_none")
        }
    }

    const keypressHandler = (e) => {
        if (e.key === "Enter") {
            if (name !== '' && surname !== '' && pass.indexOf(' ') <= -1 || confpass.indexOf(' ') <= -1 || name.indexOf(' ') <= -1 || surname.indexOf(' ') <= -1 && pass.length >= 6 && /^[A-Za-z0-9]*$/.test(pass) && pass == confpass) {
                accounts.forEach(account => {
                    if (account.name == name && account.surname == surname && account.password != pass) {
                        let isTrue = window.confirm("У вас есть учетная запись, сменить пароль?")
                        if (isTrue == true) {
                            fetch(`http://localhost:3000/Accounts/${account.id}`, {
                                method: "PATCH",
                                headers: { "Content-type": "application/json" },
                                body: JSON.stringify({ password: pass })
                            })
                            e.preventDefault()
                            setName('')
                            setSurname('')
                            setPass('')
                            setConfpass('')
                            history.push("/home")
                            localStorage.setItem("isLogined", true)
                            localStorage.setItem("personName", name)
                            localStorage.setItem("personSurname", surname)
                        }
                    }
                    else if (account.password !== pass) {
                        const obj = {
                            name: name,
                            surname: surname,
                            password: pass,
                            id: Math.floor(Math.random)
                        }
                        fetch("http://localhost:3000/Accounts", {
                            method: 'POST',
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(obj)
                        }).then(() => {
                        })
                        e.preventDefault()
                        setName('')
                        setSurname('')
                        setPass('')
                        setConfpass('')
                        history.push("/home")
                        localStorage.setItem("isLogined", true)
                        localStorage.setItem("personName", name)
                        localStorage.setItem("personSurname", surname)
                    }
                    else if (account.name == name && account.surname == surname && account.password == pass) {
                        localStorage.setItem("isLogined", true)
                        history.push("/home")
                        localStorage.setItem("personName", account.name)
                        localStorage.setItem("personUrl", account.url)
                        localStorage.setItem("personSurname", account.surname)
                    }
                    else if (account.password == pass && account.name !== name && account.surname !== surname) {
                        document.getElementById("pass_exists").classList.remove("d_none")
                    }
                });
            }
            else if (name == '' || surname == '' || pass == '' || confpass == '') {
                document.getElementById("surnameis_required").classList.remove("d_none")
            }
            else if (pass.indexOf(' ') >= -1 || confpass.indexOf(' ') >= -1 || name.indexOf(' ') >= -1 || surname.indexOf(' ') >= -1) {
                document.getElementById("probel_no").classList.remove("d_none")
            }
            else if (!/^[A-Za-z0-9]*$/.test(pass)) {
                document.getElementById("russ").classList.remove("d_none")
            }
            else if (pass.length < 6) {
                document.getElementById("minsix").classList.remove("d_none")
            } else if (pass !== confpass) {
                document.getElementById("mismatch").classList.remove("d_none")
            }
        }
    }
    return (
        <div className="login_block signup_block">
            <div className="container">
                <div className="login_row">
                    <form onKeyPress={keypressHandler} className="login_form">
                        <h1 className="login_title">Регистрация</h1>
                        <p>
                            <input maxLength="50" name="input" placeholder="Ваше имя" className="login_inputs" onChange={nameOnchange} type="text" name="username" id="username" autoComplete="off" />
                        </p>
                        <p>
                            <input maxLength="50" name="input" placeholder="Ваша фамилия" className="login_inputs" onChange={surnameOnchange} type="text" name="surname" id="surname" autoComplete="off" />
                        </p>
                        <p>
                            <input maxLength="25" name="input" placeholder="Пароль" className="login_inputs pass_input" onChange={passOnchange} type="password" name="password" id="password" />
                            <i onClick={togglePassword} className={classes} id="togglePassword"></i>
                        </p>
                        <p>
                            <input maxLength="25" name="input" placeholder="Подтвердите пароль" className="login_inputs" onChange={confpassOnchange} type="password" name="confpass" id="confpassword" />
                        </p>

                        <p id="surnameis_required" className="error_messege d_none">Поля необходимо заполнить</p>
                        <p id="minsix" className="error_messege d_none">Пароль должен состоять минимум из шести символов</p>
                        <p id="mismatch" className="error_messege d_none">Пароли не совпадают</p>
                        <p id="probel_no" className="error_messege d_none">Поля не должни содержать пробел</p>
                        <p id="russ" className="error_messege d_none">Пароль должен содержать только английские символи</p>
                        <p id="pass_exists" className="error_messege d_none">Такой пароль уже существует</p>


                        <div className="button_block">
                            <button onClick={signup} className="submit login_btn">Зарегистрироваться</button>
                            <NavLink to="/login">
                                <button className="submit login_btn">Назад</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Signup;