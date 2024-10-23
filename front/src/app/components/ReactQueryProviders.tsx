'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const ReactQueryProviders = ({children}: React.PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            retryDelay: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false
          }
        }
      }))
    
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProviders