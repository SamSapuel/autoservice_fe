import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import jwtDecode from "jwt-decode";
function LoginPage() {
    const API_URL = "http://localhost:8080/api/v1/login";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL, { username, password });
            if (response.data.accessToken) {
                const token = response.data.accessToken;
                setToken(token);
                const decodedToken = jwtDecode(response.data.accessToken);
                const accessType = JSON.stringify(decodedToken.iss);
                const username = JSON.stringify(decodedToken.sub);
                localStorage.setItem("token", token);
                localStorage.setItem("accessType", accessType.substring(1, accessType.length-1));
                localStorage.setItem("username", username.substring(1, username.length-1));
                window.location.href = "/profile";
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body className="login">
            <header>
                <div className="container">
                    <h1>Auto<span>Service_</span><b>IS</b></h1>
                </div>
            </header>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <legend>Sign in</legend>
                        <input required
                               placeholder="Username"
                               onChange={(event) => setUsername(event.target.value)}
                        />
                        <input required
                               type="password"
                               placeholder="Password"
                               onChange={(event) => setPassword(event.target.value)}
                        />
                        <button type="submit">Sign In</button>
                        <p>Please sign in your account.<br></br>Don`t have one? <a href="./registrationCus">Sign up</a> right now!</p>
                    </form>
                </div>
            </section>
        </body>
    );
}

export default LoginPage;