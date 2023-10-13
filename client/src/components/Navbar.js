import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo_img.png";
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Navbar.css';

const Navbar = ({ user, handleLogout }) => {

    const navigate = useNavigate();

    // const [userData,setUserData] = useState(localStorage.getItem())

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogo = () => {
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="logo" onClick={handleLogo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" className="menu-item">Home</Link>
                <Link to="/form" className="menu-item">Form</Link>
                <Link to="/leaderboard" className="menu-item">Leaderboard</Link>
                <Link to="/contact" className="menu-item">Contact</Link>
                {user ? (
                    <div className="user-menu">
                        <div className="user-name" onClick={toggleMenu}>
                            {user.username}
                            <div className={`dropdown-icon ${isMenuOpen ? 'open' : ''}`}>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                        <div className={`user-dropdown ${isMenuOpen ? 'open' : ''}`}>
                            <div className="logout-btn" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                ) : (
                    <button className="login-btn">
                        <Link to="/login">
                           Hi!
                        </Link>
                    </button>
                )}
            </div>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
    );
};

export default Navbar;
