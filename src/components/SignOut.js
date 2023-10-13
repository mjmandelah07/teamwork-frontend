import React from 'react'
import { useAuth } from '../utilities/AuthContext';
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const { signOut } = useAuth(); // Access the signOut function from AuthContext
  const navigate = useNavigate(); 

  const handleSignOut = () => {
    signOut(); // Call the signOut function to log the user out
    navigate("/login"); // Redirect to the login route after signing out
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
