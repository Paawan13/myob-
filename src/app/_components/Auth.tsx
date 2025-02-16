'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/services/auth.service';
import ChatbotCustomizer from './customize';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof window !== 'undefined' ? localStorage.getItem("islogin") : null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: authMutation, isError, isPending, isSuccess } = useMutation({ mutationFn: authenticateUser });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    authMutation({
      isLogin,
      email,
      password,
      name,
      confirmPassword,
      company
    }, {
      onSuccess: ({ message }: any) => {
        messageApi.success(message || 'Login Successful');
        if (message) {
          setTimeout(() => {
            localStorage.setItem("islogin", "true");
            if (isLogin) {
              setIsAuthenticated("true");
            } else {
              setIsLogin(true);
            }
          }, 2000); // Redirect after 2 seconds
        }
      }
      , onError: ({ response }: any) => {
        messageApi.error(response.data.detail || 'something went wrong !');
      }
    });
  };

  if (isAuthenticated) {
    return <ChatbotCustomizer />
  }

  return (

    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-4" >
        {contextHolder}
        <div className="w-full max-w-md" >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Make an AI Chatbot in 5 Minutes</h1>
            <h2 className="text-xl font-semibold text-blue-600">by CompTech Enterprises</h2>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
              {isLogin ? "Welcome Back" : "Create Your Account"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
              {!isLogin && (
                <>
                  <input type="text" value={name} className="border p-2" onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                  <input type="text" className="border p-2" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" required />
                </>
              )}
              <input type="email" value={email} className="border col-span-full p-2" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
              <input type="password" value={password} className={`border p-2 ${isLogin ? "col-span-full" : ""}`} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
              {!isLogin && (
                <>
                  <input type="password" value={confirmPassword} className="border p-2" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                </>
              )}
              <button type="submit" className="col-span-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800">
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div >
      </ div >
    </>
  )
};

export default Auth;
