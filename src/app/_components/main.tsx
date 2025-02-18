// components/ChatbotCustomizer.tsx
'use client';
import { use, useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ChatbotPanel from './chatbot';
import axios from 'axios';
import Auth from './Auth';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { chatService } from '@/services/chat.service';
import { message } from 'antd';

const ChatbotCustomizer = () => {
  // State for chatbot customization

  // State for chat messages
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false)
  const [islogin, setlogin] = useState(false)
  const { Name: chatbotName, Color: chatbotColor } = useSelector((state: any) => state.chatBot)
  const [messageapi, contextHolder] = message.useMessage();
  const { mutate: useChat, isPending } = useMutation({ mutationFn: chatService });
  // Handle sending messages
  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message to the messages list
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput(''); // Clear the input field
      useChat({ input, chatbotName }, {
        onSuccess: (response) => {
          setMessages((prev) => [...prev, { text: response, sender: 'chatbot' }]);
        },
        onError: (error) => {
          messageapi.error('An error occurred while sending the message');
          console.log(error);

        }
      });
    };
  };

  useEffect(() => {
    if (isPending) {
      setIsTyping(true);
    }
    if (!isPending) {
      setIsTyping(false);
    }
  }, [isPending])

  useEffect(() => {
    if (window) {
      const islogin = window.localStorage.getItem('islogin');
      if (islogin) {
        setlogin(true)
      }
    }
  }, [])

  return (
    <div className={`grid ${islogin && "grid-cols-2"} h-full`}>
      {contextHolder}
      <Auth />
      {
        islogin &&
        <ChatbotPanel
          istyping={isTyping}
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      }
    </div>
  );
};

export default ChatbotCustomizer;
