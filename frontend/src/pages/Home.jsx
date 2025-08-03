import { useEffect, useState } from "react";
import { api } from "../axios";
import { useAuth } from "../AuthContext";
import "../styles/Global.css";

const Home = () => {
  const { logout } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists before making API call
    const token = localStorage.getItem("accessToken");
    // console.log("Home component - Token check:", token);
    
    if (!token) {
      alert("No token found, redirecting to login");
      logout();
      return;
    }

    // Make API call with proper error handling
    api.get("test/create-user/2/")
      .then(res => {
        console.log("API response:", res.data);
        setMessage(res.data.message || "You're authenticated!");
        setLoading(false);
      })
      .catch((error) => {
        console.error("API Error:", error);
        console.error("Error response:", error.response);
        if (error.response?.status === 401) {
          console.log("Unauthorized - logging out");
          logout();
        } else {
          setMessage("Error loading data. Please try again.");
          setLoading(false);
        }
      });
  }, [logout]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '20px', textAlign: 'center' }}>
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        background: 'white', 
        padding: '30px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        marginTop: '20px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Dashboard</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>{message}</p>
        <button 
          onClick={logout}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
