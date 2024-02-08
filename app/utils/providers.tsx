"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
}
