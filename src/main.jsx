import React, { createContext,useContext } from 'react'
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


  function handleAuth(){
    setIsAuth(!isAuth);
  }

  const sharedObj = {auth: isAuth,toggle: handleAuth}

  return (
    <>
      <AuthContext.Provider value={sharedObj}>{props.children}</AuthContext.Provider>
    </>
  );
}


function App(){

// Consumer
const {auth,toggle} = useContext(AuthContext);

  return (
    <>
      <div className='App'>
        <h1>Welcome.. {!auth ? "Guest" : "User"}</h1>
        <button onClick={toggle}>{!auth ? "Login" : "Logout"}</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProv>
    <App/>
  </AuthContextProv>
    

)
