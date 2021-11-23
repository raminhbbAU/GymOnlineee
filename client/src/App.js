import React, { useState } from 'react';
import Datagrid from './components/datagrid';
import SimpleGrid from './components/simpleGrid';
import Dashboard from './pages/dashboard/dashboard';
import DashboardApp from './pages/dashboard/DashboardApp';
import Login from './pages/login/login.js'
import SignUp from './pages/sigup/sigup.js'

const randomData = [
  {id:1, name:'ramin',fammily:'habibi'},
  {id:2, name:'shahin',fammily:'habibi'},
  {id:3, name:'niloofar',fammily:'bakhtiari'},
]


function App() {
  return (
    // <SimpleGrid title={'ramin grid'} datatable={randomData}/>
    // <Datagrid></Datagrid>
    <DashboardApp></DashboardApp>
  );
}

export default App;
