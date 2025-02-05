"use client"
import dynamic from "next/dynamic";
import {store} from "@/store/index";
import { Provider } from "react-redux";
const Main = dynamic(() => import("./_components/main"),{ssr: false});

export default function Home() {
  return (
    <Provider store={store}>
    <div className="min-h-screen">
      <Main />
    </div>
    </Provider>
  );
}
