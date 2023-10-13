import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Contact.css';

const Contact = () => {

    const navigate = useNavigate();

    const handleContactSubmit = () => {
        navigate("/")
    }

    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <div className="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message"></textarea>

                <button className="submit-btn" onClick={handleContactSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Contact;
