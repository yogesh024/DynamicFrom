// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SurveyForm from './component/SurveyFrom';
import { Outlet } from 'react-router-dom'
import { NavBar } from './component/NavBar'

const Home = () => (
  <div>
    <h1>Home</h1>

    <>
    <NavBar/>
    <Outlet/>
    </>
    {/* <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/survey">Survey Form</Link></li>
      </ul>
    </nav> */}
  </div>
);

const App = () => (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<SurveyForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
