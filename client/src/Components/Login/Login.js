import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function Login () {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <div className="login">
            {showLogin ? (
                <div>
                    <LoginForm />
                    <hr/>
                    Don't have an account?
                    <button onClick={() => setShowLogin(!showLogin)}>
                        Sign Up!
                    </button>
                </div>
            ) : (
                <div>
                    <SignupForm />
                    <hr/>
                    Already have an account?
                    <button onClick={() => setShowLogin(!showLogin)}>
                        Log In!
                    </button>
                </div>
            )}
        </div>
    )
}