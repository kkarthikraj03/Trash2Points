import React, { useState, useEffect } from 'react';
import '../stylesheets/Leaderboard.css';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch leaderboard data from the backend API
        fetchLeaderboardData();
    }, []);

    const fetchLeaderboardData = async () => {
        try {
            const response = await fetch('http://localhost:3001/leaderboard');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching leaderboard data:', error);
        }
    };

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

