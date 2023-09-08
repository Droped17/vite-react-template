import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// CONTEXT
// 1.สร้าง context ก่อนโดย import createContext
// 2.สร้าง context โดย createContext[Provider,Consumer]
const ThemeContext = createContext();
// 3.สร้าง HOC : Higher Order Component
// HOC คือ FN COMPONENT ที่รับ Component เข้าไปแล้ว return Component ใหม่ออกมา (อัพเวลให้ component)
// function ThemeContextProvider(props) {
//   return (
//     <div>{props.children}</div> //children ทุกตัวจะใช้งานค่า props ได้
//   );
// }

function ThemeContextProv(props) {
  // Data: isDarkMode,stylesObj
  // Logic: setIsDarkMode,handleToggleTheme

  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  function handleToggleTheme() {
    setIsDarkMode(!isDarkMode);
  }

  const sharedObj = {theme: stylesObj,toggleTheme: handleToggleTheme};


   return (
    <ThemeContext.Provider value={sharedObj}>{props.children}</ThemeContext.Provider> //children ทุกตัวจะใช้งานค่า props ได้
  );
}
// 4.Shared dayta & logic ผ่าน attribute value
// => Data (state,boolean,string,object,array,...)
// => Logic (fn ต่างๆ)

// 5.เอาตัว Provider ไปครอบ children (ต่อด้านล่าง)


/* ##################################################################### */
// ฝั่ง Consumer
// 1.ดึงค่า sharedObj ที่ชื่อว่า useContext
/* 
  const {ค่าที่ต้องการ} = useContenxt(contextName);
*/



// UI
function App() {
  const {theme,toggleTheme} = useContext(ThemeContext);

  return (
    <>
      <div className="App" style={theme}>
        <h1>Theme App</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  /* 4. */
  <ThemeContextProv>
    <App></App> {/* มองเป็น props ที่อยู่ใน children */}
  </ThemeContextProv>
);
