import React, { useState,useEffect } from 'react';

// routes
import Router from './routes/routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import { Toaster } from 'react-hot-toast';


import AppContext from './storage/AppContext';
import { I18nextProvider } from "react-i18next";
import i18n from "./translation/i18n";
import useGeoLocation from "./service/location.service";




function App() {

  const [language,setLanguage] = useState('en');
  const [theme,setTheme] = useState('light');
  const [ipLocationLoading,setIpLocationLoading]= useState(true);
  const location = useGeoLocation();

  const globalStaterepository = {
    languageProvider:i18n,
    language:language,
    theme:theme,
    setTheme: function(_theme){
      setTheme(_theme);
      //TODO: Chnage Theme
    },
    setLanguage: function(_lan){
      i18n.changeLanguage(_lan);
      setLanguage(_lan)
    }
  
  }

  useEffect(() => {  

    if (ipLocationLoading)
    {
      if (!location.isLoading)
      {
        setIpLocationLoading(false);  
        if (location.country === 'IR'){
          globalStaterepository.setLanguage("fa")
        }
        else{
          globalStaterepository.setLanguage("en")
        }
       
      }
    }

  }, [location]);

  return (
    <AppContext.Provider value={globalStaterepository}>
      <I18nextProvider i18n={i18n}>
        <ThemeConfig>
          <GlobalStyles />
          <Router />
          <Toaster />
        </ThemeConfig>
      </I18nextProvider>   
    </AppContext.Provider> 
  );
}

export default App;
