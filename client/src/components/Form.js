import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Form.css';

const Form = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [wasteType, setWasteType] = useState('');
    const [proof, setProof] = useState(null);

    const departments = ['CSE', 'ECE', 'AIDS', 'Others'];

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Perform form submission logic here

        try {
            // Add points to the user
            const addPointsResponse = await fetch('http://localhost:3001/point/add-points', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, wasteType }),
            });

            // Register a new point
            const formData = new FormData();
            formData.append('username', username);
            formData.append('rollNumber', rollNumber);
            formData.append('department', department);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('wasteType', wasteType);
            formData.append('proof', proof);

            const registerPointResponse = await fetch('http://localhost:3001/point/register-point', {
                method: 'POST',
                body: formData,
            });

            if (addPointsResponse.ok) {
                // Both actions were successful
                // You can perform any additional actions, like showing a success message
                navigate("/leaderboard");
            } else {
                // One or both actions failed
                // Handle the error, show an error message, etc.
                console.error('Fetch error:', registerPointResponse.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form">
            <div className="heading">
                Point Registration Form
            </div>
            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Roll Number:</label>
                    <input type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />

                    <label>Department:</label>
                    <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                        <option value="">Select department</option>
                        {departments.map((dept, index) => (
                            <option key={index} value={dept}>
                                {dept}
                            </option>
                        ))}
                    </select>

                    <label>Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

                    <label>Time:</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

                    <label>Type of Waste:</label>
                    <select value={wasteType} onChange={(e) => setWasteType(e.target.value)} required>
                        <option value="">Select waste type</option>
                        <option value="plastic">Plastic</option>
                        <option value="paper">Paper</option>
                        <option value="other">Other</option>
                    </select>

                    <label>Proof:</label>
                    <input type="file" accept="image/*" onChange={(e) => setProof(e.target.files[0])} />

                    <button className="button" type="submit">Register a Point</button>
                </form>
            </div>
        </div>
    );
};

export default Form;





