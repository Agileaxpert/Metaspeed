import { useState, useEffect } from "react";
const useConfig = () => {
 const [config, setConfig] = useState(null);
 
 useEffect(() => {
    const configUrl = `/config.json`;
    console.log(configUrl)
   fetch(configUrl)
     .then((response) => response.json())
     .then((data) => setConfig(data))
     .catch((error) => console.error("Error loading config:", error));
 }, []);
 return config;
};
export default useConfig;