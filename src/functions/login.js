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