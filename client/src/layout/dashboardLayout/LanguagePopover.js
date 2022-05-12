import { useRef, useState,useContext,useEffect } from 'react';
import { withTranslation } from "react-i18next";

// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';

// components
import MenuPopover from '../../components/MenuPopover';
import AppContext from '../../storage/AppContext';


// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg'
  },
  {
    value: 'fa',
    label: 'Persian',
    icon: '/assets/icons/ic_flag_ir.svg'
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg'
  }
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [currentlanguage,setCurrentLanguage] = useState(LANGS[0]);
  const myContext = useContext(AppContext)


  useEffect( () =>{

    switch (myContext.language) {
      case 'en':
        setCurrentLanguage(LANGS[0]);
        break;
      case 'fa':
          setCurrentLanguage(LANGS[1]);
          break;
      case 'de':
          setCurrentLanguage(LANGS[2]);
          break;
      default:
        break;
    }

  },[myContext.language])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLanguage = (lan) => {
    setCurrentLanguage(lan)
    myContext.setLanguage(lan.value);
    handleClose();
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <img src={currentlanguage.icon} alt={currentlanguage.label} />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current}>
        <Box sx={{ py: 1 }}>
          {LANGS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === LANGS[0].value}
              //onClick={handleClose}
              onClick={() => changeLanguage(option)}
              sx={{ py: 1, px: 2.5 }}
            >
              <ListItemIcon>
                <Box component="img" alt={option.label} src={option.icon} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }}>
                {option.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}