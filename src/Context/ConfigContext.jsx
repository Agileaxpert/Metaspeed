import React, { createContext, useContext } from 'react';
import Config from '../Config/Config.js';


const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  return (
    <ConfigContext.Provider value={Config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
