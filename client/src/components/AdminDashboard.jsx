import { useState, useRef, useEffect } from 'react';
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
    description: '',
    url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  
  // New state for managing existing items
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchEvents();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogAPI.getAll();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const data = await eventAPI.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (isEditing && editingBlog) {
        await blogAPI.update(editingBlog._id, blogForm);
        setMessage('Blog updated successfully!');
        setEditingBlog(null);
        setIsEditing(false);
      } else {
        await blogAPI.create(blogForm);
        setMessage('Blog created successfully!');
      }
      setBlogForm({ title: '', snippet: '', content: '', author: '', imageUrl: '' });
      setUploadedImage(null);
      fetchBlogs(); // Refresh the list
    } catch (error) {
      setMessage(`Error ${isEditing ? 'updating' : 'creating'} blog: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (isEditing && editingEvent) {
        await eventAPI.update(editingEvent._id, eventForm);
        setMessage('Event updated successfully!');
        setEditingEvent(null);
        setIsEditing(false);
      } else {
        await eventAPI.create(eventForm);
        setMessage('Event created successfully!');
      }
      setEventForm({ name: '', date: '', time: '', location: '', description: '', url: '' });
      fetchEvents(); // Refresh the list
    } catch (error) {
      setMessage(`Error ${isEditing ? 'updating' : 'creating'} event: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({ ...prev, [name]: value }));
    if (message) setMessage('');
  };

  const handleBlogInputChange = (e) => {
    const { name, value } = e.target;
    setBlogForm(prev => ({ ...prev, [name]: value }));
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

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setBlogForm(prev => ({ ...prev, imageUrl: result.imageUrl }));
        setUploadedImage(result.imageUrl);
        setMessage('Image uploaded successfully!');
      } else {
        setMessage('Failed to upload image');
      }
    } catch (error) {
      setMessage('Error uploading image');
      console.error('Upload error:', error);
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

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      snippet: blog.snippet || '',
      content: blog.content || '',
      author: blog.author || '',
      imageUrl: blog.imageUrl || ''
    });
    setIsEditing(true);
    setActiveTab('blog');
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      name: event.name || '',
      date: event.date || '',
      time: event.time || '',
      location: event.location || '',
      description: event.description || '',
      url: event.url || ''
    });
    setIsEditing(true);
    setActiveTab('event');
  };

  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogAPI.delete(blogId);
        setMessage('Blog deleted successfully!');
        fetchBlogs(); // Refresh the list
      } catch (error) {
        setMessage(`Error deleting blog: ${error.message}`);
      }
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventAPI.delete(eventId);
        setMessage('Event deleted successfully!');
        fetchEvents(); // Refresh the list
      } catch (error) {
        setMessage(`Error deleting event: ${error.message}`);
      }
    }
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setEditingEvent(null);
    setIsEditing(false);
    setBlogForm({ title: '', snippet: '', content: '', author: '', imageUrl: '' });
    setEventForm({ name: '', date: '', time: '', location: '', description: '', url: '' });
    setUploadedImage(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (message) setMessage('');

  return (
    <div style={{
      minHeight: "100vh",
      padding: "2rem",
      paddingTop: "6rem",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "2rem",
          color: "#226897"
        }}>
          Admin Dashboard
        </h1>

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
              backgroundColor: activeTab === 'blog' ? "#226897" : "#e9ecef",
              color: activeTab === 'blog' ? "white" : "#333",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {isEditing && editingBlog ? 'Edit Blog' : 'Create Blog'}
          </button>
          <button
            onClick={() => setActiveTab('event')}
            style={{
              backgroundColor: activeTab === 'event' ? "#226897" : "#e9ecef",
              color: activeTab === 'event' ? "white" : "#333",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontFamily: "Quicksand, sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            {isEditing && editingEvent ? 'Edit Event' : 'Create Event'}
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
            textAlign: "center",
            fontFamily: "Quicksand, sans-serif"
          }}>
            {message}
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem"
        }}>
          {/* Left Column - Create/Edit Forms */}
          <div>
            {activeTab === 'blog' ? (
              <div style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <h2 style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#226897"
                }}>
                  {isEditing ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                
                <form onSubmit={handleBlogSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Title:
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={blogForm.title}
                      onChange={handleBlogInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Snippet:
                    </label>
                    <textarea
                      name="snippet"
                      value={blogForm.snippet}
                      onChange={handleBlogInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif",
                        minHeight: "80px",
                        resize: "vertical"
                      }}
                      placeholder="Brief description of the blog..."
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Author:
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={blogForm.author}
                      onChange={handleBlogInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Content:
                    </label>
                    <textarea
                      name="content"
                      value={blogForm.content}
                      onChange={handleBlogInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif",
                        minHeight: "200px",
                        resize: "vertical"
                      }}
                      placeholder="Write your blog content here..."
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Image Upload:
                    </label>
                    <div
                      style={{
                        border: `2px dashed ${isDragOver ? "#226897" : "#ddd"}`,
                        borderRadius: "8px",
                        padding: "2rem",
                        textAlign: "center",
                        backgroundColor: isDragOver ? "#f8f9fa" : "white",
                        transition: "all 0.3s ease",
                        cursor: "pointer"
                      }}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadedImage ? (
                        <div>
                          <img 
                            src={uploadedImage} 
                            alt="Uploaded" 
                            style={{
                              maxWidth: "200px",
                              maxHeight: "200px",
                              borderRadius: "8px",
                              marginBottom: "1rem"
                            }}
                          />
                          <p style={{ color: "#226897", fontWeight: "600" }}>Image uploaded successfully!</p>
                        </div>
                      ) : (
                        <div>
                          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                            Drag and drop an image here, or click to select
                          </p>
                          <p style={{ fontSize: "0.9rem", color: "#999" }}>
                            Supports: JPG, PNG, GIF (Max: 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      style={{ display: "none" }}
                    />
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center"
                  }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: "#226897",
                        color: "white",
                        border: "none",
                        padding: "1rem 2rem",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.6 : 1,
                        transition: "all 0.3s ease"
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Blog' : 'Create Blog')}
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: "#6c757d",
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
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div style={{
                backgroundColor: "white",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
              }}>
                <h2 style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "2rem",
                  marginBottom: "1.5rem",
                  color: "#226897"
                }}>
                  {isEditing ? 'Edit Event' : 'Create New Event'}
                </h2>
                
                <form onSubmit={handleEventSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Event Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={eventForm.name}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Date:
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={eventForm.date}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Time:
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={eventForm.time}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Location:
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={eventForm.location}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      Description:
                    </label>
                    <textarea
                      name="description"
                      value={eventForm.description}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif",
                        minHeight: "100px",
                        resize: "vertical"
                      }}
                      placeholder="Describe the event..."
                      required
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontFamily: "Quicksand, sans-serif",
                      fontWeight: "600",
                      color: "#333"
                    }}>
                      RSVP URL (optional):
                    </label>
                    <input
                      type="url"
                      name="url"
                      value={eventForm.url}
                      onChange={handleEventInputChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontFamily: "Quicksand, sans-serif"
                      }}
                      placeholder="https://example.com/rsvp"
                    />
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center"
                  }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: "#226897",
                        color: "white",
                        border: "none",
                        padding: "1rem 2rem",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontFamily: "Quicksand, sans-serif",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        opacity: isSubmitting ? 0.6 : 1,
                        transition: "all 0.3s ease"
                      }}
                    >
                      {isSubmitting ? 'Submitting...' : (isEditing ? 'Update Event' : 'Create Event')}
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        style={{
                          backgroundColor: "#6c757d",
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
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column - Manage Existing Items */}
          <div>
            <div style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              height: "600px",
              overflow: "hidden"
            }}>
              <h2 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: "2rem",
                marginBottom: "1.5rem",
                color: "#226897"
              }}>
                Manage {activeTab === 'blog' ? 'Blogs' : 'Events'}
              </h2>
              
              <div style={{
                height: "calc(100% - 80px)",
                overflowY: "auto",
                paddingRight: "0.5rem"
              }}>
                {activeTab === 'blog' ? (
                  <div>
                    {blogs.length === 0 ? (
                      <p style={{
                        textAlign: "center",
                        color: "#666",
                        fontFamily: "Quicksand, sans-serif",
                        marginTop: "2rem"
                      }}>
                        No blogs created yet.
                      </p>
                    ) : (
                      blogs.map((blog) => (
                        <div
                          key={blog._id}
                          style={{
                            border: "1px solid #e9ecef",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "#f8f9fa"
                          }}
                        >
                          <h3 style={{
                            fontFamily: "Quicksand, sans-serif",
                            fontSize: "1.2rem",
                            color: "#226897",
                            marginBottom: "0.5rem"
                          }}>
                            {blog.title || 'Untitled'}
                          </h3>
                          <p style={{
                            fontFamily: "Quicksand, sans-serif",
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "0.5rem"
                          }}>
                            By {blog.author || 'Unknown'} • {formatDate(blog.createdAt)}
                          </p>
                          {blog.snippet && (
                            <p style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontSize: "0.9rem",
                              color: "#333",
                              marginBottom: "1rem"
                            }}>
                              {blog.snippet}
                            </p>
                          )}
                          <div style={{
                            display: "flex",
                            gap: "0.5rem"
                          }}>
                            <button
                              onClick={() => handleEditBlog(blog)}
                              style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#218838";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#28a745";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id)}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#c82333";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#dc3545";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div>
                    {events.length === 0 ? (
                      <p style={{
                        textAlign: "center",
                        color: "#666",
                        fontFamily: "Quicksand, sans-serif",
                        marginTop: "2rem"
                      }}>
                        No events created yet.
                      </p>
                    ) : (
                      events.map((event) => (
                        <div
                          key={event._id}
                          style={{
                            border: "1px solid #e9ecef",
                            borderRadius: "8px",
                            padding: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: "#f8f9fa"
                          }}
                        >
                          <h3 style={{
                            fontFamily: "Quicksand, sans-serif",
                            fontSize: "1.2rem",
                            color: "#226897",
                            marginBottom: "0.5rem"
                          }}>
                            {event.name || 'Untitled'}
                          </h3>
                          <p style={{
                            fontFamily: "Quicksand, sans-serif",
                            fontSize: "0.9rem",
                            color: "#666",
                            marginBottom: "0.5rem"
                          }}>
                            {formatDate(event.date)} at {event.time} • {event.location}
                          </p>
                          {event.description && (
                            <p style={{
                              fontFamily: "Quicksand, sans-serif",
                              fontSize: "0.9rem",
                              color: "#333",
                              marginBottom: "1rem"
                            }}>
                              {event.description}
                            </p>
                          )}
                          <div style={{
                            display: "flex",
                            gap: "0.5rem"
                          }}>
                            <button
                              onClick={() => handleEditEvent(event)}
                              style={{
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#218838";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#28a745";
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event._id)}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                padding: "0.5rem 1rem",
                                borderRadius: "4px",
                                fontSize: "0.8rem",
                                fontFamily: "Quicksand, sans-serif",
                                fontWeight: "600",
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#c82333";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#dc3545";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 