import axios from "axios";
import { UserContext } from "../App";
import {useState, useReducer, useContext} from 'react';
import { PostContext } from "./Home";
export default function Post({url, caption, id}){
    const [user, setUser] = useContext(UserContext)
    const [posts, setPosts] = useContext(PostContext)
    const deletePost = async() =>{
        try{
            const res = await axios.delete(`/image/${id}`, {headers: {
                'Authorization': `Bearer ${user.accessToken}`,
                "Content-Type": "application/json"
            }})
            console.log(res)
            setPosts(prev => {
                const newArr = prev.map(item => {
                    console.log(item)
                    if(item.props.id !== id) return item
                })
                return newArr
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="card">
            <div className="top">
                <img src={url}></img>
            </div>
            <div className="bottom">
                <p>{caption ? caption : "'No caption'"}</p>
                <button onClick={deletePost}>Delete</button>
            </div>
        </div>
    )
}