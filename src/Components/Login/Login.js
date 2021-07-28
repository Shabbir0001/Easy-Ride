import React from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';





const Login = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
    });
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    // firebase app initialization
    initializeLoginFramework();

    // Response handler
    const handleResponse = (res) => {
        setUser(res);
        setLoggedInUser(res);
        console.log(res)
        if (res.success) {
            history.replace(from);
        }
    };


    // form validation
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        // if (document.getElementById("password").value === document.getElementById("confirmPassword").value) {
        //     isFieldValid = true;
        // }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[event.target.name] = event.target.value;
            console.log('form validate');
            setUser(newUserInfo)
        }
    };


    // handle submit
    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res)
                });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res);
                })
        };
        event.preventDefault();
    };


    // google sign in
    const GoogleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res);
            });
    };
    return (
        <div className="allContainer">
            <div className="formContainer">
                <h1 className="formHeader">{newUser ? "Create an account" : "Login to Explore"}</h1>

                <form onSubmit={handleSubmit} >
                    {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required className="field" />}
                    <br />
                    <input type="text" onBlur={handleBlur} name="email" placeholder="Write your email" required className="field" />
                    <br />
                    <input type="password" onBlur={handleBlur} name="password" id="password" placeholder="Password" required className="field" />
                    <br />
                    <br />
                    <input type="submit" value={newUser ? "Sign Up" : "Login"}  className="submitBtn"/>
                </form>
        
                <p style={{ margin: "10px" }}>
                    {newUser ? "Already have an account?" : "Don't have an account?"}
                    <span onClick={() => setNewUser(!newUser)} style={{ color: "lightsalmon", cursor: "pointer" }}>
                        {newUser ? " Login" : " Create an account"}
                    </span>
                </p>

                <p style={{ margin: "10px" }}>------or------</p>
                <button onClick={GoogleSignIn} className="googleBtn"><i className="fab fa-google"></i> Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;