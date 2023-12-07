import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from "./Header.js";
import Footer from "./Footer.js";
import FeedbackForm from "./FeedbackForm.js";
import Register from "./Register.js";
import Login from "./Login.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [users, setUsers] = useState([]); //Array of register users
  const [loggedInUser, setLoggedInUser] = useState(''); //Username of the currently logged-in user
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (enteredUsername, enteredPassword) => {
    // Retrieve the users array from local storage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Check for authentication using the entered username and password
    const authenticatedUser = users.some((user) => user.username === enteredUsername && user.password === enteredPassword);
    
    if (authenticatedUser) {
      setLoggedInUser(enteredUsername);
      //insert navigation to feedback form
      navigate('/feedback');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    setLoggedInUser('');
    navigate('/');  
  };

  return (
    <div>
      <Header onLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onAuthentication={setUsers} />} />
        <Route path="/feedback" element={<FeedbackForm username={loggedInUser} onLogout={handleLogout} />} />
      </Routes>  
      <Footer />
    </div>
  );
}

export default App;
