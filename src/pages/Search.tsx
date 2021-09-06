import { httpsCallable } from 'firebase/functions';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import FirebaseClient from '../api/firebase_client';
import { DetailResult } from '../components/ResultDetail';
import { SearchResult } from '../components/SearchResult';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useSearchQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search = () => {
  const queryParams = useSearchQuery();
  const query = queryParams.get('q');
  const history = useHistory();

  // We'll keep out selected item in here
  const [selected, setSelected] = useState<any>();
  const [show, setShow] = useState<string>('');

  const handleSelect = (item: any) => {
    setSelected(item);
    setShow('selected');
  };

  const handleChange = debounce((value: string) => {
    history.push(`/search?q=${value}`);
    setShow('search');
  }, 500);

  const { data, isLoading } = useQuery(
    ['search', { query }],
    async () => {
      if (!query) return;
      const { data } = (await httpsCallable(
        FirebaseClient.functions,
        'search',
      )({ query })) as any;

      //extract and combine streams. map reduce is always good!
      const hits = data.results.results
        .map((result: any) => result.hits)
        .reduce((hits: any, hit: any) => [...hits, ...hit], []);

      console.log(hits);
      return hits;
    },
    { enabled: !!query },
  );
  console.log('data', data);

  return (
    <div className='relative min-h-screen'>
      <Helmet>
        <title>Common Living Search</title>
      </Helmet>

      {/* Search Bar */}
      <nav className='p-5 w-full bg-gray-50'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center'>
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>

          <input
            id='search'
            name='search'
            className='block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm'
            placeholder='Search'
            type='search'
            // debounce
            onChange={(e) => {
              handleChange(e.currentTarget.value);
              // setQuery(e.currentTarget.value);
            }}></input>
        </div>
      </nav>

      {/* Show the selected item */}
      {show === 'selected' && <DetailResult item={selected} />}

      {/* Search Results Outlets */}
      {show === 'search' && (
        <section className='mx-auto max-w-7xl overflow-y-auto'>
          {isLoading && (
            <div className='text-black h-24 w-24'>
              <svg className='animate-spin h-24 w-24' viewBox='0 0 24 24'></svg>
            </div>
          )}

          {/* Show 'nothing found' on the empty set */}
          {data?.length === 0 && (
            <div className='bg-red-100 '>
              <p className='font-bold text-center text-3xl'>Nothing found :(</p>
            </div>
          )}

          {/* Show search results */}
          <ul className='space-y-2'>
            {data?.map((item: any) => {
              return (
                <SearchResult
                  key={item.id}
                  item={item}
                  handleSelect={() => handleSelect(item)}
                />
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
};
