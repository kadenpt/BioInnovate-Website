import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Check if user is authenticated
  // For now, we'll use a simple localStorage check
  // In a real app, you'd check for valid JWT tokens, session cookies, etc.
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" replace />;
  }

  // Render the protected content if authenticated
  return children;
} 