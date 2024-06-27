import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/home/HomePage";
import SignUpPage from "./page/auth/SignUpPage";
import LoginPage from "./page/auth/LoginPage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import NotificationPage from "./page/notification/NotificationPage";
import ProfilePage from "./page/profile/ProfilePage";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div className=" flex max-w-6xl mx-auto">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
          </Routes>
          <RightPanel />
          <Toaster/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
