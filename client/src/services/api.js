import axios from 'axios';
import { FOUNDERS_DATA } from '../config/foundersConfig';
import { MOCK_PROJECTS } from '../data/mockProjects';
import { MOCK_REVIEWS } from '../data/mockReviews';

const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  // If deployed in production on Vercel or any non-localhost host, prevent stale localhost URLs
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
      return '/api';
    }
  }
  return envUrl || '/api';
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000 // 15 seconds to allow SMTP handshake & delivery confirmation
});

export const fetchFounders = async () => {
  try {
    const response = await apiClient.get('/founders');
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    return { data: FOUNDERS_DATA, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for founders, using config fallback:', error.message);
    return { data: FOUNDERS_DATA, isMock: true };
  }
};

export const fetchProjects = async (category = 'All') => {
  try {
    const url = category && category !== 'All' ? `/projects?category=${encodeURIComponent(category)}` : '/projects';
    const response = await apiClient.get(url);
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    const filteredMock = category && category !== 'All'
      ? MOCK_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : MOCK_PROJECTS;
    return { data: filteredMock, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for projects, using fallback data:', error.message);
    const filteredMock = category && category !== 'All'
      ? MOCK_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase())
      : MOCK_PROJECTS;
    return { data: filteredMock, isMock: true };
  }
};

export const fetchReviews = async () => {
  try {
    const response = await apiClient.get('/reviews');
    if (response.data && response.data.data) {
      return { data: response.data.data, isMock: false };
    }
    return { data: MOCK_REVIEWS, isMock: true };
  } catch (error) {
    console.warn('[API Client] Backend unreachable for reviews, using fallback data:', error.message);
    return { data: MOCK_REVIEWS, isMock: true };
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('[API Client] Contact form submit error:', error.message);
    // Extract server-side message if available (validation errors, email errors, etc.)
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Something went wrong while sending your message. Please try again.');
    }
    // Network/connection error
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
};
