import React, {useState, useEffect} from 'react';
import './App.scss';
import {  Route, NavLink, Routes } from 'react-router-dom';
import {Home , Filter} from "./pages/pages"
import {Button} from '@mui/material-next';


const  App:React.FC = () => {
  
  return (
    <div className='App'>
       <header className="header">
       <h2> Marvel API Characters</h2>
        </header>
      <nav>
        <NavLink style={{textDecoration:"none"}} to="/" id='headerHome' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
          Home
          </NavLink>
        <NavLink style={{textDecoration:"none"}} to="/filter" id='headerFilter' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Find your fav characters</NavLink>
      </nav>
     
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/filter" element={<Filter/>} />
      </Routes>
    </div>
  
  );
}

export default App;
