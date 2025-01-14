import { createTheme } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';

import { AppProvider } from '@toolpad/core/react-router-dom';
import type { Branding, Navigation, Session } from '@toolpad/core';
import { Outlet, useNavigate } from 'react-router-dom';
import { SessionContext } from './SessionContext';
import { BrandingContext } from './shared/context';
import React from 'react';


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
    title: 'Calendar',
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

  const [session, setSession] = React.useState<Session | null>(null);
  const [branding, setBranding] = React.useState<Branding | null>({
    title: "Calendify",
    logo: <EventIcon style={{ width: 30, height: 40, color: customTheme.palette.primary.main }} />
  });


  const sessionContextValue = React.useMemo(
    () => ({ session, setSession }),
    [session, setSession],
  );

  const brandingContextValue = React.useMemo(
    () => ({ branding, setBranding }),
    [branding, setBranding],
  );

  const navigate = useNavigate();

  const signIn = React.useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  const signOut = React.useCallback(async () => {
    setSession(null);
    console.log("Sign out")

    await fetch("/logout", { 'method': 'POST' });
    navigate('/sign-in');
  }, [navigate]);

  return (
    <SessionContext.Provider value={sessionContextValue}>
      <BrandingContext.Provider value={brandingContextValue}>
        <AppProvider
          navigation={NAVIGATION}
          theme={customTheme}
          branding={branding}
          session={session}
          authentication={{ signIn, signOut }}

        >
          <Outlet />
        </AppProvider>
      </BrandingContext.Provider>
    </SessionContext.Provider>
  );
}