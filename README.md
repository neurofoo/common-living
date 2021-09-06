# Common Living

## Thought Process

At first I was going to do a small nodejs + express backend. Then, I don't the bonus was to host the solution. So, I decided to just build a production system from the start.

Firebase App + Algolia for nice search

Single GCP Cloud Function search endpoint

- calls off to algolia and bundles up the search results to send to the client
- not always the most performant because of the cloud warm-up phase, but that can be eliminated by setting a min live instances or just calling algolia directly
- but specs want a single API /search endpoint
