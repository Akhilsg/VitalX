import React, { useState, useEffect } from "react";
import axios from "axios";

const Protected = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const baseUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(
          `https://vitalx-backend.onrender.com/api/users/protected`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Unauthorized");
      }
    };
    fetchData();
  }, []);

  return <h2>{message}</h2>;
};

export default Protected;
