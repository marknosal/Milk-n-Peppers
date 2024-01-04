import { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const UserContext = createContext({})


function UserProvider ({ children }) {
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        fetch('/check_session').then(response => {
            if (response.ok) {
                response.json().then(data => {
                    login(data)
                })
            } else {
                setUser(null)
            }
        })
    }, [setUser, login])

    function login(user) {
        console.log('login')
        setUser(user)
        history.push('/profile')
    }
    function logout() {
        console.log('logout')
        setUser(null)
        history.push('/')
    }
    function addToCart() {
        console.log('test')
    }

    return (
        <UserContext.Provider value = {{ user, setUser, login, logout, addToCart }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }