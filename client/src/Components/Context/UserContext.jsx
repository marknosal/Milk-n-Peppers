import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const history = useHistory();

    const login = useCallback((user) => {
        console.log('login');
        setUser(user);
        history.push("/profile");
    }, [history]);    

    const logout = useCallback(() => {
        console.log('logout');
        setUser(null);
        history.push("/");
    }, [history]);

    useEffect(() => {
        fetch("/check_session").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    login(data);
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                setUser(null);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }, [login, setUser]);

    function addToCart() {
        console.log("test");
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, login, logout, addToCart }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };