import "@ant-design/v5-patch-for-react-19";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routers";
import Store from "./store/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <RouterProvider router={Router} />
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
