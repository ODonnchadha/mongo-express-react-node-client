# Culled from Brad Traversy's Udemy class entitled 'MERN Stack Front to Back.'
# This repository encapsulates the client-side section of the class.

- Hack Bootstrap, via CDNs, into the html:
  - https://getbootstrap.com/docs/4.1/getting-started/introduction/

- Install React DevTools and Redux DevTools:
  - https://fontawesome.com/start
  1. Shortcut:
  - rfc [Tab] for a smart component template.
  - rcc [Tab] for a dumb component.
  - Highlight and select [Ctrl] + d to modify a bunch of, for example, "class" to "className" values.
  ```javascript
    npm i classnames
  ```
  - "If a certain something is true, add this class name."

- createStore arguments: (reducer, preloaded state, enhancer)
  - e.g.: reducer = rootReducer(combineReducers([]))
  - e.g.: preloaded state = initial state
  - e.g.: enhancer = middleware

- Protected Routes and Authentication:
  - Nothing default with React Router 4. We'll create a Private Route functional-based component.
  - <Switch> allows for redirect.

- Prepare & Deploy:
  - Heroku
  - Install Heroku CLI
  ```javascript
    heroku login (with credemtials.)
    heroku create. Head to Web. Add configuration settings.
    set git:remote via CLI 
  ```
  - Note: You need GIT installed.
  ```javascript
    cd client
    npm run build
  ```
  - Creating static assets.
  - server.js
  ```javascript
    const path = require('path');
    
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
    }

    "scripts": {
      "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
    }
  ```

  ```javascript
    git push heroku master
    heroku open
  ```