import React from 'react';
import '../stylesheets/MainPage.css'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/form');
    };

    return (
        <div className="home">
            <div className="container">
                <div className="block">
                    <div className="head-txt">
                        Welcome to Trash2Points
                    </div>
                    <div className="txt">
                        Earn as You Recycle: Transforming Trash into Treasure with Trash2Points!
                    </div>
                    <div className="home-txt">
                        "Drop your Recyclable Waste <br/>
                        and Get your Point"
                    </div>
                    <button className="btn-div" onClick={handleButtonClick}>
                        Get your Green Point
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainPage
