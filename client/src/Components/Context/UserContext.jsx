import { createContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

const UserContext = createContext({});

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userCart, setUserCart] = useState([])
    const [error, setError] = useState(null)
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

    useEffect(() => {
        fetch('/customs')
            .then(response => response.json())
                .then(data => setUserCart(data))
    }, [])

    function addToCart(clothingId) {
        fetch('/customs', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'clothing_id': clothingId})
        }).then(response => {
            if (response.ok) {
                response.json().then(data => console.log(data))
            } else {
                response.json().then(data => setError(data))
            }
        })
    }

    return (
        <UserContext.Provider
            value={{ user, setUser, login, logout, addToCart, userCart, error, setError }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };