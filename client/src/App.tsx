import React from 'react';
// import CameraList from './components/Camera/CameraList';
import LoginForm from './components/Login/Login';
const App: React.FC = () => {


  return (
    <div className="container-full w-screen h-screen bg-gradient-to-br from-black via-gray-800 to-gray-300 flex items-center">
      <LoginForm title="" />
      {/* <CameraList /> */}
    </div>
  );
};

export default App;
