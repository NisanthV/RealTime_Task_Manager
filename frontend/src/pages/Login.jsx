import React, { useState } from 'react'
import { useAuth } from '../AuthContext'
import { api } from '../axios'

export default function Login() {

    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await api.post("token/", { name, email, password });

            login(res.data.access, res.data.refresh);
            window.location.href = "/home";
        } catch (e) {
            alert("invaild credentials");
        }
    }


    return (
        <>

            <form>
                <label>name</label><br />
                <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>email</label><br />
                <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label>password</label><br />
                <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <input type="button" value="submit" onClick={() => {handleLogin}} />
            </form>


        </>
    )
}
