import { authService } from "fbInstance";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true); 

    const toggleAccount = () => setNewAccount(prev => !prev);

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if(name === "email") setEmail(value);
        else if(name === "password") setPassword(value);
    };
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            if(newAccount) {
                // create account
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                await authService.signInWithEmailAndPassword(email, password);
            }
        }catch(error){
            setError(error.message);
        }
    };

    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input 
                type="email" 
                name="email" 
                placeholder="E-mail" 
                required 
                value={email}
                onChange={onChange}
                className="authInput"
            />
            <input 
                type="password" 
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                className="authInput"
            />
            <input
                type="submit" 
                value={newAccount ? "Create Account" : "Log In"} 
                className="authInput authSubmit"
            />
            {error && <span className="authError">{error}</span>}
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Sign In" : "create Account"}
            </span>
        </form>
        </>
    )
} 

export default AuthForm;