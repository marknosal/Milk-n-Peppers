import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const history = useHistory();

    const login = useCallback((user) => {
        setUser(user);
        history.push("/profile");
    }, [history]);    

    const logout = useCallback(() => {
        setUser(null);
        history.push("/");
    }, [history]);

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