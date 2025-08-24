const BASE_URL = 'http://localhost:5050/api';

const apiCall = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
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

  return response.json();
};

export const blogAPI = {
  getAll: () => apiCall('/blogs'),
  getById: (id) => apiCall(`/blogs/${id}`),
  create: (data) => apiCall('/blogs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/blogs/${id}`, {
    method: 'DELETE',
  }),
};

export const eventAPI = {
  getAll: () => apiCall('/events'),
  getById: (id) => apiCall(`/events/${id}`),
  create: (data) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/events/${id}`, {
    method: 'DELETE',
  }),
};

export const emailAPI = {
  getAll: () => apiCall('/emails'),
  getById: (id) => apiCall(`/emails/${id}`),
  subscribe: (email) => apiCall('/emails', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  update: (id, data) => apiCall(`/emails/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/emails/${id}`, {
    method: 'DELETE',
  }),
}; 