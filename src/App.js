import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useState, createContext} from 'react';
import {BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';
import Home from './components /Home';
import Login from './components /Login';
import Register from './components /Register';
export const UserContext = createContext([])
function App() {
  const [user, setUser] = useState({})
  axios.defaults.baseURL = 'https://mypostsapi.onrender.com/api/v1'
  return (
    <UserContext.Provider value={[user, setUser]}>
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </HashRouter>
    </UserContext.Provider>
  );
}

export default App;
