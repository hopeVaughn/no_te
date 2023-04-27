import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Protected from './components/Protected/Protected';

// Defining user prop types
export type UserProps = {
  id: string;
  username: string;
  role: string;
};

// Extending user props to include a logout function
export interface UserPropsWithLogout extends UserProps {
  handleLogout: () => void;
}

// Functional component for the App
const App: React.FC = () => {
  // State hooks for login status and user details
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserProps>({
    id: '',
    username: '',
    role: '',
  });

  // Function to handle login
  const handleLogin = async (response: any) => {
    try {
      if (response) {
        // Set user state
        setUser(response.user);
        // Set login state to true
        setisLoggedIn(true);
        // Save user details to local storage
        const user = { id: response.user.id, username: response.user.username, role: response.user.role };
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      // Error handling
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.error('Unhandled error: ', error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Remove user details from local storage
    localStorage.removeItem('user');
    // Set login state to false
    setisLoggedIn(false);
  };

  // Return JSX with routes
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // Display the LoginForm component on the "/" route
            <div className="flex justify-center items-center h-screen">
              <LoginForm handleLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            // Display the Protected component, which wraps the Dashboard component, on the "/dashboard" route
            // Pass isLoggedIn status and user data as props
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard id={user.id} username={user.username} role={user.role} handleLogout={handleLogout} />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
