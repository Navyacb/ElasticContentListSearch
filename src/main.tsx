import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './index.css'
import {QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MantineProvider>
      <App />
    </MantineProvider>
  </QueryClientProvider>
)
