import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api.js';
import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogAPI.getById(id);
      setBlog(data);
      setError('');
    } catch (err) {
      setError('Failed to load blog');
      console.error('Error fetching blog:', err);
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
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.2rem",
              color: "#666"
            }}>
              Loading blog...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
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
              {error || 'Blog not found'}
            </h2>
            <button
              onClick={() => navigate('/bioblog')}
              style={{
                backgroundColor: "#226897",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                fontSize: "1rem",
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
              Back to BioBlog
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
            onClick={() => navigate('/bioblog')}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#226897",
              border: "2px solid #226897",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontFamily: "Quicksand, sans-serif",
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
            ← Back to BioBlog
          </button>

          {/* Blog Content */}
          <div style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            padding: "3rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)"
          }}>
            {/* Blog Header */}
            <div style={{
              marginBottom: "2rem",
              borderBottom: "2px solid #e9ecef",
              paddingBottom: "2rem"
            }}>
              <h1 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "3rem",
                color: "#226897",
                marginBottom: "1rem",
                lineHeight: "1.2"
              }}>
                {blog.title || 'Untitled'}
              </h1>
              
              <div style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <span style={{
                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1rem",
                  color: "#666",
                  backgroundColor: "#f8f9fa",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px"
                }}>
                  By {blog.author || 'Unknown Author'}
                </span>
                <span style={{
                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1rem",
                  color: "#666",
                  backgroundColor: "#f8f9fa",
                  padding: "0.5rem 1rem",
                  borderRadius: "20px"
                }}>
                  {formatDate(blog.createdAt)}
                </span>
              </div>
              
              {blog.snippet && (
                <p style={{
                  fontFamily: "Quicksand, sans-serif",
                  fontSize: "1.3rem",
                  color: "#666",
                  lineHeight: "1.6",
                  fontStyle: "italic"
                }}>
                  {blog.snippet}
                </p>
              )}
            </div>

            {/* Blog Image */}
            {blog.imageUrl && (
              <div style={{
                marginBottom: "2rem",
                textAlign: "center"
              }}>
                <div style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                }}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title || 'Blog image'}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "400px",
                      objectFit: "cover",
                      display: "block"
                    }}
                    onError={(e) => {
                      // Hide the image container if image fails to load
                      e.target.style.display = 'none';
                      e.target.parentElement.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Blog Content */}
            <div style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#333"
            }}>
              {blog.content ? (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {blog.content}
                </div>
              ) : (
                <p style={{ color: "#666", fontStyle: "italic" }}>
                  No content available for this blog post.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 