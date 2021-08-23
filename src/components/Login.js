import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Login = () => {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [accounts, setAccounts] = useState('')
    const [islogined, setIslogined] = useState(false)
    const [classes, setClasses] = useState('bi bi-eye-slash d_none')

    const nameOnchange = (event) => {
        if (event.target.value !== '') {
            setName(event.target.value)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("uncorrect").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
        }
    }
    const passOnchange = (event) => {
        setPass(event.target.value)
        document.getElementById("surnameis_required").classList.add("d_none")
        document.getElementById("uncorrect").classList.add("d_none")
        document.getElementById("probel_no").classList.add("d_none")
        document.getElementById("russ").classList.add("d_none")
    }
    useEffect(() => {
        fetch("http://localhost:3000/Accounts")
            .then(res => res.json())
            .then(result =>
                setAccounts(result),
            )
    }, [name])

    const history = useHistory();
    const login = (e) => {
        e.preventDefault()
        if (name !== '' && pass !== '' && pass.indexOf(' ') <= -1 || name.indexOf(' ') <= -1 && /^[A-Za-z0-9]*$/.test(pass)) {
            if (accounts !== '') {
                accounts.map(person => {
                    if (person.name == name && person.password == pass) {
                        setIslogined(true)
                        localStorage.setItem("isLogined", true)
                        history.push("/home")
                        localStorage.setItem("personName", person.name)
                        localStorage.setItem("personUrl", person.url)
                        localStorage.setItem("personSurname", person.surname)
                    }
                    else {
                        document.getElementById("uncorrect").classList.remove("d_none")
                    }
                })
            }
        }
        else if (name == '' || pass == '') {
            document.getElementById("surnameis_required").classList.remove("d_none")
        }
        else if (!/^[A-Za-z0-9]*$/.test(pass)) {
            document.getElementById("russ").classList.remove("d_none")
        }
        else if (pass.indexOf(' ') > -1 || name.indexOf(' ') > -1) {
            document.getElementById("probel_no").classList.remove("d_none")
        }
    }
    const keypressHand = (e) => {
        if (e.key === "Enter") {
            if (name !== '' && pass !== '' && pass.indexOf(' ') <= -1 || name.indexOf(' ') <= -1 && /^[A-Za-z0-9]*$/.test(pass)) {
                if (accounts !== '') {
                    accounts.map(person => {
                        if (person.name == name && person.password == pass) {
                            setIslogined(true)
                            localStorage.setItem("isLogined", true)
                            history.push("/home")
                            localStorage.setItem("personName", person.name)
                            localStorage.setItem("personUrl", person.url)
                            localStorage.setItem("personSurname", person.surname)
                        }
                        else {
                            document.getElementById("uncorrect").classList.remove("d_none")
                        }
                    })
                }
            }
            else if (name == '' || pass == '') {
                document.getElementById("surnameis_required").classList.remove("d_none")
            }
            else if (!/^[A-Za-z0-9]*$/.test(pass)) {
                document.getElementById("russ").classList.remove("d_none")
            }
            else if (pass.indexOf(' ') > -1 || name.indexOf(' ') > -1) {
                document.getElementById("probel_no").classList.remove("d_none")
            }
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

    return (
        <div className="login_block">
            <div className="container">
                <div className="login_row">
                    <form onKeyPress={keypressHand} className="login_form">
                        <h1 className="login_title">Войти</h1>
                        <p>
                            <input placeholder="Ваше имя" className="login_inputs" onChange={nameOnchange} type="text" name="username" id="username" autoComplete="off" />
                        </p>
                        <p>
                            <input maxLength="25" placeholder="Пароль" className="login_inputs pass_input" onChange={passOnchange} type="password" name="password" id="password" />
                            <i onClick={togglePassword} className={classes} id="togglePassword"></i>
                        </p>
                        <p id="surnameis_required" className="error_messege d_none">Поля необходимо заполнить</p>
                        <p id="uncorrect" className="error_messege d_none">Неверное имя или пароль</p>
                        <p id="probel_no" className="error_messege d_none">Поля не должни содержать пробел</p>
                        <p id="russ" className="error_messege d_none">Пароль должен содержать только английские символи</p>
                        <div className="forgot_block">
                            <NavLink to="/forgotpassword" className="forgot_pass">
                                Забыли пароль
                            </NavLink>
                        </div>
                        <div className="button_block">
                            <button onClick={login} className="submit login_btn">Войти</button>
                            <NavLink to="/signup">
                                <button className="submit login_btn">Зарегистрироваться</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;