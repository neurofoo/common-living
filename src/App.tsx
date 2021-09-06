import React from 'react';
import { Helmet } from 'react-helmet';
import { QueryClientProvider } from 'react-query';
import './App.css';
import { QueryClient } from 'react-query';
import { Search } from './pages/Search';

export const queryClient = new QueryClient();

function App() {
  return (
    <div className='relative'>
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    </div>
  );
}

export default App;
