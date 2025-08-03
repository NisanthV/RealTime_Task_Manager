import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';

export default function Protected() {
  
    const token = localStorage.getItem("accessToken");
    // console.log("Protected component - Token check:", token);
    
    if (!token) {
        console.log("No token found, redirecting to login");
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
}
