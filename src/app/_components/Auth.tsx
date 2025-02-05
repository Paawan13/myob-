// components/AuthAndCustomizer.tsx
'use client';
import { useState } from 'react';
import ChatbotCustomizer from './customize';

interface AuthProps {
  setChatbotName: (name: string) => void;
  chatbotName: string;
  chatbotColor: string;
  setChatbotColor: (color: string) => void;
}

const Auth: React.FC<AuthProps> = ({ setChatbotColor, setChatbotName, chatbotColor, chatbotName }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically handle the API call to your backend for authentication
    console.log(isLogin ? 'Logging in...' : 'Signing up...', { email, password, name });
    // Simulate a successful authentication
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <ChatbotCustomizer
      setChatbotName={setChatbotName}
      chatbotName={name}
      chatbotColor={chatbotColor}
      setChatbotColor={setChatbotColor}
    />;
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
