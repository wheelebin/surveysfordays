A survey form builder

# Ideas

- Create table to hold published versions of surveys

  - json row for holding the structure
  - is active for keeping track of which revision is published
  - revision number for keeping track of revisions

- On publish get tables and convert into JSON
- insert into said table with correct revision number

- If I delete a survey remove all published revisions

- If I disable a survey set currentActive revision to inactive

- Append revision table ID to answer table so when user completes survey a we keep track of which revision

# Good ol' To Do

## Doing

- TODO Create & implement card component
- TODO Polish design for existing pages

## Backlog Prio

- TODO Implement next auth
- TODO Implement completion of surveys by users outside of our system (answer table and etc)
- TODO Implement publishing of created surveys so they can be completed by other users
- TODO Implement a simple results view for the publisher to see the result of the survey

## Backlog

- TODO Extract ui components for survey builder into it's own repo & pkg
- TODO Look into https://storybook.js.org/docs/react/writing-tests/interaction-testing
- TODO Add skeleton loading to components that need it
