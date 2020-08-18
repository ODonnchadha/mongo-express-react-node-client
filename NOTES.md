# Culled from Brad Traversy's Udemy class entitled 'MERN Stack Front to Back.'
# This repository encapsulates the client-side section of the class.

```javascript
  npm i -g create-react-app
  npm i -g npm
  create-react-app xyz
```
- Add a proxy value to configuration:
```javascript
  },
  "proxy": "http://localhost:5000",
  "eslintConfig": {
```
```javascript
  npm run start
```
- To run two (2) projects within the same solution:
```javascript
  npm i concurrently
```
- And add a client script:
```javascript
  "client-install": "npm install --prefix client",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\""
```

```javascript
  npm i react-router-dom
```

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

  ## Heroku deployment:
    - https://devcenter.heroku.com/categories/deployment

    1. Securing our keys:
    - Create two new files in config: key_dev.js and keys_prod.js.
    within keys_prod.js:
    ```javascript
      module.exports = {
        mongoURI: process.env.MONGO_URI,
        secretOrKey: process.env.SECRET_OR_KEY,
      };
    ```
    - The file, pushed to GitHub says nothing. The values are configured through the dashboard.
    - Within keys.js:
      ```javascript
      if (process.env.NODE_ENV === 'production') {
        module.exports = require('./keys_prod);
      } else {
        module.exports = require('./keys_dev);
      }
    ```
    - And then in .gitignore: Add /config/keys.dev.js.
  
  2. Heroku Setup:
  - Create an account. Sans credit card.
  - Install the Heroku toolbelt. (CLI.) Ensure that the %PATH% is modified.
  - Heroku becomes a "remote" repository as we push from GitHub.
  ```javascript
    heroku login
    heroku create
  ```
  - Setup application. 
  - Place environment variables/Config Vars within settings. e.g.: MONGO_URI and SECRET_OR_KEY.
  - Within deploy, wire Git repository with the "remote" command.

  3. Post-build Deployment:
  - Create the static assets: static/index.html is our UI entry.
    ```javascript
      npm run build
    ```
    - And then add to server.js:
    ```javascript
      const path = require('path');
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));

        app.get('*', (request, response) => {
          response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        })
      }
    ```
    - Now build the assets out on Heroku with a script. 
    - NOTE: We need the devDependencies, thus the false flag.
    - NOTE: The --prefix client would come more into play if both client & server were in the single project.
      ```javascript
      "scripts": {
        "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
      }
    ```
    ```javascript
      git push heroku master
      heroku open
    ```
    - Within settings/domains, you can add a domain and then draw the DNS association.