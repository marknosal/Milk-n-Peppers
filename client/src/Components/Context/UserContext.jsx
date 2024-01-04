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
    }, [setUser])

    function login(user) {
        setUser(user)
        history.push('/profile')
    }
    function logout() {
        setUser(null)
        history.push('/')
    }
    function addToCart() {

    }

    return (
        <UserContext.Provider value = {{ user, setUser, login, logout, addToCart }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }