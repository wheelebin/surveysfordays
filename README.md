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


# Things Need To Do
- TODO Rename some of the tables & change table properties to match between front & backend so I don't need to transform question & question options
- TODO Implement add new content
- TODO Implement add new section
- TODO Implement add new page
- TODO Implement page pagination view, navigation between pages and a page tracker (Like the 1 above the survey but functional)
- TODO Implement deletion of pages, sections, content or/and content options
- TODO Implement dragging of pages, sections & content somehow (Dragging of content options is already available through builder forms)
- TODO Polish design for existing pages
- TODO Implement next auth
- TODO Implement completion of surveys by users outside of our system (answer table and etc)
- TODO Implement publishing of created surveys so they can be completed by other users
- TODO Implement a simple results view for the publisher to see the result of the survey

# Things I Want To Do
- TODO Extract ui components for survey builder into it's own repo & pkg