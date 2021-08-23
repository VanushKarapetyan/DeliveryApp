import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Changepassword = () => {
    const [pass, setPass] = useState('')
    const [confpass, setConfpass] = useState('')
    const [classes, setClasses] = useState('bi bi-eye-slash d_none')
    const [accounts, setAccounts] = useState('')
    const [changeId, setChangeid] = useState(null)
    useEffect(() => {
        fetch("http://localhost:3000/Accounts")
            .then(res => res.json())
            .then(result =>
                setAccounts(result),
            )
    }, [pass])
    useEffect(() => {
        setChangeid(JSON.parse(localStorage.getItem("changeId")))
    })
    const passOnchange = (event) => {
        if (event.target.value !== '') {
            setPass(event.target.value)
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
            document.getElementById("russ").classList.add("d_none")
        }
    }

    const confpassOnchange = (event) => {
        if (event.target.value !== '') {
            setConfpass(event.target.value)
            document.getElementById("mismatch").classList.add("d_none")
            document.getElementById("minsix").classList.add("d_none")
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
            document.getElementById("russ").classList.add("d_none")
        }
    }

    const history = useHistory();

    const save = (e) => {
        e.preventDefault()
        if (pass !== '' && confpass !== '' && pass.indexOf(' ') < -1 || confpass.indexOf(' ') < -1 && /^[A-Za-z0-9]*$/.test(pass) && pass.length >= 6 && pass == confpass) {
            if (accounts !== '' && changeId !== null) {
                fetch(`http://localhost:3000/Accounts/${changeId}`, {
                    method: "PATCH",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({ password: pass })
                })
                history.push("/login")

            }
        }
        else if (pass == '' || confpass == '') {
            document.getElementById("surnameis_required").classList.remove("d_none")
        }
        else if (!/^[A-Za-z0-9]*$/.test(pass)) {
            document.getElementById("russ").classList.remove("d_none")
        }
        else if (pass.length < 6) {
            document.getElementById("minsix").classList.remove("d_none")
        }
        else if (pass.indexOf(' ') < -1 || confpass.indexOf(' ') < -1) {
            document.getElementById("probel_no").classList.remove("d_none")
        }
        else if (pass.length >= 6 && pass !== confpass) {
            document.getElementById("mismatch").classList.remove("d_none")
        }
    }
    const keypressHandler = (e) => {
        if (e.key === "Enter") {
            if (pass !== '' && confpass !== '' && pass.indexOf(' ') <= -1 || confpass.indexOf(' ') <= -1 && /^[A-Za-z0-9]*$/.test(pass) && pass.length >= 6 && pass == confpass) {
                if (accounts !== '' && changeId !== null) {
                    fetch(`http://localhost:3000/Accounts/${changeId}`, {
                        method: "PATCH",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({ password: pass })
                    })
                    history.push("..")

                }
            }
            else if (pass == '' || confpass == '') {
                document.getElementById("surnameis_required").classList.remove("d_none")
            }
            else if (!/^[A-Za-z0-9]*$/.test(pass)) {
                document.getElementById("russ").classList.remove("d_none")
            }
            else if (pass.length < 6) {
                document.getElementById("minsix").classList.remove("d_none")
            }
            else if (pass.indexOf(' ') <= -1 || confpass.indexOf(' ') <= -1) {
                document.getElementById("probel_no").classList.remove("d_none")
            }
            else if (pass.length >= 6 && pass !== confpass) {
                document.getElementById("mismatch").classList.remove("d_none")
            }
        }
    }
    const password = document.querySelector('#password');
    const togglePassword = (e) => {
        if (pass.length > 0) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            e.target.classList.toggle('bi-eye');
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
    return (
        <div className="login_block signup_block">
            <div className="container">
                <div className="login_row">
                    <form onKeyPress={keypressHandler} className="login_form">
                        <h1 className="login_title">Изменение пароля</h1>
                        <p>
                            <input maxLength="25" name="input" placeholder="Новый пароль" className="login_inputs pass_input" onChange={passOnchange} type="password" name="password" id="password" />
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
                        <div className="button_block">
                            <button onClick={save} className="submit login_btn">Сохранить</button>
                            <NavLink to="/forgotpassword">
                                <button className="login_btn">Назад</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Changepassword;