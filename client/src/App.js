import React, { useState } from 'react';
import SimpleGrid from './components/simpleGrid';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login.js'
import SignUp from './pages/sigup/sigup.js'


function App() {
  return (
    <SimpleGrid title={'ramin grid'} datatable={randomData}/>
  );
}

export default App;
