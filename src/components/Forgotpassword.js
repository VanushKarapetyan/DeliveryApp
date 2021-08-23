import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';


const Forgotpassword = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [accounts, setAccounts] = useState('')
    const [isfind, setIsfind] = useState(true)
    const nameOnchange = (event) => {
        if (event.target.value !== '') {
            setName(event.target.value)
            setIsfind(true)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
        }
    }
    const surnameOnchange = (event) => {
        if (event.target.value !== '') {
            setSurname(event.target.value)
            setIsfind(true)
            document.getElementById("surnameis_required").classList.add("d_none")
            document.getElementById("probel_no").classList.add("d_none")
        }
    }

    useEffect(() => {
        fetch("http://localhost:3000/Accounts")
            .then(res => res.json())
            .then(result =>
                setAccounts(result),
            )
    }, [name])

    const history = useHistory();
    const find = (e) => {
        e.preventDefault()
        if (name !== '' && surname !== '' && name.indexOf(' ') <= -1 || surname.indexOf(' ') <= -1) {
            if (accounts !== '') {
                accounts.map(person => {
                    if (name == person.name && surname == person.surname) {
                        history.push("/changepassword")
                        localStorage.setItem("changeId", person.id)
                    }
                    else {
                        setIsfind(false)
                    }
                })
            }
        } else if (name == '' || surname == '') {
            document.getElementById("surnameis_required").classList.remove("d_none")
        }
        else if (name.indexOf(' ') > -1 || surname.indexOf(' ') > -1) {
            document.getElementById("probel_no").classList.remove("d_none")
        }
    }
    const keyPressHAndler = (e) => {
        if (e.key === "Enter") {
            if (name !== '' && surname !== '' && name.indexOf(' ') <= -1 || surname.indexOf(' ') <= -1) {
                if (accounts !== '') {
                    accounts.map(person => {
                        if (name == person.name && surname == person.surname) {
                            history.push("/changepassword")
                            localStorage.setItem("changeId", person.id)
                        }
                        else {
                            setIsfind(false)
                        }
                    })
                }
            } else if (name == '' || surname == '') {
                document.getElementById("surnameis_required").classList.remove("d_none")
            }
            else if (name.indexOf(' ') > -1 || surname.indexOf(' ') > -1) {
                document.getElementById("probel_no").classList.remove("d_none")
            }
        }
    }
    return (
        <div className="login_block">
            <div className="container">
                <div className="login_row">
                    <form onKeyPress={keyPressHAndler} className="login_form">
                        <h1 className="login_title">Найдите свой аккаунт</h1>
                        <p>
                            <input maxLength="50" placeholder="Ваше имя" className="login_inputs" onChange={nameOnchange} type="text" name="username" id="username" autoComplete="off" />
                        </p>
                        <p className="surname_input_block">
                            <input maxLength="50" name="input" placeholder="Ваша фамилия" className="login_inputs surname_input" onChange={surnameOnchange} type="text" name="surname" id="surname" autoComplete="off" />
                        </p>
                        <p id="surnameis_required" className="surnameis_required error_messege d_none">Поля необходимо заполнить</p>
                        <p id="probel_no" className="error_messege d_none">Поля не должни содержать пробел</p>
                        {isfind == false ? <p className="error_messege not_find_text">Нет такой учетной записи</p> : null}
                        <div className="button_block">
                            <button onClick={find} className="submit login_btn">Найти</button>
                            <NavLink to="/login">
                                <button className="login_btn">Назад</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Forgotpassword;