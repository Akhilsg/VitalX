import React, { useState, useEffect } from "react";
import axios from "axios";

const Protected = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
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
