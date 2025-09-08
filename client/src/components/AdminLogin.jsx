import { useState } from 'react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call the authentication API
      const authUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5050'}/api/auth/login`;
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Success - set authentication state and redirect
        localStorage.setItem('adminAuthenticated', 'true');
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
      padding: "2rem"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "16px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        position: "relative"
      }}>
        {/* Admin Icon */}
        <div style={{
          textAlign: "center",
          marginBottom: "2rem"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#226897",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold"
          }}>
            A
          </div>
          <h1 style={{
            fontFamily: "Anton, sans-serif",
            color: "#226897",
            fontSize: "2rem",
            margin: "0 0 0.5rem 0"
          }}>
            Admin Login
          </h1>
          <p style={{
            fontFamily: "roboto, sans-serif",
            color: "#666",
            fontSize: "0.9rem",
            margin: 0
          }}>
            Access administrative controls
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{
              display: "block",
              fontFamily: "roboto, sans-serif",
              color: "#226897",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginBottom: "0.5rem"
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "1rem",
                fontFamily: "roboto, sans-serif",
                transition: "border-color 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#226897";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e9ecef";
              }}
              placeholder="Enter username"
              required
            />
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <label style={{
              display: "block",
              fontFamily: "roboto, sans-serif",
              color: "#226897",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginBottom: "0.5rem"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #e9ecef",
                borderRadius: "8px",
                fontSize: "1rem",
                fontFamily: "roboto, sans-serif",
                transition: "border-color 0.3s ease",
                boxSizing: "border-box"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#226897";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e9ecef";
              }}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "0.75rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              fontFamily: "roboto, sans-serif",
              fontSize: "0.9rem",
              border: "1px solid #f5c6cb"
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: isLoading ? "#6c757d" : "#226897",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontFamily: "roboto, sans-serif",
              fontWeight: "bold",
              cursor: isLoading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
              opacity: isLoading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = "#1a5a7a";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = "#226897";
              }
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          textAlign: "center",
          marginTop: "2rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e9ecef"
        }}>
          <p style={{
            fontFamily: "roboto, sans-serif",
            color: "#666",
            fontSize: "0.8rem",
            margin: 0
          }}>
            For authorized personnel only
          </p>
        </div>
      </div>
    </div>
  );
} 