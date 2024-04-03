import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.scss';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
