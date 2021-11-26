import React, { useState } from 'react';

// routes
import Router from './routes/routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

function App() {
  return (
    // <SimpleGrid title={'ramin grid'} datatable={randomData}/>
    // <Datagrid></Datagrid>
    // <DashboardApp></DashboardApp>
    // <DashboardSidebar/>
    <ThemeConfig>
      <GlobalStyles />
      <Router />
    </ThemeConfig>
    
  );
}

export default App;
