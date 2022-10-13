import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import {AuthProvider} from './context/Auth' 
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<PrivateRoute/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
        <Route exact path="/Register" element={<Register type={"REGISTER"} />}/>
        <Route exact path="/Login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
