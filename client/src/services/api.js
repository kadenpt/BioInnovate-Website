const API_BASE_URL = 'http://localhost:5050/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Blog API functions
export const blogAPI = {
  // Get all blogs
  getAll: () => apiCall('/blogs'),
  
  // Get single blog by ID
  getById: (id) => apiCall(`/blogs/${id}`),
  
  // Create new blog
  create: (blogData) => apiCall('/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  }),
  
  // Update blog
  update: (id, blogData) => apiCall(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blogData),
  }),
  
  // Delete blog
  delete: (id) => apiCall(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

// Event API functions
export const eventAPI = {
  // Get all events
  getAll: () => apiCall('/events'),
  
  // Get single event by ID
  getById: (id) => apiCall(`/events/${id}`),
  
  // Create new event
  create: (eventData) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  
  // Update event
  update: (id, eventData) => apiCall(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),
  
  // Delete event
  delete: (id) => apiCall(`/events/${id}`, {
    method: 'DELETE',
  }),
}; 