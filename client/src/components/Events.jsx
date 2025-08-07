import { useState, useEffect } from 'react';
import EventBox from "./EventBox";
import Calendar from "./Calendar";
import { eventAPI } from '../services/api.js';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventAPI.getAll();
      console.log('All events from API:', eventsData);
      setEvents(eventsData);
      setError('');
    } catch (err) {
      setError('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter and sort events to get only the three nearest upcoming events
  const getUpcomingEvents = () => {
    const now = new Date();
    // Set time to start of day to avoid timezone issues
    now.setHours(0, 0, 0, 0);
    
    console.log('Current date (start of day):', now);
    
    // Filter events that are in the future
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      // Set time to start of day for comparison
      eventDate.setHours(0, 0, 0, 0);
      const isUpcoming = eventDate >= now;
      console.log(`Event: ${event.name}, Date: ${event.date}, EventDate: ${eventDate}, IsUpcoming: ${isUpcoming}`);
      return isUpcoming;
    });

    console.log('Upcoming events after filtering:', upcomingEvents);

    // Sort by date (earliest first)
    const sortedEvents = upcomingEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    console.log('Sorted upcoming events:', sortedEvents);

    // Return only the first 3 events
    const finalEvents = sortedEvents.slice(0, 3);
    console.log('Final 3 upcoming events:', finalEvents);
    
    return finalEvents;
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div style={{ 
      flex: 1, 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      paddingTop: "5rem"
    }}>
      <h1 style={{
        fontFamily: "Anton, sans-serif",
        fontSize: "3rem",
        fontWeight: "400",
        textAlign: "center",
        color: "#226897"
      }}>
        Upcoming Events
      </h1>
      
      {loading && (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          fontFamily: "Quicksand, sans-serif",
          color: "#666"
        }}>
          Loading events...
        </div>
      )}

      {error && (
        <div style={{
          textAlign: "center",
          padding: "1rem",
          margin: "1rem",
          backgroundColor: "#f8d7da",
          color: "#721c24",
          borderRadius: "8px",
          fontFamily: "Quicksand, sans-serif"
        }}>
          {error}
        </div>
      )}

      {!loading && !error && upcomingEvents.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "2rem",
          fontFamily: "Quicksand, sans-serif",
          color: "#666"
        }}>
          No upcoming events scheduled at the moment.
        </div>
      )}

      {!loading && !error && upcomingEvents.length > 0 && (
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          {upcomingEvents.map((event) => (
            <EventBox 
              key={event._id}
              name={event.name} 
              date={formatDate(event.date)} 
              time={event.time} 
              location={event.location} 
              description={event.description} 
            />
          ))}
        </div>
      )}
      
      <Calendar />
    </div>
  );
} 