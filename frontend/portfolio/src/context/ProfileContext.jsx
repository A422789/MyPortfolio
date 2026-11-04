import React, { createContext, useContext } from 'react';
import { profileData } from '../content/profileData';

const ProfileContext = createContext({ profile: profileData });

export const ProfileProvider = ({ children }) => (
  <ProfileContext.Provider value={{ profile: profileData }}>
    {children}
  </ProfileContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);
