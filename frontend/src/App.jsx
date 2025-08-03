import { useEffect, useState, useRef } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify' // Add this import
import 'react-toastify/dist/ReactToastify.css' // Add this import
import Login from './pages/Login'
import Home from './pages/Home'
import Protected from './components/Protected'
import './App.css'

function App() {
  const ws = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    // Create WebSocket connection
    ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/?token=${token}`);
    
    ws.current.onopen = () => {
      console.log('WebSocket connected globally');
    };
    
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // 1. Show toast immediately (no delay)
      toast.success(data.message || 'New task message received!');
      
      // 2. Play sound immediately
      playNotificationSound();
      
      // 3. Store message for task page
      storeMessageForTaskPage(data);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const playNotificationSound = () => {
    // Create audio element and play instantly
    const audio = new Audio('/notification-sound.mp3'); // Add sound file to public folder
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const storeMessageForTaskPage = (message) => {
    // Store in localStorage for task page to read
    const existingMessages = JSON.parse(localStorage.getItem('taskMessages') || '[]');
    existingMessages.push({
      ...message,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('taskMessages', JSON.stringify(existingMessages));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Navigate to="/login" replace />} /> */}
        <Route path='/login' element={<Login />}/>
        <Route element={<Protected />}>
          <Route path='/' element={<Home />} />
        </Route>
      </Routes>

      {/* Toast Container for notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  )
}

export default App
