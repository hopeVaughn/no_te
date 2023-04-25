import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CameraList from './components/Camera/CameraList';
import LoginForm from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard'
import Protected from './components/Protected/Protected';
import { authenticate } from './services/auth';

const App: React.FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);

  const logIn = async () => {
    try {
      const response = await authenticate('/signin', {});
      setisLoggedIn(true);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.error('Unhandled error: ', error);
    }
  };

  const logOut = () => {
    setisLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="flex justify-center items-center h-screen"><LoginForm title="" logIn={logIn} /></div>} />
        <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn}><Dashboard /></Protected>} />
        <Route path="/cameras" element={<Protected isLoggedIn={isLoggedIn}><CameraList /></Protected>} />
      </Routes>
    </Router>
  );
};
export default App;