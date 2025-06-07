import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

import WelcomePage from './pages/welcomePage'
import TodoPage from './pages/todoPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </div>
  );
}

export default App;
