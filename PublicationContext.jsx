import React, { createContext, useState, useContext } from 'react';

const PublicationContext = createContext();

export const usePublications = () => useContext(PublicationContext);

export const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);

  const addPublication = (publication) => {
    setPublications([publication, ...publications]);
  };

  return (
    <PublicationContext.Provider value={{ publications, addPublication }}>
      {children}
    </PublicationContext.Provider>
  );
};