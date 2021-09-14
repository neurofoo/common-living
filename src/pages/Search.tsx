import { httpsCallable } from 'firebase/functions';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
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
            <div className='flex justify-around'>
              <span className='inline-flex rounded-md shadow-sm'>
                <button
                  type='button'
                  className='inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed'
                  disabled={true}>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      stroke-width='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                </button>
              </span>
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
