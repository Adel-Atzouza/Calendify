import { createTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';

import { AppProvider } from '@toolpad/core/react-router-dom';
import type { Navigation } from '@toolpad/core';
import { Outlet } from 'react-router-dom';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'events',
    title: 'Events',
    icon: <EventIcon />,
  },
];

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#F9F9FE',
          paper: '#EEEEF9',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#2A4364',
          paper: '#112E4D',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


export default function AppProviderTheme() {


  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      // router={router}
      theme={customTheme}
      branding={{
        title: "Calendify",
        logo: <EventIcon style={{width: 30, height: 40, color: customTheme.palette.primary.main}} />
      }}
    >
      <Outlet />
    </AppProvider>
    // preview-end
  );
}