import React from 'react'
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <ul>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul>
      <Outlet />
    </div>
  );
}
