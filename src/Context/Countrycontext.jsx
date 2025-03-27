import { createContext, useContext, useState } from "react";

// Create context
const CountryContext = createContext();

// Provider component
export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [locationurl, setLocationurl] = useState("#");

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry, locationurl, setLocationurl}}>
      {children}
    </CountryContext.Provider>
  );
};

// Custom hook to use the context
export const useCountry = () => useContext(CountryContext);
