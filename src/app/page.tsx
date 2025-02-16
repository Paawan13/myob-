"use client"
import dynamic from "next/dynamic";
import { store } from "@/store/index";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Main = dynamic(() => import("./_components/main"), { ssr: false });
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function Home() {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <div className="overflow-x-scroll h-[100vh]">
          <Main />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}
