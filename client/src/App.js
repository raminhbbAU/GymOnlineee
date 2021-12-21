import React, { useState } from 'react';

// routes
import Router from './routes/routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    // <SimpleGrid title={'ramin grid'} datatable={randomData}/>
    // <Datagrid></Datagrid>
    // <DashboardApp></DashboardApp>
    // <DashboardSidebar/>
    <ThemeConfig>
      <GlobalStyles />
      <Router />
      <Toaster />
    </ThemeConfig>
    
  );
}

export default App;
