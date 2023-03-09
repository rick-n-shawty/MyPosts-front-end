import {Link}  from 'react-router-dom';
export default function Header({logOut}){
    return (
        <header>
            <div className='header-left'>
                <h1>MyPosts</h1>
            </div>
            <div className='header-right'>
                <button onClick={logOut}>Log out</button>
            </div>
        </header>
    )
}