// components/AuthAndCustomizer.tsx
'use client';
import { use, useState } from 'react';
import ChatbotCustomizer from './customize';
import axios from 'axios';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(window ? window.localStorage.getItem("islogin") : null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [Company, setCompany] = useState('');
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // 76@gmail.com
    // 123


    try {
      const url = isLogin
        ? `${process.env.NEXT_PUBLIC__API_LOGIN}/login/`
        : `${process.env.NEXT_PUBLIC__API_REGISTER}/signup/`;

      const payload = new URLSearchParams();
      payload.append('email', email);
      payload.append('password', password);

      if (!isLogin) {
        payload.append('name', name);
        payload.append('confirm_password', confirmPassword);
        payload.append('company', Company);
      }

      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      console.log(response);
      if (response?.status === 200) {
        if (isLogin) {
          setIsAuthenticated(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem("islogin", "true");
          }
        } else {
          console.log(response);
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error("There was an error!", error);
      alert(error?.response?.data?.message || "An error occurred. Please try again.");
    }
    // console.log({ email, password, name, confirmPassword, Company });
    // Here you would typically handle the API call to your backend for authentication
    // console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password, name });
    // if (window) {
    //   localStorage.setItem("islogin", isLogin.toString());
    // }
    // Simulate a successful authentication
    // setIsAuthenticated(true);
  };
  if (isAuthenticated) {
    return <ChatbotCustomizer />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Make an AI Chatbot in 5 Minutes</h1>
          <h2 className="text-xl font-semibold text-blue-600">by CompTech Enterprises</h2>
        </div>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h3>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter password"
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              )}
            </div>
            {!isLogin && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={Company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your company"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth
