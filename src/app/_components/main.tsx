// components/ChatbotCustomizer.tsx
'use client';
import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import ChatbotPanel from './chatbot';
import axios from 'axios';
import Auth from './Auth';

const ChatbotCustomizer = () => {
  // State for chatbot customization
  const [chatbotName, setChatbotName] = useState('Chatbot');
  const [chatbotColor, setChatbotColor] = useState('#3b82f6'); // Default blue

  // State for chat messages
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');

  // Handle sending messages
  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message to the messages list
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput(''); // Clear the input field

      try {
        console.log(input)
        const response = await axios.post(`https://af71-2401-4900-1c66-75af-4696-215-cc24-cd42.ngrok-free.app/query?query=${encodeURIComponent(input)}&collection_name=${chatbotName}`);
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
    <PanelGroup direction="horizontal" className="h-screen">
      {/* Left Half: Customization Panel */}
      <Panel defaultSize={50} minSize={30}>
        <Auth
          chatbotName={chatbotName}
          setChatbotName={setChatbotName}
          chatbotColor={chatbotColor}
          setChatbotColor={setChatbotColor}
        />
      </Panel>

      {/* Draggable Resize Handle */}
      <PanelResizeHandle className="w-2 bg-gray-200 hover:bg-gray-300 transition-colors" />

      {/* Right Half: Chatbot */}
      <Panel defaultSize={50} minSize={30}>
        <ChatbotPanel
          chatbotName={chatbotName}
          chatbotColor={chatbotColor}
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
        />
      </Panel>
    </PanelGroup>
  );
};

export default ChatbotCustomizer;
