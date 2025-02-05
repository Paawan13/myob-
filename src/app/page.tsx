"use client"
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./_components/main"),{ssr: false});

export default function Home() {
  return (
    <div className="min-h-screen">
      <Main />
    </div>
  );
}
