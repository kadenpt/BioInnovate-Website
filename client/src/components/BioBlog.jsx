import { useState, useEffect } from 'react';
import { blogAPI } from '../services/api.js';

export default function BioBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

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

  return (
    <div className="pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "3rem",
          fontWeight: "400",
          textAlign: "center",
          color: "#226897"
        }}>BioBlog</h1>
        
        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No blog posts available at the moment.</p>
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
                    transformOrigin: "center center"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {currentBlogs[0].imageUrl ? (
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${currentBlogs[0].imageUrl})` }}>
                      <div className="h-full bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-white text-2xl font-bold">Featured Article</h2>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                      <h2 className="text-white text-2xl font-bold">Featured Article</h2>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                      {currentBlogs[0].title || 'Untitled'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {currentBlogs[0].snippet || 'No snippet available'}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>By {currentBlogs[0].author || 'Unknown Author'}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(currentBlogs[0].createdAt)}</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
                  className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                  style={{
                    transition: "transform 0.3s ease",
                    transform: "scale(1)",
                    transformOrigin: "center center"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                    Blog Post
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {blog.title || 'Untitled'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {blog.snippet || 'No snippet available'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>By {blog.author || 'Unknown Author'}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-semibold">
                      Read →
                    </button>
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
  );
} 