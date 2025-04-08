import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Protected = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/users/protected`, {
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
