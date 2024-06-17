import NavBar from './Components/NavBar';
import React from "react";
import { BrowserRouter ,Routes , Route } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddQ from './Components/AddQ';
import QuestionsUser from './Components/QuestionsUser';
import { Authentication } from './utils/Authentication';
import Signup from './Components/SignUp';
import QuestionDescription from './Components/QuestionDescription';
import MySubmissions from './Components/MySubmissions';

function App() {
  return (
    <div className="App">
    <NavBar/>
<>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/questions" element={Authentication(<QuestionsUser/>)} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={Authentication(<Dashboard/>)} />
        <Route path="/addQ" element={Authentication(<AddQ/>)} />
        <Route path='/Question/:uniquename' element={Authentication(<QuestionDescription/>)} />    
        <Route path='/submissions/:uniquename' element={Authentication(<MySubmissions/>)} />    
      </Routes>
</>


    </div>
  );
}

export default App;