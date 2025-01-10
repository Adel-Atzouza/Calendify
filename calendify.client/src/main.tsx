import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx'
import './index.css'

import Layout from './layouts/dashboard';

import DashboardPage from './pages/index.tsx';
import EventsPage from './pages/events.tsx';
import AttendancePage from './pages/OfficeAttendance.tsx';
import SignInPage from './pages/signIn';
import SignUpPage from './pages/signUp.tsx';

const router = createBrowserRouter([
  {
    Component: App, // root layout route
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'events',
            Component: EventsPage,
          },
          {
            path: 'Attendance',
            Component: AttendancePage,
          },
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
      {
        path: '/sign-up',
        Component: SignUpPage,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
