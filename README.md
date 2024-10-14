# Opdracht Appeel.io - Github API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project structure

In the `src` folder you will find the code for this project:<br>
In `App.tsx` we implemented the code to catch the errors thrown in this application. It also initiates the `Jotai`
library for state management.

- In the `components` folder you will find the components used for the different features.
- The `mappers` folder holds the mapper functions to transform the data received from the Github API to the data format
  that is used in the app.
- In the `state` folder you can find the state atoms (Atomic design - [Jotai](https://jotai.org/))
- The `utils` folder holds the helper functions to initiate the octokit helper and to get the necessary data from the
  Github API.

## Project instructions

### Prerequisites

- *Code editor*<br>
  Install one of your choice. You can use [VS Code](https://code.visualstudio.com/)
  or [Webstorm](https://www.jetbrains.com/webstorm/) e.g.
- *Node*<br>
  A node version should be installed. The version used for this project is `V20.18.0`. You can either install this
  version directly from [Node](https://nodejs.org/en) website or via [NVM](https://github.com/nvm-sh/nvm)

### Clone repo

Clone the repo with git or download the ZIP file to open the project on your machine.<br>
Env variables have been used in the project like a personal Github access key. If you want to run the project locally
send an email to `kevin.bervoets@proton.me` and I will send you the env variables via a secure manner.
You can view a running instance of the project deployed on
Render: [Simple Github reader](https://appeel-gh-repos.onrender.com/)

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
