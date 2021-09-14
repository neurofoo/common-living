import React from 'react';
import { Helmet } from 'react-helmet';
import { QueryClientProvider } from 'react-query';
import './App.css';
import { QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';

export const queryClient = new QueryClient();

function App() {
  return (
    <div className='relative'>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
