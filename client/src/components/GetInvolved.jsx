import React, { useState } from 'react';
import { emailAPI } from '../services/api.js';
import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function GetInvolved() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      await emailAPI.subscribe(email);
      setMessage('Successfully subscribed to our mailing list!');
      setMessageType('success');
      setEmail('');
    } catch (error) {
      if (error.message.includes('already subscribed')) {
        setMessage('This email is already subscribed to our mailing list.');
        setMessageType('info');
      } else {
        setMessage('Failed to subscribe. Please try again.');
        setMessageType('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        zIndex: 1,
        paddingTop: "6rem",
        paddingBottom: "2rem"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem"
        }}>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            fontSize: "4rem",
            textAlign: "center",
            marginBottom: "2rem",
            color: "#226897"
          }}>
            How to Get Involved
          </h1>
          
          <p style={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1.5rem",
            textAlign: "center",
            marginBottom: "3rem",
            color: "#1a4a6b",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.8",
            fontWeight: "500",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "2.5rem",
            borderRadius: "15px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            BioInnovate UBC is inclusive, welcoming members from multiple faculties to contribute to our mission, whether through executive roles or general membership. Our comprehensive hiring process begins in September each year, aiming to equip our team with diverse skills—from financial management to marketing—necessary to propel our initiatives forward. The BioInnovate UBC executive team features individuals with a passion for biotechnology and life sciences, holding a wide breadth of skills, culminating to provide extensive professional work of all facets.
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem"
          }}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}>
              <h3 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#226897"
              }}>
                Join our Mailing List
              </h3>
              <p style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "1.5rem",
                lineHeight: "1.6"
              }}>
                Join our mailing list to stay updated on our events and opportunities. 
              </p>
              
              {/* Email Registration Form */}
              <form onSubmit={handleEmailSubmit} style={{ marginBottom: "1rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "1rem",
                      fontFamily: "Quicksand, sans-serif",
                      marginBottom: "0.5rem"
                    }}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#226897",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "6px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    fontWeight: "600",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    opacity: isSubmitting ? 0.6 : 1,
                    transition: "all 0.3s ease",
                    width: "100%"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "#1a5a7a";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.target.style.backgroundColor = "#226897";
                    }
                  }}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              
              {/* Message Display */}
              {message && (
                <div style={{
                  padding: "0.75rem",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  fontFamily: "Quicksand, sans-serif",
                  backgroundColor: messageType === 'success' ? "#d4edda" : 
                                messageType === 'error' ? "#f8d7da" : "#d1ecf1",
                  color: messageType === 'success' ? "#155724" : 
                         messageType === 'error' ? "#721c24" : "#0c5460",
                  border: `1px solid ${messageType === 'success' ? "#c3e6cb" : 
                                      messageType === 'error' ? "#f5c6cb" : "#bee5eb"}`
                }}>
                  {message}
                </div>
              )}
            </div>
            
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}>
              <h3 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#226897"
              }}>
                Become a Member
              </h3>
              <p style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "1.5rem",
                lineHeight: "1.6"
              }}>
                Becoming a member of BioInnovate UBC is a great way to get involved in the biotechnology community at UBC.
              </p>
              <button style={{
                backgroundColor: "#226897",
                color: "white",
                border: "none",
                padding: "1rem 2rem",
                borderRadius: "8px",
                fontSize: "1.1rem",
                fontFamily: "Quicksand, sans-serif",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#1a5a7a";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#226897";
              }}>
                Sign Up
              </button>
            </div>
            
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              border: "2px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}>
              <h3 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "2rem",
                marginBottom: "1rem",
                color: "#226897"
              }}>
                Contact Us
              </h3>
              <p style={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.1rem",
                color: "#333",
                marginBottom: "1.5rem",
                lineHeight: "1.6"
              }}>
                Use the button below to contact us via email for any questions or inquiries at bioinnovate@gmail.com.
              </p>
              <button 
                onClick={() => window.open('mailto:bioinnovate@gmail.com', '_blank')}
                style={{
                  backgroundColor: "#226897",
                  color: "white",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: "8px",
                  fontSize: "1.1rem",
                  fontFamily: "Quicksand, sans-serif",
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
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 