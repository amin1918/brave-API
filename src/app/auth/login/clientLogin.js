"use client";
import { useUserStore } from "@/app/_zustand/userStore";
import Container from "@/app/components/container/Container";
import fetchAPI from "@/utils/fetch-api";
import { useState, useEffect } from "react";

export default function LoginPage({ users }) {
  const { login, logout, currentUser } = useUserStore();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [wrongInfo, setWrongInfo] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    async function restoreLoginFromDB() {
      try {
        const activeUser = users.find(u => u.logged);
        if (activeUser) {
          login(activeUser);
          setLoginStatus(true);
        }
      } catch (error) {
        console.error("Error restoring logged user:", error);
      }
    }
    restoreLoginFromDB();
  }, [users, login]);

  // تغییر اطلاعات فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({ ...prev, [name]: value }));
  };

  // ورود کاربر
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === loginInfo.email && u.password === loginInfo.password);

    if (!user) {
      setWrongInfo("Wrong Email or Password");
      return;
    }

    login(user);
    await updateUserLoggedStatus(user.id, true);
    setLoginStatus(true);
    setWrongInfo("");
  };

  // بروزرسانی وضعیت لاگین در دیتابیس
  const updateUserLoggedStatus = async (userId, loggedState) => {
    try {
      await fetchAPI(`http://localhost:8002/users/${userId}`, {
        method: "PATCH",
        body: { logged: loggedState }
      });
    } catch (error) {
      console.error("Error updating logged status:", error);
    }
  };

  // خروج کاربر
  const handleSignOut = async () => {
    try {
      await updateUserLoggedStatus(currentUser.id, false);
      logout();
      setLoginStatus(false);
      setLoginInfo({ email: "", password: "" });
      setWrongInfo("");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Container>
      {!loginStatus ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <span className="text-red-800 text-sm">{wrongInfo}</span>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  name="email"
                  type="email"
                  value={loginInfo.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Password</label>
                <input
                  name="password"
                  type="password"
                  value={loginInfo.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Signed In</h1>
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-sm font-semibold mb-1">Name</label>
                <h1>{currentUser.fullName}</h1>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <h1>{currentUser.email}</h1>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-900 transition-colors mt-4"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
