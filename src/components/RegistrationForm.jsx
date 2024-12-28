// src/components/RegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gymImage from '../assets/gym.webp';

function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [batch, setBatch] = useState('Morning');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/register', {
        name,
        email,
        batch,
        dueDate, // Ensure dueDate is sent in the correct format
      });
      if (response.status === 201) {
        navigate('/confirmation');
      }
    } catch (err) {
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div
      className="registration-form"
      style={{
        backgroundImage: `url(${gymImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div className="form-container bg-transparent p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Register for Gym</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          />
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="mb-4 p-2 w-full border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md"
          >
            Register
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default RegistrationForm;
