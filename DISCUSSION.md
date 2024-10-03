## Improvements

1. Swap out ILIKE with PostgreSQL full-text search (to_tsvector and to_tsquery) to do faster searches.
2. Replace OFFSET with keyset pagination using id as a cursor, so pagination stays fast even with a lot of data.
3. Fetch only the specific fields required (like id, firstName, city). In this case we are using all of them, but if
that wasn't the case, we should do that.
4. Maybe spend a little more time making the inputs be more part of the table. In general, spend a little more time on
the UI to tight things up.
5. Write some e2e tests for different search combinations.
6. Improve UI components to be more standardized.
7. Depending if we want to continue using pagination, we could also virtualize the table depending on how complex the
table rows are and the amount of rows we show per page.
8. Potentially add caching in the back-end and front-end. This would depend on how often the data changes in the 
back-end. We could cache specialties if we don't really add them often. It's hard to say, but I do come from a
the thought of optimize later.