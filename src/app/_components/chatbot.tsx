import { get } from "http";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Panel } from "react-resizable-panels";

interface ChatbotPanelProps {
  messages: { sender: string; text: string }[];
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
}

const ChatbotPanel: React.FC<ChatbotPanelProps> = ({
  messages,
  input,
  setInput,
  handleSend,
}) => {
  const [view, setView] = useState<"canvas" | "code">("canvas"); // 'canvas' or 'code'
  const [islogin, setLogin] = useState<any>(window ? window.localStorage.getItem("islogin") : null);

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
        <div class="message bot-message">Hello I am a bot from ${chatbotName}</div>
      </div>
      <div>
        <input type="text" placeholder="Type a message..." id="chat-input" />
        <button id="send-message">Send</button>
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
        fetch(\`${process.env.NEXT_PUBLIC__API_QNA}/query?query=\${encodeURIComponent(message)}&collection_name=${chatbotName}\`, {
          method: "POST"})
          .then((response) => response.json())
          .then((response) => {
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
      .then(() => alert("Code copied to clipboard!"))
      .catch((err) => alert("Failed to copy code: " + err));
  };

  useEffect(() => {
    if (Window) {
      const islogin = localStorage.getItem("islogin");
      setLogin(islogin);
    }
  }, []);

  return (
    <Panel defaultSize={50} minSize={20}>
      <div className={`h-4/6 flex flex-col bg-white p-6`}>
        {/* Toggle Buttons */}
        {islogin && (
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => setView("canvas")}
              className={`px-4 py-2 rounded-lg ${view === "canvas"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              Canvas
            </button>
            <button
              onClick={() => setView("code")}
              className={`px-4 py-2 rounded-lg ${view === "code"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
                }`}
            >
              Code
            </button>
          </div>
        )}

        {/* Conditional Rendering */}
        {view === "canvas" ? (
          <div className="w-5/6 mx-auto">
            <div className="flex-1 overflow-y-auto h-[80vh] mb-4">
              {/* Chatbot Header */}
              <div
                className="p-4 rounded-t-lg"
                style={{ backgroundColor: chatbotColor ?? "red" }}
              >
                <h2 className="text-white text-xl font-bold">{chatbotName ?? "Enter Name..."}</h2>
              </div>

              {/* Chat Messages */}
              <div className="mt-4 space-y-2">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-xs ${msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSend}
                className="p-2 rounded-r-lg"
                style={{ backgroundColor: chatbotColor ?? "red", color: "white" }}
              >
                Send
              </button>
            </div>

            {/* Made By Comptech Enterprises */}
            <div className="text-center mt-4 text-sm text-gray-500">
              Made By Comptech Enterprises
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Copy Code
              </button>
            </div>
            <pre className="overflow-auto text- h-[80vh] bg-gray-100 p-4 rounded-lg">
              <code>{codeSnippet}</code>
            </pre>
          </div>
        )}
      </div>
    </Panel>
  );
};

export default ChatbotPanel;
