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
        ? 'https://classical-powerseller-ranch-aaa.trycloudflare.com/login/'
        : 'https://guilty-drove-profit-colour.trycloudflare.com/signup/';

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
    <div className="min-h-screen flex items-center flex-col justify-start p-40 gap-20 bg-gray-100">
      <div className='flex flex-col items-center gap-4'>
        <h5 className="text-2xl font-bold mb-4">Make an AI Chatbot in 5 Minutes</h5>
        <h4 className='text-xl font-semibold'>by CompTech Enterprises</h4>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>
          {!isLogin && <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>}
          {!isLogin && <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">
              Company
            </label>
            <input
              type="text"
              id="password"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-sm text-blue-600 hover:text-blue-700"
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth
