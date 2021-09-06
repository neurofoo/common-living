# Common Living

## Thought Process

At first I was going to do a small nodejs + express backend.
Then, I read the bonus was to host the solution.
So, I decided to just build a production system from the start.

### Solution Thinking

#### Arch

Firebase App + Algolia for nice search

A Single GCP Cloud Function search endpoint

```{}
functions/src/search.ts
```

- calls off to algolia and bundles up the search results to send to the client
- not always the most performant because of the cloud warm-up phase, but that can be eliminated by setting a min live instances or just calling algolia directly
- but specs want a single API /search endpoint, so seems reasonable

TODO: add the additional data stores and integrate into the main three stores

#### Client

Used a simple single page approach to show the result and selected result item detail view.
The next step would be to expand this into at least a two page app. But, before doing that I would need to confer with the stakeholders to know more about what the purpose of the app is. I can imagine building a proper local store (e.g., redux) to handle a multi-page app (e.g., search page, item result page). This could be useful if people wanted to copy the URL of a particular item and send that to others (e.g., in an email). I started down the path (a bit) for being able to share the app with its state and intent. The search query string is stored in the URL. This could enable the app to see this query string and then call off to get the results, thus enabling easy sharing between users.
