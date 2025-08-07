import { useState, useRef } from 'react';
import { blogAPI, eventAPI } from '../services/api.js';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogForm, setBlogForm] = useState({
    title: '',
    snippet: '',
    content: '',
    author: '',
    imageUrl: ''
  });
  const [eventForm, setEventForm] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await blogAPI.create(blogForm);
      setMessage('Blog created successfully!');
      setBlogForm({ title: '', snippet: '', content: '', author: '', imageUrl: '' });
      setUploadedImage(null);
      console.log('Blog created:', response);
    } catch (error) {
      setMessage(`Error creating blog: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await eventAPI.create(eventForm);
      setMessage('Event created successfully!');
      setEventForm({ name: '', date: '', time: '', location: '', description: '' });
      console.log('Event created:', response);
    } catch (error) {
      setMessage(`Error creating event: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (formType, field, value) => {
    if (formType === 'blog') {
      setBlogForm(prev => ({ ...prev, [field]: value }));
    } else {
      setEventForm(prev => ({ ...prev, [field]: value }));
    }
    if (message) setMessage('');
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size must be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:5050/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setBlogForm(prev => ({ ...prev, imageUrl: data.imageUrl }));
      setUploadedImage(data.imageUrl);
      setMessage('Image uploaded successfully!');
    } catch (error) {
      setMessage(`Error uploading image: ${error.message}`);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "2rem"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            color: "#226897",
            fontSize: "2.5rem",
            margin: "0 0 0.5rem 0"
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            fontFamily: "Quicksand, sans-serif",
            color: "#666",
            fontSize: "1.1rem",
            margin: 0
          }}>
            Create and manage content
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
          gap: "1rem"
        }}>
          <button
            onClick={() => setActiveTab('blog')}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: activeTab === 'blog' ? "#226897" : "white",
              color: activeTab === 'blog' ? "white" : "#226897",
              border: "2px solid #226897",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Create Blog
          </button>
          <button
            onClick={() => setActiveTab('event')}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: activeTab === 'event' ? "#226897" : "white",
              color: activeTab === 'event' ? "white" : "#226897",
              border: "2px solid #226897",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            Create Event
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div style={{
            backgroundColor: message.includes('Error') ? "#f8d7da" : "#d4edda",
            color: message.includes('Error') ? "#721c24" : "#155724",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            fontFamily: "Quicksand, sans-serif",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}

        {/* Blog Creation Form */}
        {activeTab === 'blog' && (
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{
              fontFamily: "Anton, sans-serif",
              color: "#226897",
              fontSize: "1.8rem",
              margin: "0 0 2rem 0",
              textAlign: "center"
            }}>
              Create New Blog Post
            </h2>
            
            <form onSubmit={handleBlogSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Blog Title
                </label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => handleInputChange('blog', 'title', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Blog Snippet
                </label>
                <textarea
                  value={blogForm.snippet}
                  onChange={(e) => handleInputChange('blog', 'snippet', e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter a brief snippet/summary of the blog post..."
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Author
                </label>
                <input
                  type="text"
                  value={blogForm.author}
                  onChange={(e) => handleInputChange('blog', 'author', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Blog Image
                </label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{
                    border: isDragOver ? "2px dashed #226897" : "2px dashed #e9ecef",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                    backgroundColor: isDragOver ? "#f8f9fa" : "white",
                    transition: "all 0.3s ease",
                    cursor: "pointer"
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <div>
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        style={{
                          maxWidth: "200px",
                          maxHeight: "150px",
                          borderRadius: "8px",
                          marginBottom: "1rem"
                        }}
                      />
                      <p style={{
                        fontFamily: "Quicksand, sans-serif",
                        color: "#28a745",
                        margin: 0
                      }}>
                        Image uploaded successfully! Click to change.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontSize: "3rem",
                        color: "#226897",
                        marginBottom: "1rem"
                      }}>
                        📷
                      </div>
                      <p style={{
                        fontFamily: "Quicksand, sans-serif",
                        color: "#666",
                        margin: "0 0 0.5rem 0"
                      }}>
                        Drag and drop an image here, or click to select
                      </p>
                      <p style={{
                        fontFamily: "Quicksand, sans-serif",
                        color: "#999",
                        fontSize: "0.8rem",
                        margin: 0
                      }}>
                        Supports: JPG, PNG, GIF (Max 5MB)
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Blog Content
                </label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => handleInputChange('blog', 'content', e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Write your blog content here..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: isSubmitting ? "#6c757d" : "#226897",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? "Creating Blog..." : "Create Blog Post"}
              </button>
            </form>
          </div>
        )}

        {/* Event Creation Form */}
        {activeTab === 'event' && (
          <div style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)"
          }}>
            <h2 style={{
              fontFamily: "Anton, sans-serif",
              color: "#226897",
              fontSize: "1.8rem",
              margin: "0 0 2rem 0",
              textAlign: "center"
            }}>
              Create New Event
            </h2>
            
            <form onSubmit={handleEventSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Event Name
                </label>
                <input
                  type="text"
                  value={eventForm.name}
                  onChange={(e) => handleInputChange('event', 'name', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "Quicksand, sans-serif",
                    color: "#226897",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem"
                  }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => handleInputChange('event', 'date', e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontFamily: "Quicksand, sans-serif",
                      boxSizing: "border-box"
                    }}
                    required
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: "block",
                    fontFamily: "Quicksand, sans-serif",
                    color: "#226897",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem"
                  }}>
                    Time
                  </label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => handleInputChange('event', 'time', e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "2px solid #e9ecef",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontFamily: "Quicksand, sans-serif",
                      boxSizing: "border-box"
                    }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Location
                </label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => handleInputChange('event', 'location', e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    boxSizing: "border-box"
                  }}
                  placeholder="Enter event location"
                  required
                />
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <label style={{
                  display: "block",
                  fontFamily: "Quicksand, sans-serif",
                  color: "#226897",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  Event Description
                </label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => handleInputChange('event', 'description', e.target.value)}
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "0.75rem",
                    border: "2px solid #e9ecef",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontFamily: "Quicksand, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                  placeholder="Describe the event..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  backgroundColor: isSubmitting ? "#6c757d" : "#226897",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontFamily: "Quicksand, sans-serif",
                  fontWeight: "bold",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 