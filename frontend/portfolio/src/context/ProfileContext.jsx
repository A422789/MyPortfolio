import media from '../generated/media.json';
import { createContext, useContext } from 'react';
import { profileData } from '../content/profileData';

const localProfile = { ...profileData, cvFile: { url: media[profileData.cvFile.url].src } };

const ProfileContext = createContext({ profile: localProfile });

export const ProfileProvider = ({ children }) => (
  <ProfileContext.Provider value={{ profile: localProfile }}>
    {children}
  </ProfileContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext);
