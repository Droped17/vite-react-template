import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import FriendPage from "../pages/FriendPage";
import FeedPage from "../pages/FeedPage";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/profile",
      element: <ProfilePage/>,
    },
    {
      path: "/feed",
      element: <FeedPage/>,
    },
    {
      path: "/friend",
      element: <FriendPage/>,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    }
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default Router;