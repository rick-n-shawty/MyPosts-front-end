import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import {useNavigate, Link} from 'react-router-dom';
export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useContext(UserContext)
    const [msg, setMsg] = useState('')
    const submit = async (e) =>{
        e.preventDefault()
        try{
            const res = await axios.post('/signup', {email, password}, {headers: {
                "Content-Type": "application/json"
            }})
            console.log(res)
            const data = res.data.msg 
            setMsg(data)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="auth-wrapper">
            <div className="auth">
                <h1>Welcome to MyPosts</h1>
                <form onSubmit={submit}>
                    <label htmlFor="email">Email adress</label>
                    <input name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                    <input 
                    name="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    />
                    <button>Sign up</button>
                    <h3>{msg}</h3>
                    <Link to={'/login'}>Login</Link>
                </form>
            </div>
        </div>
    )
}