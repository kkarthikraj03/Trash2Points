import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../stylesheets/SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // User registration successful, redirect or show a success message
                console.log('User registered successfully');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('User registration failed:', errorData);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="signup">
            <div className="center">
                <form onSubmit={handleSubmit}>
                    <h1>SignUp</h1>
                    <div className="txt_field">
                        <input
                            type="text"
                            id="name"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {/* <span></span> */}
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
                        {/* <span></span> */}
                        <label htmlFor="password">Password</label>
                    </div>
                    <input type="submit" value="SignUp" />
                    <div className="signup_link">
                        Already a member? <Link to="/login">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
