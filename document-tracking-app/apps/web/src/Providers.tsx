import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { ReactNode } from 'react'
import { toast } from "sonner"

import AuthProvider from "./modules/auth/context/AuthProvider";

const queryResponseHandler = (error: AxiosError | any) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message)
  }
};

const client = new QueryClient({
  mutationCache: new MutationCache({
    onError: queryResponseHandler,
    onSuccess: () => queryResponseHandler
  }),
  queryCache: new QueryCache({
    onError: queryResponseHandler,
    onSuccess: () => queryResponseHandler
  })
})

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </AuthProvider>
  )
}

export default Providers