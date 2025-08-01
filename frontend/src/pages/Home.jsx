import { useEffect, useState } from "react";
import api from "../axios";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { logout } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("create-user/1/") // or any authenticated endpoint
      .then(res => setMessage(res.data.message || "You're authenticated!"))
      .catch(() => logout());
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <p>{message}</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
