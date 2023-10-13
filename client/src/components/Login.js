import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {

                const data = await response.json();
                const token = data.token;

                // Store the token in localStorage
                localStorage.setItem('token', token);

                // Check if user data is present in the response
                if (data.user) {
                    localStorage.setItem('username', data.user.username);
                    localStorage.setItem('userId', data.user.id);
                }

                // Redirect the user to a new page or update the state
                // For example, redirect the user to the homepage
                window.location.href = '/';
            } else {
                // Login failed
                console.log('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };



    return (
        <div className="login">
            <div className="center">
                <form onSubmit={handleLoginFormSubmit}>
                    <input type="hidden" name="_method" value="POST" />
                    <h1>Login</h1>
                    <div className="txt_field">
                        <input
                            type="text"
                            id="name"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="name">Username</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="submit" value="Login" />
                    <div className="signup_link">
                        Not a member? <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
