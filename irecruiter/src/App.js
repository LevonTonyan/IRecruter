import './App.css';
import Header from './components/header/Header';
import { useState,useEffect} from 'react';
import LoginPage from './components/login/LoginPage';
import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';
import ProfilePage from './components/profilePage/ProfilePage';
import SignUpPage from './components/signUp/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './components/landingPage/LandingPage';



function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/profile' element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    
   
    
      
    </div>
  );
}

export default App;
