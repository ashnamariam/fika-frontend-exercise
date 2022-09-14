import React from 'react';
import Home from './Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;




