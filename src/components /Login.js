import axios from "axios";
import { UserContext } from "../App";
import {useContext, useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
export default function Login(){
    console.log('Login')
    const [user, setUser] = useContext(UserContext)
    const [err, setErr] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    useEffect(() => {
        const fetchToken = async() =>{
            try{
                const oldRefreshToken = localStorage.getItem('refreshToken')
                const res = await axios.get('/newtoken', {headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${oldRefreshToken}`
                }})
                console.log(res)
                const data = await res.data 
                const {accessToken, refreshToken} = data
                localStorage.setItem('refreshToken', refreshToken)
                setUser({accessToken}) 
                return navigate('/')
            }catch(err){
                console.log(err)
            }
        }
        fetchToken()
    }, [])
    const submit = async(e) =>{
        e.preventDefault()
        try{
            const res = await axios.post('/login', {email, password}, {headers: {
                'Content-Type': 'application/json'
            }})
            const data = await res.data
            console.log(data)
            const refreshToken = data.refreshToken 
            const accessToken = data.accessToken 
            localStorage.setItem('refreshToken', refreshToken)
            setUser({accessToken})
            setErr('')
            return navigate('/')
        }catch(err){
            console.log(err)
            err = err.response.data.err 
            setErr(err)
        }
    }
    return (
        <div className="auth-wrapper">
            <div className="auth Login">
                <h1>Welcome to MyPosts</h1>
                <form onSubmit={submit}>
                    <label htmlFor="email">Email adress</label>
                    <input name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <label htmlFor="password">Password</label>
                    <input 
                    name="password" 
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    type='password'
                    ></input>
                    <button>Login</button>
                    <h3>{err}</h3>
                    <Link to={'/register'}>Register</Link>
                </form>
            </div>
        </div>
    )
}