import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage from './UserListPage';

function App() {
  
  return (
    <Router>
      <h1>Users listing</h1>
      <Routes>
      <Route path="/" element={<UserListPage />} />
      </Routes>
    </Router>
  )
}

export default App
