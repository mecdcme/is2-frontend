# is2-frontend
New version of IS2 frontend, implemented using Vue

## Environment setup
In order to start working on IS2 frontend, you should install:
1. [Visual studio code](https://code.visualstudio.com/)
2. [Node js](https://nodejs.org/en/download/)

In order to test if node.js has been succesfully installed in your machine, open your favorite shell and run:

```
node -v
npm -v
```
It is also important to add the following extensions to Visual studio code:
1. **Vetur**: an extension designed for Vue.
2. **ESLint**: an extension that enables javascript [Eslint](https://eslint.org/). ESLint is a powerful tool, that finds and fixes problems in our javascript code :)

## Project setup
Your development environment is ready, it is time to start coding. First of all clone the project in your development folder:

```
D:
cd ./development
git clone https://github.com/mecdcme/is2-frontend.git is2-frontend
```
Open the project in visual studio code. In order to install the application, open a terminal (Terminal -> New Terminal) and run:
```
npm install
```
This operation could take time, node will install all the project dependencies in the folder node_modules.

## Browser setup
In order to debug is2-frontend applications, we will use:
1. **Webpack**: Webpack is used to bundle our application both in development and production environment. This tool also allows debugging the application in the browser ([debug screenshot](https://github.com/mecdcme/is2-frontend/docs/img/is2-webpack.png)).
2. **Local storage**
3. **Vue.js devtools**

In order to test if node.js has been succesfully installed in your machine, open your favorite shell and run:

### Compiles and hot-reloads for development
It's time to run our application in the localhost development server. Run the following command:
```
npm run serve
```
If the environment was correctly setup, you shold get the following output:
```
App running at:
- Local:    http://localhost:8070/
- Network:  http://localhost:8070/
```
Now you can open your favorite browser at http://localhost:8070/


### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

