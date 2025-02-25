import { get } from "http";
import { Code, Copy, MessageSquare, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Panel } from "react-resizable-panels";
import { message } from "antd";
interface ChatbotPanelProps {
  messages: { sender: string; text: string }[];
  input: string;
  istyping: boolean;
  setInput: (input: string) => void;
  handleSend: () => void;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  messages,
  input,
  istyping,
  setInput,
  handleSend,
}) => {
  const [view, setView] = useState<"canvas" | "code">("canvas"); // 'canvas' or 'code'
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [islogin, setLogin] = useState<any>(window ? window.localStorage.getItem("islogin") : null);
  const [messageapi, contextHolder] = message.useMessage();
  const { Name: chatbotName, Color: chatbotColor } = useSelector((state: any) => state.chatBot)

  const codeSnippet = `<div id="chat-container">
  <button id="chat-button">Chat with us!</button>
  <div id="chat-popup" class="hidden">
    <div id="chat-header">
      <span>Chat with us!</span>
      <button id="close-chat">X</button>
    </div>
    <div id="chat-content">
      <div id="messages">
        <div class="message bot-message">Hello I am an AI Assitant named ${chatbotName} , How can I help you</div>
      </div>
      <div>
        <input type="text" placeholder="Type a message..." id="chat-input" />
        <button id="send-message">Send</button>
        <a href="www.comptech.in">
        <p style="text-align: center;">
        Made by Comptech Enterprises
        </p>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  #chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-family: Arial, sans-serif;
  }
  .hidden {
    display: none;
  }
  #chat-button {
    flex: 1;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${chatbotColor};
    color: white;
    padding: 12px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }

  #chat-popup {
    height: 80%;
    width: 500px;
    background: #fff;
    z-index: 999;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }

  #chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: ${chatbotColor};
    color: #fff;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  #close-chat {
    background: none;
    border: none;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  #chat-content {
    display: flex;
    height: 85%;
    flex-direction: column;
    justify-content: end;
    padding: 10px;
  }

  #chat-input {
    width: calc(100% - 60px);
    padding: 6px;
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  #send-message {
    padding: 6px;
    margin-top: 10px;
    background-color: ${chatbotColor};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  #messages {
    margin-top: 10px;
    overflow-y: auto;
    font-size: 14px;
  }

  .message {
    padding: 8px;
    margin: 5px;
    border-radius: 4px;
    max-width: 70%;
    clear: both;
  }

  .user-message {
    background-color: ${chatbotColor};
    color: white;
    text-align: right;
    float: right;
  }

  .bot-message {
    background-color: #eaeaea;
    color: #333;
    text-align: left;
    float: left;
  }
</style>

<script>
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }

  function enableScroll() {
    document.body.style.overflow = "auto";
  }
  // chat popup
  document.getElementById("chat-button").addEventListener("click", function () {
    document.getElementById("chat-popup").classList.remove("hidden");
    // document.getElementById("chat-popup").style.display = "block";
    disableScroll();
  });

  document.getElementById("close-chat").addEventListener("click", function () {
    document.getElementById("chat-popup").classList.add("hidden");
    enableScroll();
  });

  //  message sending
  document
    .getElementById("send-message")
    .addEventListener("click", function () {
      const messageInput = document.getElementById("chat-input");
      const messages = document.getElementById("messages");

      if (messageInput.value.trim() !== "") {
        const userMessage = document.createElement("div");
        userMessage.classList.add("message", "user-message");
        userMessage.textContent = messageInput.value;
        messages.appendChild(userMessage);
        messages.scrollTo({
          top: messages.scrollHeight,
          behavior: "smooth",
        });
        let message = messageInput.value;
        messageInput.value = "";

         const typing = document.createElement("div");
        typing.classList.add("bot");
        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot-message");
        botMessage.textContent = "Typing...";
        messages.appendChild(typing);
        typing.appendChild(botMessage);

        messages.scrollTo({
          top: messages.scrollHeight,
          behavior: "smooth",
        });


        fetch(\`${process.env.NEXT_PUBLIC__API_QNA}/query?query=\${encodeURIComponent(message)}&collection_name=${chatbotName}\`, {
          method: "POST"})
          .then((response) => response.json())
          .then((response) => {

               messages.removeChild(typing);

            const botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot-message");
            botMessage.textContent = response.response;
            messages.appendChild(botMessage);
            messages.scrollTo({
              top: messages.scrollHeight,
              behavior: "smooth",
            });
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    });
</script>`;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeSnippet)
      .then(() => messageapi.success("Code copied to clipboard"))
      .catch((err) => messageapi.error("Failed to copy code"));
  };

  useEffect(() => {
    if (Window) {
      const islogin = localStorage.getItem("islogin");
      setLogin(islogin);
    }
  }, []);

  useEffect(() => {
    console.log(messages)
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]) // Removed isTyping from dependencies


  return (
    <div className="h-screen flex flex-col bg-gray-50 p-6">
      {contextHolder}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setView("canvas")}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${view === "canvas" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
        >
          <MessageSquare className="inline-block mr-2 h-5 w-5" />
          Canvas
        </button>
        <button
          onClick={() => setView("code")}
          className={`px-6 py-2 rounded-full font-semibold transition-colors ${view === "code" ? "bg-indigo-600 text-white" : "bg-white text-indigo-600 hover:bg-indigo-50"
            }`}
        >
          <Code className="inline-block mr-2 h-5 w-5" />
          Code
        </button>
      </div>

      {view === "canvas" ? (
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-indigo-600 text-white">
            <h2 className="text-2xl font-bold">{chatbotName}</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl p-4 max-w-xs lg:max-w-md ${msg.sender === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {istyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl p-4 max-w-xs lg:max-w-md">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center bg-gray-100 rounded-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-4 bg-transparent focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="p-4 text-white rounded-full"
                style={{ backgroundColor: chatbotColor || "#6366F1" }}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
            <h2 className="text-2xl font-bold">Code View</h2>
            <button
              onClick={handleCopy}
              className="bg-white text-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors"
            >
              <Copy className="inline-block mr-2 h-5 w-5" />
              Copy Code
            </button>
          </div>
          <pre className="overflow-auto h-[calc(100vh-12rem)] p-6 text-sm">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}

      <div className="text-center mt-6 text-sm text-gray-500">Made By Comptech Enterprises</div>
    </div>
  );
};

export default ChatbotPanel;
