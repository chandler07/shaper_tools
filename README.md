This doc will get you setup to run the Shaper Tools website smoke test locally. 

First, visit https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements
in order to install cypress. 

Launch cypress with the following:

./node_modules/.bin/cypress open

When the cypress app opens, scroll down to tests and select shaper_smoketest.js.

This should launch a chrome browser and run the tests. You can select another browser 
to verify the webpage works fine on multiple browsers. 

