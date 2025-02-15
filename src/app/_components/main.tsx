// components/ChatbotCustomizer.tsx
'use client';
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ChatbotPanel from './chatbot';
import axios from 'axios';
import Auth from './Auth';
import { useSelector } from 'react-redux';

const ChatbotCustomizer = () => {
  // State for chatbot customization

  // State for chat messages
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const { Name: chatbotName, Color: chatbotColor } = useSelector((state: any) => state.chatBot)

  // Handle sending messages
  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message to the messages list
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput(''); // Clear the input field

      try {
        console.log(input)
        const response = await axios.post(`${process.env.NEXT_PUBLIC__API_QNA}/query?query=${encodeURIComponent(input)}&collection_name=${chatbotName}`);
        console.log(response)
        if (response.status === 200) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response.data.response, sender: 'bot' },
          ]);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className='grid grid-cols-2 h-full'>

          <Auth />
          <ChatbotPanel
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
    </div>
  );
};

export default ChatbotCustomizer;
