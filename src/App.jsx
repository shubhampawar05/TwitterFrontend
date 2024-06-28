import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import SignUpPage from "./page/auth/SignUpPage";
import LoginPage from "./page/auth/LoginPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./page/notification/NotificationPage";
import ProfilePage from "./page/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me",{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
          			credentials:"include",
				});
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className=" flex max-w-6xl mx-auto">
        <BrowserRouter>
          {authUser && <Sidebar />}
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
            />
            <Route
              path="/notifications"
              element={
                authUser ? <NotificationPage /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/profile/:username"
              element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
            />
          </Routes>
          {authUser && <RightPanel />}
          <Toaster />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
