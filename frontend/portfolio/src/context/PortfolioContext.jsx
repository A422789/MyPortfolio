import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const [profileRes, socialRes] = await Promise.allSettled([
          API.get('/profile'),
          API.get('/social-links'),
        ]);

        if (isMounted) {
          if (profileRes.status === 'fulfilled' && profileRes.value.data?.data) {
            setProfile(profileRes.value.data.data);
          }
          if (socialRes.status === 'fulfilled' && socialRes.value.data?.data) {
            setSocialLinks(socialRes.value.data.data);
          }
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to fetch portfolio data:', err);
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ profile, socialLinks, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
