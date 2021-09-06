import algoliasearch from 'algoliasearch';
import * as functions from 'firebase-functions';

// These are public and meant for clients. Okay but not great to keep them here.
const APP_ID = '2QQKKPBWN0';
const SEARCH_KEY = '8a005242b4dfff20b605cdb81345ec0a';

const indices = ['stuff_n_things', 'mikes_99cent_store', 'we_got_inventory'];

/**
 *
 */
export const search = functions.https.onCall(
  async (data: { query: string }, context) => {
    // if (!context.auth)
    //   throw new functions.https.HttpsError(
    //     'unauthenticated',
    //     'Invalid credentials',
    //   );
    const { query } = data;

    if (!query || query.length > 50) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Missing query or query > 50 chars',
      );
    }
    const client = algoliasearch(APP_ID, SEARCH_KEY);
    const queries = indices.map((index) => ({
      indexName: index,
      query,
      params: {
        hitsPerPage: 10,
      },
    }));
    const results = await client.multipleQueries(queries);
    return { results };
  },
);
