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

- Look into https://www.radix-ui.com/docs/primitives/components/scroll-area

## Backlog Prio

- Add feedback to actions in application (On save, publish and etc..)

## Backlog

- TODO Extract ui components for survey builder into it's own repo & pkg
- TODO Look into https://storybook.js.org/docs/react/writing-tests/interaction-testing
- TODO Add skeleton loading to components that need it
