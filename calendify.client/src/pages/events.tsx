import Typography from '@mui/material/Typography';
import React from 'react';
import MyCalendar from '../components/Calendar';

const Home: React.FC = () => {
  const events = [
    { date: new Date('2025-01-12'), title: 'Meeting with Alex' },
    { date: new Date('2025-01-15'), title: 'Project Deadline' },
    { date: new Date('2025-01-20'), title: 'Birthday Party' }
  ];

  // EXAMPLE
  // const sampleEvents = [
  //   { date: new Date(), title: 'Meeting with Client' },
  //   { date: new Date('2025-01-10'), title: 'Project Deadline' },
  // ];

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <MyCalendar events={events} />
    </div>
  );
};

export default Home;