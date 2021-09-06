import React from 'react';
import { Helmet } from 'react-helmet';
import { QueryClientProvider } from 'react-query';
import './App.css';
import { QueryClient } from 'react-query';
import { Search } from './pages/Search';
import { BrowserRouter } from 'react-router-dom';

export const queryClient = new QueryClient();

function App() {
  return (
    <div className='relative'>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Search />
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
