import { useState } from 'react'
import axios from 'axios'
import IMC from './IMC'

function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(null)

    const login = async () => {

        const res = await axios.post('http://localhost:3001/api/auth/login', {
            email,
            password
        })

        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
    }

    if(token){
        return <IMC />
    }

    return(
        <div>
            <h2>Login</h2>

            <input
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button onClick={login}>Entrar</button>
        </div>
    )
}

export default Login