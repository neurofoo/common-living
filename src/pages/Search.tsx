import { httpsCallable } from 'firebase/functions';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'lodash';
import FirebaseClient from '../api/firebase_client';

// A custom hook that builds on useLocation to parse
// the query string for you.
function useSearchQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search = () => {
  const queryParams = useSearchQuery();
  const query = queryParams.get('q');
  console.log(queryParams, query);

  const history = useHistory();

  // const [query, setQuery] = useState("");
  const handleChange = debounce((value: string) => {
    history.push(`/search?q=${value}`);
  }, 500);

  const { data: results, isLoading } = useQuery(
    ['search', { query }],
    async () => {
      if (!query) return;
      const results = (await httpsCallable(
        FirebaseClient.functions,
        'search',
      )({ query })) as any;

      console.log(results);
      return results;
    },
    { enabled: !!query },
  );

  const searchMutation = useMutation(
    async (query) => {
      const results = (await httpsCallable(
        FirebaseClient.functions,
        'search',
      )({ query })) as any;

      console.log(results);
      return results;
    },
    { onSuccess: (results) => {} },
  );

  return (
    <div className='relative'>
      <Helmet>
        <title>Common Living Search</title>
      </Helmet>
      {/* Search Bar */}
      <nav className='p-5 w-full bg-gray-50'>
        <div className='relative'>
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
            // onFocus={(e) => setMode("query")}
            // TODO: debounce
            onChange={(e) => {
              handleChange(e.currentTarget.value);
              // setQuery(e.currentTarget.value);
            }}
          />
        </div>
      </nav>

      <hr className='py-10 w-full' />
    </div>
  );
};
