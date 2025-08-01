import React from 'react'
import axios from 'axios'
import { useState } from 'react'

export default function Login() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = (e) => {

        const data = {
            "email": email,
            "password": password,
            "name": name
        }



        axios.post("http://127.0.0.1:8000/test/login/", data).then((e) => console.log(e.data)).catch(e => console.error(e));
    }

    const register = (e) => {

        const data = {
            "email": email,
            "password": password,
            "name": name
        }


        axios.post("http://127.0.0.1:8000/test/create-user/", data).then((e) => console.log(e.data)).catch(e => console.error(e));
    }

    const [indicate, setIndicate] = useState('login')

    return (
        <>

            <form>
                <label>name</label><br />
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>email</label><br />
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label>password</label><br />
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                {
                    (indicate === 'login') ?
                        <h3 onClick={e => setIndicate('register')}>click here to register account</h3> :
                        <h3 onClick={e => setIndicate('login')}>click here to login account</h3>
                }

                <input type="button" value="submit" onClick={() => {
                    if (indicate === 'login') { login() }
                    else if (indicate === 'register') { register() }
                }} />
            </form>


        </>
    )
}







