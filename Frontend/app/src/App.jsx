import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserListPage from './UserListPage';
import { Heading } from '@chakra-ui/react';


function App() {
  
  return (
    <Router>
      <Heading size={"6xl"}>User Table</Heading>
      <br></br>
      <Routes>
      <Route path="/" element={<UserListPage />} />
      </Routes>
    </Router>
  )
}

export default App
