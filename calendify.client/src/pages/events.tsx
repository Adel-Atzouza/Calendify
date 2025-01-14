import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import MyCalendar from '../components/Calendar';
import { title } from 'process';

const Home: React.FC = () => {

  const [events, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = '/EventAttendance/attendances';

    const fetchEventsByUser = async () => {
      try {
        const response = await fetch(url, 
          {
              method: "GET",
              headers: {
                  "Accept-Type": "application/json",
              }
          });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        let data = [];

        for (let i = 0; i < result.length; i++) {
          data.push({title: result[i]["title"], date: new Date(result[i]["date"])});
        }

        setData(data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchEventsByUser();
  }, []);

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