import React, { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useCountry } from "../../Context/Countrycontext";
import { useConfig } from '../../Context/ConfigContext';

const CountryDropdown = ({ onCountrySelect }) => {

  const config = useConfig();

  const [countries, setCountries] = useState([]);
  const { selectedCountry, setSelectedCountry ,locationurl, setLocationurl } = useCountry();
  

  // Fetch Secret Key dynamically
  const fetchSecretKey = async () => {
    try {
      const response = await fetch(
        config.fetchSecretKeyUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            SecretKey: config.countryListConfig.secretKey, // Move to env variable if needed
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const secretKey = (await response.text()).trim(); // Trim whitespace
      console.log("Fetched Secret Key:", secretKey);
      return secretKey;
    } catch (error) {
      console.error("Error fetching secret key:", error);
      return null;
    }
  };

  // Fetch country codes using the dynamically retrieved secret key
  const fetchCountries = async () => {
    try {
      const secretKey = await fetchSecretKey();
      if (!secretKey) return;

      const response = await fetch(
         config.fetchApiUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            SecretKey: secretKey,
            publickey: config.countryListConfig.publicKey,
            Project: config.project,
            getsqldata: { trace: config.trace },
          }),
        }
      );

      let textResponse = await response.text();
      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        throw new Error("Failed to parse API response: " + textResponse);
      }

      console.log("API Response:", data);

      // ✅ Ensure data is in expected format
      const countryList = data['ds_countrycode']['rows']
  .filter((country) => country?.country_code) // ✅ Use correct key 'country_code'
  .map((country) => ({
    code: country.country_code, // ✅ Use correct key
    flag: `https://flagcdn.com/${country.country_code.slice(0, 2).toLowerCase()}.svg`, 
    locationurl: country.locationurl || "#",// ✅ Use correct key
  }));

console.log(countryList);


      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  // Fetch user location and match country code
  const fetchUserCountry = async () => {
    try {
      if (!countries.length) return; // Ensure countries are loaded before proceeding

      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      // const userCountry = countries.find((c) => c.code === data?.country_code);
      const countryMatch = countries.find((c) => c.code === data['country_code_iso3']);
           console.log(countryMatch);

      if (countryMatch) {
        setSelectedCountry(countryMatch['code']);
        setLocationurl(countryMatch['locationurl']);
      }
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  // Fetch country data on mount
  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch user country after countries are loaded
  useEffect(() => {
    if (countries.length > 0) {
      fetchUserCountry();
    }
  }, [countries]);

  const handleChange = (event) => {
    const selectedCode = event.target.value;
    console.log("Selected Country Code:", selectedCode);
    const selectedCountryObj = countries.find((c) => c.code === selectedCode);
    setSelectedCountry(selectedCode);
    setLocationurl(selectedCountryObj?.locationurl || "#");
    if (onCountrySelect) {
      onCountrySelect(selectedCode);
     
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <Select
        id="country-select"
        value={selectedCountry}
        onChange={handleChange}
        displayEmpty
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.code}>
            <img
              src={country.flag}
              alt={country.code}
              width="25"
              height="15"
              style={{ marginRight: 10 }}
            />
            {country.code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CountryDropdown;
