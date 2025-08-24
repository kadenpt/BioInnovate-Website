import { useState, useEffect } from 'react';
import { eventAPI } from '../services/api.js';
import EventBox from './EventBox';
import Calendar from './Calendar';
import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventAPI.getAll();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUpcomingEvents = (events) => {
    const now = new Date();
    const upcoming = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate > now;
    });
    
    // Sort by date (earliest first) and return first 3
    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  };

  const upcomingEvents = getUpcomingEvents(events);

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      width: "100%"
    }}>
      {/* Base Background Layer - homeBackground.JPG */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${homeBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -2
      }} />
      
      {/* Overlay Layer - tempBackground.png */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${tempBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        opacity: 0.7
      }} />
      
      {/* Original Content - Unchanged */}
      <div style={{
        position: "relative",
        zIndex: 1
      }}>
        <div style={{
          paddingTop: "5rem",
          paddingBottom: "2rem"
        }}>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "3rem",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#226897"
          }}>
            Upcoming Events
          </h1>
          
          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
          )}
          
          {error && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>
          )}
          
          {!loading && !error && (
            <div style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "3rem"
            }}>
              {upcomingEvents.map((event) => (
                <EventBox key={event._id} event={event} />
              ))}
            </div>
          )}
          
          <Calendar events={events} />
        </div>
      </div>
    </div>
  );
} 