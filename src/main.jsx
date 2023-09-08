import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
import axios from "axios";

/* 
1.สร้าง context โดยใช้ createContext
2.สร้าง HOC 
*/

// Provider
const AuthContext = createContext();

function AuthContextProv(props) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // function handleAuth(){
  //   if (!isAuth) {
  //     setIsLoading(true);
  //     setTimeout(() => {
  //       setIsAuth(true);
  //       setIsLoading(false);
  //     }, 3000);
  //   }else{
  //     setIsAuth(false);
  //   }
  // }

  // Async
  async function handleAuth() {
    // Login => Logout
    if (isAuth) {
      setIsAuth(false);
      return;
    }

    // Logout => Login
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      console.log(response.data);
      setIsAuth(true);

      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  const sharedObj = { isAuth, handleAuth, isLoading, user };

  return (
    <>
      <AuthContext.Provider value={sharedObj}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
}

function App() {
  // Consumer
  const { isAuth, handleAuth, isLoading, user } = useContext(AuthContext);

  return (
    <>
      <div className="App">
        {/* condition render */}
        {isLoading ? (
          <h1>Loading..</h1>
        ) : (
          <h1>Welcome.. {!isAuth ? "Guest" : user.name}</h1>
        )}
        <button onClick={handleAuth} disabled={isLoading}>
          {!isAuth ? "Login" : "Logout"}
        </button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProv>
    <App />
  </AuthContextProv>
);
