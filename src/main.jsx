import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";
import { func } from "prop-types";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function HomePage() {

  const [friend, setFriend] = useState([]);

  const navigate = useNavigate();
  // Navigate สามารถเลือกใช้ตามจังหวะได้ ต่างกับ Link ที่กดแล้วไปเลย

  function handleNavigate(userId){
    if (userId == 1) {
      navigate('/profile');
    }else{
      navigate(`/profile/${userId}`);
    }
  }

  async function fetchFriend() {
    try {
      const response = await axios.get("/users");
      console.log(response.data);
      setFriend(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFriend();
  }, []);

  return (
  
      <div className="App">
        <h1>Home Page</h1>
        {friend.map((f) => (
          <div onClick={() => handleNavigate(f.id)} className="friend" key={f.id}>
            <h3>{f.name}</h3>
            <h3>
              {f.email}, {f.phone}
            </h3>
          </div>
        ))}
      </div>
   
  );
}
function ProfilePage() {
  return (
    <>
      <div className="App">Profile Page</div>
    </>
  );
}
function FriendPage() {
  return (
    <>
      <div className="App">Friend Page</div>
    </>
  );
}
function FeedPage() {
  return (
    <>
      <div className="App">Feed Page</div>
    </>
  );
}

// Routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Link to="/">HOME</Link>
    <Link to="/profile">Profile Page</Link>
    <Link to="/profile/5">Friend Page</Link>
    <Link to="/feed">Feed</Link>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:id" element={<FriendPage />} />{" "}
      {/* dynamic route */}
      <Route path="/feed" element={<FeedPage />} />
    </Routes>
  </BrowserRouter>
);
