import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./index.css";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function HomePage() {
  const [friend, setFriend] = useState([]);

  // Navigate สามารถเลือกใช้ตามจังหวะได้ ต่างกับ Link ที่กดแล้วไปเลย
  const navigate = useNavigate();

  function handleNavigate(userId) {
    if (userId == 1) {
      navigate("/profile");
    } else {
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
  const { userId } = useParams(); //ใช้ดึงค่าจาก path paremeter แต่ต้องดูด้วยว่า path ตรงหรือไม่
  console.log(userId);

  const [friend, setFriend] = useState(null);

  async function fetchFriendDetail() {
    try {
      const { data } = await axios.get(`/users/${userId}`);
      console.log(data);
      setFriend(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFriendDetail();
  }, []);

  return (
    <>
      <div className="App">
        {friend && (
          <div className="friend">
            <h3>{friend.name}</h3>
          </div>
        )}
      </div>
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

function NotFoundPage() {
  return (
    <>
      <div className="App">404: Not Found</div>
    </>
  );
}

function AppLayout() {
  return (
    <>
      <div>
        <Link to="/">HOME</Link>
        <Link to="/profile">Profile Page</Link>
        <Link to="/profile/5">Friend Page</Link>
        <Link to="/feed">Feed</Link>
      </div>
      <div>
        <Outlet></Outlet> {/* แทน child ใน nested route ถ้าไม่ใส่จะหน้าขาว*/}
      </div>
    </>
  );
}

// Routing
ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>  
  //   <Link to="/">HOME</Link>
  //   <Link to="/profile">Profile Page</Link>
  //   <Link to="/profile/5">Friend Page</Link>
  //   <Link to="/feed">Feed</Link>
  //   <Routes>
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/profile" element={<ProfilePage />} />
  //     <Route path="/profile/:userId" element={<FriendPage />} />{" "}
  //     {/* dynamic route */}
  //     <Route path="/feed" element={<FeedPage />} />
  //     {/* <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route> */}
  //     <Route path="*" element={<Navigate to="/"></Navigate>}></Route>{" "}
  //     {/* Re-direct */}
  //   </Routes>
  // </BrowserRouter>

<BrowserRouter>
<Routes>
  <Route path="/" element={<AppLayout></AppLayout>}> {/* parent โผล่ทุกหน้า*/} 
     {/* child */}
    <Route path="" element={<HomePage></HomePage>}/>
    <Route path="profile" element={<ProfilePage></ProfilePage>}/> 
    <Route path="profile/:userId" element={<FriendPage></FriendPage>}/> 
    <Route path="feed" element={<FeedPage></FeedPage>}/> 
    <Route path="*" element={<Navigate to="/" />}/> 
  </Route>
</Routes>
</BrowserRouter>
);
