import React, { createContext,useContext,useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { useState } from 'react'



/* 
1.สร้าง context โดยใช้ createContext
2.สร้าง HOC 
*/



// Provider
const AuthContext = createContext();

function AuthContextProv(props){
  const [isAuth,setIsAuth] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  function handleAuth(){
    if (!isAuth) {
      setIsLoading(true);
      setTimeout(() => {
        setIsAuth(true);
        setIsLoading(false);
      }, 3000);
    }else{
      setIsAuth(false);
    }
  }

  const sharedObj = {isAuth,handleAuth, isLoading}

  return (
    <>
      <AuthContext.Provider value={sharedObj}>{props.children}</AuthContext.Provider>
    </>
  );
}


function App(){

// Consumer
const {isAuth,handleAuth,isLoading} = useContext(AuthContext);

  return (
    <>
      <div className='App'>
        {/* condition render */}
        {isLoading ? <h1>Loading..</h1> : <h1>Welcome.. {!isAuth ? "Guest" : "User"}</h1> }
        <button onClick={handleAuth} disabled={isLoading}>{!isAuth ? "Login" : "Logout"}</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProv>
    <App/>
  </AuthContextProv>
    

)
