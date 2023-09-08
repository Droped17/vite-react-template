import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";

// ใช้ createBrowserRouter

// Routes
// const routes = [
//   // Route
//   {
//     path: "/",
//     element: <div>HomePage</div>,
//   },
//   {
//     path: "/profile",
//     element: <div>Profile Page</div>,
//   },
//   {
//     path: "/feed",
//     element: <div>Feed Page</div>,
//   },
//   {
//     path: "/friend",
//     element: <div>Feed Page</div>,
//   },
//   {
//     path: "*",
//     element: <Navigate to='/'/>,
//   },
// ];

// const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(

    <App/>

);
