import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

// create a content
const AuthContext = createContext();

// export the fucntion to use the content in another file
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [tokenExpiration, setTokenExpiration] = useState(
    localStorage.getItem("tokenExpiration")
  ); // Store token expiration time
  const [userToken, setUserToken] = useState(localStorage.getItem("token")); // store the token that contains user information
  const apiurl = process.env.REACT_APP_BASE_URL;

  // Load token and expiration time from local storage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedTokenExpiration = localStorage.getItem("tokenExpiration");

    if (storedToken && storedTokenExpiration) {
      // Convert storedTokenExpiration to a Date object
      const expirationTime = new Date(parseInt(storedTokenExpiration, 10));

      if (expirationTime > new Date()) {
        // Token is not expired, set the user as authenticated
        setUserToken(storedToken);
        setTokenExpiration(expirationTime);
      } else {
        // Token is expired, set the user as unauthenticated
        setUserToken(null);
        setTokenExpiration(null);
      }
    } else {
      // No token found, set the user as unauthenticated
      setUserToken(null);
      setTokenExpiration(null);
    }
  }, []);

  // Implementing sign-in function
  const signIn = async (email, password) => {
    // Request body in JSON format
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(`${apiurl}/signin`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const dataResponse = await response.json();
        const { data } = dataResponse;
        const { token, message } = data;

        // Decode the token to retrieve the expiration time
        const decodedToken = jwt_decode(token);

        // Store the token and expiration time in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", decodedToken.exp * 1000);

        // store in state
        setUserToken(token);
        setTokenExpiration(decodedToken.exp * 1000);
        return {
          userToken,
          message,
        };
      } else {
        const errorData = await response.json();
        const { error } = errorData;
        return { error };
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  // to logout
  const signOut = () => {
    // Clear token expiration time
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  };

  // Check token expiration on each render
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (tokenExpiration && new Date() > tokenExpiration) {
        // Token has expired, log the user out
        signOut();
      }
    };

    // Set up an interval to periodically check token expiration every minute
    const intervalId = setInterval(checkTokenExpiration, 60000); // 60,000 ms = 1 minute

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [tokenExpiration]);

  const contextValue = {
    userToken,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={{ ...contextValue }}>
      {children}
    </AuthContext.Provider>
  );
}
