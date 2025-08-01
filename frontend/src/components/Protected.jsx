import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';
import Login from '../pages/Login';

export default function Protected() {
  
    const token = localStorage.getItem("accessToken");

    return token ? <Outlet /> : null; 
}
