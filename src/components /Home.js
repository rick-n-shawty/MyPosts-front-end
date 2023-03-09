import {useState, useContext, useEffect, createContext} from 'react';
import { UserContext } from '../App';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import Header from './Header';
import Post from './PostCard';
export const PostContext = createContext([])
export default function Home(){
    const [user, setUser] = useContext(UserContext)
    const [file, setFile] = useState()
    const [caption, setCaption] = useState('')
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        console.log('Home')
        if(!user.accessToken) return navigate('/login')
        const fetchImages = async () => {
            try{
                const token = user.accessToken
                const res = await axios.get('/images', {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }})
                const data = await res.data.posts 
                const imageArray = data.map(item => {
                    return <Post key={item.imageUrl} id={item.imageName} url={item.imageUrl} caption={item.caption}/>
                })
                setPosts(imageArray)
            }catch(err){
                console.log(err)
            }
        }
        fetchImages()
    }, [])
    const submit = async (e) => {
        try{
            const token = user.accessToken
            e.preventDefault()
            const formData = new FormData()
            formData.append('caption', caption)
            formData.append('image', file)
            const res = await axios.post('/images', formData, {headers: {
              'Content-Type': 'multipart/form-data',
              'authorization': `Bearer ${token}`
            }})
            console.log(res)
            const res2 = await axios.get('/images', {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }})
            const data = await res2.data.posts 
            const imageArray = data.map(item => {
                return <Post id={item.imageName} key={item.imageUrl} url={item.imageUrl} caption={item.caption}/>
            })
            setPosts(imageArray)
            setCaption('')
            setFile()
        }catch(err){
            console.log(err)
        }
    }
    const logOut = () =>{
        setUser()
        localStorage.setItem('refreshToken', '')
        return navigate('/login')
    }
    return(
        <PostContext.Provider value={[posts, setPosts]}>
        <div className ='home'>
            <Header logOut={logOut}/>
            <main>
                <form onSubmit={submit} className='form'>
                    <input value={caption} onChange={(e) => setCaption(e.target.value)} className='captionInput' placeholder='caption'/>
                    <div className="upload-btn-wrapper">
                        <button style={{color: file ? '#7DBD5F' : 'gray'}} className="btn">{file ? 'File is chosen': 'Choose a file'}</button>
                        <input onChange={(e) => setFile(e.target.files[0])} type="file" accept='image/*' />
                    </div>
                    <button type='submit' className='submitBtn'>Upload Post</button>
                </form>
                <div className='posts'>
                    {posts.length > 0 ? posts : <h1>No posts so far..</h1>}
                </div>
            </main>
        </div>
        </PostContext.Provider>
    )
}