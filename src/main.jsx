import React, { createContext,useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useState } from 'react'


// Provider
const AuthContext = createContext();

function AuthContextProv(props){
  return (
    <>
      <AuthContext.Provider>{props.children}</AuthContext.Provider>
    </>
  );
}

// Consumer



function App(){

  const [isAuth,setIsAuth] = useState(false);


  function handleAuth(){
    setIsAuth(!isAuth);
  }

  return (
    <>
      <div className='App'>
        <h1>Welcome.. {!isAuth ? "Guest" : "User"}</h1>
        <button onClick={handleAuth}>{!isAuth ? "Login" : "Logout"}</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <App/>

)
