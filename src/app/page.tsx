import Image from "next/image";
import Chatbot from "./_components/chatbot";
import ChatbotCustomizer from "./_components/customize";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ChatbotCustomizer/>
    </div>
    // <div>
    //   hello
    // </div>
  );
}
