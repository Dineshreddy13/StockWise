import { useState } from "react";
import SignIn from "@/auth/signin/SignIn";
import SignUp from "@/auth/signup/SignUp";
import { Navigate } from "react-router-dom";


const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // default: Sign In

  const token = localStorage.getItem("token");

  // If user is logged in, redirect to dashboard
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Date.now() / 1000;

      if (payload.exp > now) {
        return <Navigate to="/" replace />;
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return (
    <main className="min-h-screen flex flex-col lg:flex-row gap-3 lg:p-15 overflow-hidden">
      <section className="w-full lg:w-[40%] bg-neutral-900 p-6 rounded-xl overflow-y-auto lg:px-16">
        <div className="flex flex-col items-center gap-3">
          <img src="./src/assets/stockwise.png" alt="logo"
            className="h-[50px] w-auto rounded-md"
          />
          <h2 className="mb-9 text-center">StockWise</h2>
        </div>
        {isSignIn ? (
          <SignIn onSwitch={() => setIsSignIn(false)} />
        ) : (
          <SignUp onSwitch={() => setIsSignIn(true)} />
        )}
      </section>
      <section className="flex-1 bg-neutral-900 p-6 rounded-xl ">

      </section>
    </main>
  );
}

export default AuthPage;