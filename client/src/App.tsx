import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CameraList from './components/Camera/CameraList';
import LoginForm from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Protected from './components/Protected/Protected';
import { authenticate } from './services/auth';

export type UserProps = {
  id: string;
  username: string;
  role: string;
};
export interface UserPropsWithLogout extends UserProps {
  handleLogout: () => void;
}


const App: React.FC = () => {
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserProps>({
    id: '',
    username: '',
    role: '',
  });

  const handleLogin = async (response: any) => {
    try {
      if (response) {
        setUser(response.user);
        setisLoggedIn(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.error('Unhandled error: ', error);
    }
  };

  const handleLogout = () => {
    setisLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex justify-center items-center h-screen">
              <LoginForm title="" handleLogin={handleLogin} />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={<Protected isLoggedIn={isLoggedIn}><Dashboard id={user.id} username={user.username} role={user.role} handleLogout={handleLogout} /></Protected>}
        />
      </Routes>
    </Router>
  );
};

export default App;