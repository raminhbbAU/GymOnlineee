import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import listfill from '@iconify/icons-eva/list-fill';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';

// ----------------------------------------------------------------------

export default function TrainerMoreMenu({trainerID,onActivateMenuClick}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleActivateMenuClick = () => {
    setIsOpen(false);
    onActivateMenuClick(trainerID);
  }

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to={`/gym/NewTrainer/${trainerID}`} props sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Divider />

        <MenuItem component={RouterLink} to={`/gym/CourseByTrainer/${trainerID}`} sx={{ color: 'text.secondary' }} disabled >
          <ListItemIcon>
            <Icon icon={listfill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Course List" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <Divider />

        <MenuItem sx={{ color: 'text.secondary' }} onClick={() => handleActivateMenuClick()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Deactive/Active" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

      </Menu>
    </>
  );
}
