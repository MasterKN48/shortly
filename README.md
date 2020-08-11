## 								Shortly : URL Shorter Service
<img src='./client/public/favicon.ico' style='height:84px;' />

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://u21.herokuapp.com/)

[![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://u21.herokuapp.com) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![ status](https://img.shields.io/pypi/status/ansicolortags.svg)]() [![GitHub release](https://img.shields.io/github/release/Naereen/StrapDown.js.svg)](https://github.com/MasterKN48/shortly/releases/)  [![Maintenance](https://img.shields.io/badge/Maintained%3F-no-red.svg)](https://github.com/MasterKN48/shortly) [![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/MasterKN48/shortly)

It is a small application for shorten url based provided url, it generate unique short id for each respective long url, once generate short url, that url can be use from anywhere which always redirect to original website for which it shorten. Each User account has separate  dashboard, from where user can short url and do management of all shorted url.

This application use mongodb atlas, passport.js local strategy ,bcyrpt for password hashing. 

#### How to run locally?

```bash
#clone the project
1. git clone https://github.com/MasterKN48/shortly
2. cd shortly
3. npm i
4. touch .env
5. nano .env # any text editor
`
CLIENT_URL=<client-app-url>
MONGO_URI=<mongodb-server-uri>
COOKIE_KEY=<scret-cookie-key>
NODE_ENV=dev #either `dev` or `production`
`
6. cd client
7. npm i
8. cd ..
9. npm run dev
```



[![ForTheBadge built-with-swag](http://ForTheBadge.com/images/badges/built-with-swag.svg)](https://GitHub.com/MASTERKN48/)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
