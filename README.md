# This is repo for Chetana Chits Web App! Built on top of Mifos X Web App, which is Angular (9.1) flavor. Refer- https://github.com/openMF/web-app

# Mifos X Web App is the revamped version of the Mifos X Community App, an effective financial inclusion solution and the default web application built on top of the Mifos X platform for the Mifos User Community.

This is a Single-Page App (SPA) written in standard web technologies [HTML5](http://whatwg.org/html), [SCSS](http://sass-lang.com) and [TypeScript](http://www.typescriptlang.org). It leverages the popular [Angular](https://angular.io/) framework and [Angular Material](https://material.angular.io/) for material design components.


## Getting started using
The latest code is to be taken from https://github.com/ncfprojects/cchpl_ui_web  [master branch has released version]

## Getting started developing

1. Ensure you have the following installed in your system:

    [`git`](https://git-scm.com/downloads)

    [`npm`](https://nodejs.org/en/download/)

2. Install [angular-cli](https://github.com/angular/angular-cli) globally.
```
npm install -g @angular/cli@9.1.12
```

3. Clone the project locally into your system.
```
git clone https://github.com/ncfprojects/cchpl_ui_web
```

4. `cd` into project root directory and make sure you are on the master branch.

5. Install the dependencies.
```
npm install
```

6. To preview the app, run the following command and navigate to `http://localhost:4200/`.
```
ng serve
```

You need to connect to backend server with basic authentication by default. The credentials for the same are:
 
    Username - mifos
    Password - password

**Important Note:** Please do not make any alterations to these credentials.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use
`ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular-CLI README](https://github.com/angular/angular-cli).


## Setting up a local server

Follow the given instructions for your operating system to setup a local server for the Mifos X platform.

[Windows](https://cwiki.apache.org/confluence/display/FINERACT/Fineract-platform+Installation+on+Windows)

[Ubuntu](https://cwiki.apache.org/confluence/display/FINERACT/Fineract+Installation+on+Ubuntu+Server)

For connecting to server running elsewhere update the base API URL and/or tenant identifier property in the `environments/environment.ts` file and `environments/environment.prod.ts` file for development and production use respectively.

By default OAuth2 is disabled. To enable it, change the value of oauth.enabled property to true in the `environments/environment.ts` file and `environments/environment.prod.ts` file for development and production use respectively.
