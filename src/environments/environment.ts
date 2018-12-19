// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  firebase: {
    apiKey: "AIzaSyAmXXVQxhxSeOeWt2hmb91DwKSA_Caw3pQ",
    authDomain: "curriculum-79208.firebaseapp.com",
    databaseURL: "https://curriculum-79208.firebaseio.com",
    projectId: "curriculum-79208",
    storageBucket: "curriculum-79208.appspot.com",
    messagingSenderId: "1086098006793"

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
