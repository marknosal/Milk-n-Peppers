import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = useCallback((user) => {
        setUser(user);
        // navigate("/profile");
    }, []);    

    const logout = useCallback(() => {
        fetch('/logout', {
            method: 'DELETE',
        })
        setUser(null);
        navigate("/");
    }, [navigate]);

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    login(data);
                })
            } else {
                setUser(null);
            }
        })
    }, [login, setUser]);


    return (
        <UserContext.Provider
            value={{ user, setUser, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };