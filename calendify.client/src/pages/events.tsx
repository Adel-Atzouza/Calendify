import Typography from '@mui/material/Typography';
import React from 'react';
import MyCalendar from '../components/Calendar';

const Home: React.FC = () => {
  const events = [
    { date: '2025-01-12', name: 'Meeting with Alex' },
    { date: '2025-01-15', name: 'Project Deadline' },
    { date: '2025-01-20', name: 'Birthday Party' }
  ];

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <MyCalendar events={events} />
    </div>
  );
};

export default Home;