import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import MuiMenuItem from '@mui/material/MenuItem';

import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// import { SignOutButton } from '@toolpad/core';
import { AuthenticationContext } from '@toolpad/core';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

export default function OptionsMenu() {
  const authentication = React.useContext(AuthenticationContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/settings", {replace: false})
  };
  return (

      <Stack>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        {/* <Divider /> */}
        <MenuItem
          onClick={authentication?.signOut}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Stack>
  );
}
