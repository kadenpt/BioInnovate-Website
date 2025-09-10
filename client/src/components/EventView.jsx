import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI } from '../services/api.js';
import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function EventView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const data = await eventAPI.getById(id);
      setEvent(data);
      setError('');
    } catch (err) {
      setError('Failed to load event');
      console.error('Error fetching event:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'No time';
    return timeString;
  };

  if (loading) {
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
        
        <div style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "6rem",
          textAlign: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            padding: "2rem",
            margin: "2rem auto",
            maxWidth: "800px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}>
            <p style={{
              fontFamily: "roboto, sans-serif",
              fontSize: "1.2rem",
              color: "#666"
            }}>
              Loading event...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
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
        
        <div style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "6rem",
          textAlign: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "12px",
            padding: "2rem",
            margin: "2rem auto",
            maxWidth: "800px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}>
            <h2 style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "2rem",
              color: "#dc3545",
              marginBottom: "1rem"
            }}>
              {error || 'Event not found'}
            </h2>
            <button
              onClick={() => navigate('/events')}
              style={{
                backgroundColor: "#226897",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
                fontFamily: "roboto, sans-serif",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1a5a7a";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#226897";
              }}
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      
      {/* Content Layer */}
      <div style={{
        position: "relative",
        zIndex: 1,
        paddingTop: "6rem",
        paddingBottom: "2rem"
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 2rem"
        }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/events')}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#226897",
              border: "2px solid #226897",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontFamily: "roboto, sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              marginBottom: "2rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#226897";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
              e.target.style.color = "#226897";
            }}
          >
            ← Back to Events
          </button>

          {/* Event Content */}
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            padding: "3rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)"
          }}>
            {/* Event Header */}
            <div style={{
              marginBottom: "2rem",
              borderBottom: "2px solid #e9ecef",
              paddingBottom: "2rem"
            }}>
              <h1 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "3rem",
                color: "#226897",
                marginBottom: "1.5rem",
                lineHeight: "1.2"
              }}>
                {event.name || 'Untitled Event'}
              </h1>
              
              <div style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <div style={{
                  fontFamily: "roboto, sans-serif",
                  fontSize: "1.1rem",
                  color: "#666",
                  backgroundColor: "#f8f9fa",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  📅 {formatDate(event.date)}
                </div>
                <div style={{
                  fontFamily: "roboto, sans-serif",
                  fontSize: "1.1rem",
                  color: "#666",
                  backgroundColor: "#f8f9fa",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  🕒 {formatTime(event.time)}
                </div>
                <div style={{
                  fontFamily: "roboto, sans-serif",
                  fontSize: "1.1rem",
                  color: "#666",
                  backgroundColor: "#f8f9fa",
                  padding: "0.75rem 1.25rem",
                  borderRadius: "25px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  📍 {event.location || 'Location TBD'}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div style={{
              marginBottom: "2rem"
            }}>
              <h2 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "1.8rem",
                color: "#226897",
                marginBottom: "1rem"
              }}>
                About This Event
              </h2>
              <div style={{
                fontFamily: "roboto, sans-serif",
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "#333",
                backgroundColor: "#f8f9fa",
                padding: "1.5rem",
                borderRadius: "10px",
                borderLeft: "4px solid #226897"
              }}>
                {event.description ? (
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    {event.description}
                  </div>
                ) : (
                  <p style={{ color: "#666", fontStyle: "italic" }}>
                    No description available for this event.
                  </p>
                )}
              </div>
            </div>

            {/* RSVP Button */}
            {event.url && (
              <div style={{
                textAlign: "center",
                marginTop: "2rem"
              }}>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#226897",
                    color: "white",
                    padding: "1rem 2rem",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    fontFamily: "roboto, sans-serif",
                    fontWeight: "600",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    border: "2px solid #226897",
                    boxShadow: "0 4px 15px rgba(34, 104, 151, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#1a5a7a";
                    e.target.style.borderColor = "#1a5a7a";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(34, 104, 151, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#226897";
                    e.target.style.borderColor = "#226897";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(34, 104, 151, 0.3)";
                  }}
                >
                  RSVP to Event
                </a>
              </div>
            )}

            {/* Event Details Summary */}
            <div style={{
              marginTop: "2rem",
              padding: "1.5rem",
              backgroundColor: "#e3f2fd",
              borderRadius: "10px",
              border: "1px solid #bbdefb"
            }}>
              <h3 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "1.4rem",
                color: "#226897",
                marginBottom: "1rem"
              }}>
                Event Summary
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                fontFamily: "roboto, sans-serif"
              }}>
                <div>
                  <strong style={{ color: "#226897" }}>Event Name:</strong><br />
                  {event.name || 'N/A'}
                </div>
                <div>
                  <strong style={{ color: "#226897" }}>Date:</strong><br />
                  {formatDate(event.date)}
                </div>
                <div>
                  <strong style={{ color: "#226897" }}>Time:</strong><br />
                  {formatTime(event.time)}
                </div>
                <div>
                  <strong style={{ color: "#226897" }}>Location:</strong><br />
                  {event.location || 'TBD'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
