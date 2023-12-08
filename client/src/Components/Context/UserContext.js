import { createContext, useState, useEffect } from "react";


const UserContext = createContext({})

function UserProvider ({ children }) {
    const [user, setUser] = useState(null)

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
    }
    function logout() {
        setUser(null)
    }

    return (
        <UserContext.Provider value = {{ user, setUser, login, logout }}>{children}</UserContext.Provider>
    )
}

export { UserContext, UserProvider }