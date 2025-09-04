import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api.js';
import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function BioBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await blogAPI.getAll();
      // Sort blogs by creation date (most recent first)
      const sortedBlogs = blogsData.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setBlogs(sortedBlogs);
      setError('');
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', err);
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

  // Get current page blogs
  const getCurrentPageBlogs = () => {
    const startIndex = (currentPage - 1) * blogsPerPage;
    const endIndex = startIndex + blogsPerPage;
    return blogs.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const currentBlogs = getCurrentPageBlogs();

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
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
        zIndex: 1
      }}>
        <div style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "5rem",
          paddingBottom: "2rem"
        }}>
          <div className="max-w-4xl mx-auto px-6">
            <h1 style={{
              fontFamily: "Anton, sans-serif",
              fontSize: "3rem",
              fontWeight: "400",
              textAlign: "center",
              color: "#226897",
              marginBottom: "2rem",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
            }}>BioBlog</h1>
            
            {loading && (
              <div className="text-center py-8">
                <p className="text-gray-600" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}>Loading blogs...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {!loading && !error && blogs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600" style={{ textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }}>No blog posts available at the moment.</p>
              </div>
            )}

            {!loading && !error && blogs.length > 0 && (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Featured Article (first blog on current page) */}
                  {currentBlogs.length > 0 && currentBlogs[0] && currentPage === 1 && (
                    <div 
                      className="md:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                      style={{
                        transition: "transform 0.3s ease",
                        transform: "scale(1)",
                        transformOrigin: "center center",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        border: "3px solid #68adc4"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      onClick={() => handleBlogClick(currentBlogs[0]._id)}
                    >
                      
                      {currentBlogs[0].imageUrl ? (
                        <div 
                          style={{ 
                            height: "12rem",
                            backgroundImage: `url(${currentBlogs[0].imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                          }}
                        >
                          <div style={{
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}>
                            <h2 style={{
                              color: "white",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              fontFamily: "Anton, sans-serif"
                            }}>
                              Latest Article
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          height: "12rem",
                          background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <h2 style={{
                            color: "white",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            fontFamily: "Anton, sans-serif"
                          }}>
                            Latest Article
                          </h2>
                        </div>
                      )}
                      <div style={{ padding: "1.5rem" }}>
                        <h3 style={{
                          fontFamily: "roboto, sans-serif",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#226897",
                          marginBottom: "0.5rem"
                        }}>
                          {currentBlogs[0].title || 'Untitled'}
                        </h3>
                        <p style={{
                          color: "#6b7280",
                          marginBottom: "1rem",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "1rem",
                          lineHeight: "1.5"
                        }}>
                          {currentBlogs[0].snippet || 'No snippet available'}
                        </p>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <div style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            fontFamily: "roboto, sans-serif"
                          }}>
                            <span>By {currentBlogs[0].author || 'Unknown Author'}</span>
                            <span style={{ margin: "0 0.5rem" }}>•</span>
                            <span>{formatDate(currentBlogs[0].createdAt)}</span>
                          </div>
                          <button style={{
                            backgroundColor: "#226897",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                            fontFamily: "roboto, sans-serif",
                            border: "none",
                            cursor: "pointer"
                          }}>
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Regular Articles (remaining blogs on current page) */}
                  {currentBlogs.slice(currentPage === 1 ? 1 : 0).map((blog, index) => (
                    <div
                      key={blog._id || index} 
                      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                      style={{
                        transition: "transform 0.3s ease",
                        transform: "scale(1)",
                        transformOrigin: "center center",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                        border: "3px solid #68adc4"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      onClick={() => handleBlogClick(blog._id)}
                    >
                      <div style={{ padding: "1.5rem" }}>
                        <h3 style={{
                          fontFamily: "roboto, sans-serif",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#226897",
                          marginBottom: "0.5rem"
                        }}>
                          {blog.title || 'Untitled'}
                        </h3>
                        <p style={{
                          color: "#6b7280",
                          marginBottom: "1rem",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "1rem",
                          lineHeight: "1.5"
                        }}>
                          {blog.snippet || 'No snippet available'}
                        </p>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <div style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            fontFamily: "roboto, sans-serif"
                          }}>
                            <span>By {blog.author || 'Unknown Author'}</span>
                            <span style={{ margin: "0 0.5rem" }}>•</span>
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                          <button style={{
                            backgroundColor: "#226897",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.8rem",
                            textTransform: "uppercase",
                            fontFamily: "roboto, sans-serif",
                            border: "none",
                            cursor: "pointer"
                          }}>
                            Read →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center gap-4">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === 1
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      ← Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                            currentPage === index + 1
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === totalPages
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                )}

                {/* Page Info */}
                {totalPages > 1 && (
                  <div className="mt-4 text-center text-gray-600">
                    <p className="text-sm">
                      Showing {((currentPage - 1) * blogsPerPage) + 1} to {Math.min(currentPage * blogsPerPage, blogs.length)} of {blogs.length} blog posts
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 