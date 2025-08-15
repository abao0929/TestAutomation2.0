import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BaseLayout from "./pages/baseLayout";
import TestflowList from "./pages/testflowlist"
import TestflowDetail from "./pages/testflowDetail"
import TestPage from "./pages/testpage"

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />} >
          <Route path="list" element={<TestflowList />}/>
          <Route path="testflow/:id" element={<TestflowDetail />}/>
          <Route path="testflow/new" element={<TestflowDetail />}/>
        </Route>
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
