A survey form builder



# Ideas

- Create table to hold published versions of surveys
  * json row for holding the structure
  * is active for keeping track of which revision is published
  * revision number for keeping track of revisions

- On publish get tables and convert into JSON
- insert into said table with correct revision number

- If I delete a survey remove all published revisions

- If I disable a survey set currentActive revision to inactive


- Append revision table ID to answer table so when user completes survey a we keep track of which revision