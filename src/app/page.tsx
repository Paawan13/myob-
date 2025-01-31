import Image from "next/image";
import Chatbot from "./_components/chatbot";
import ChatbotCustomizer from "./_components/customize";

export default function Home() {
  console.log("redads")
  return (
    <div className="min-h-screen">
      <ChatbotCustomizer/>
    </div>
    // <div>
    //   hello
    // </div>
  );
}
