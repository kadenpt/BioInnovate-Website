import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EventBox({ event }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event._id}`);
  };

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        padding: "20px",
        margin: "10px",
        backgroundColor: isHovered ? "#68adc4" : "white",
        color: isHovered ? "white" : "#226897",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.02)" : "scale(1)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: `3px solid #68adc4`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div>
        <h3 
          style={{
            margin: "0 0 10px 0",
            fontSize: "1.2rem",
            fontWeight: "bold",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {event.name}
        </h3>
        <p style={{ 
          margin: "5px 0", 
          fontSize: "0.9rem",
          opacity: 0.8
        }}>
          📅 {event.date} at {event.time}
        </p>
        <p style={{ 
          margin: "5px 0", 
          fontSize: "0.9rem",
          opacity: 0.8
        }}>
          📍 {event.location}
        </p>
        <p style={{
          margin: "10px 0",
          fontSize: "0.85rem",
          lineHeight: "1.4",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical"
        }}>
          {event.description}
        </p>
      </div>
      
      {event.url && (
        <div style={{ marginTop: "auto" }}>
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              backgroundColor: isHovered ? "white" : "#68adc4",
              color: isHovered ? "#68adc4" : "white",
              padding: "8px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: "600",
              textAlign: "center",
              width: "100%",
              transition: "all 0.3s ease",
              border: `2px solid ${isHovered ? "white" : "#68adc4"}`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            RSVP
          </a>
        </div>
      )}
    </div>
  );
}
