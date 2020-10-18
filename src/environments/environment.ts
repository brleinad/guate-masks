// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL: 'http://localhost:4200',
  API_URL: 'http://localhost:8888/.netlify/functions/',
  STRIPE_KEY : 'pk_test_51HZn5VFQZ3uzVtBwOxQ8Cm9xLePC2hSFWxp1yLEpQk80PI9dxeTg30zNNYkGYCYciCjoLzBiJSFpkz27ERpqymzf00iVz5go1f',
  HUIPIL_PRICE_KEY : 'price_1HZn6yFQZ3uzVtBw47v5hB9p',
  CORTE_PRICE_KEY : 'price_1HZn7yFQZ3uzVtBwkqWEemyw',
  KIDS_PRICE_KEY : 'prod_IA7NwbXwczK89E',
  HUIPIL_PRICE : 15,
  CORTE_PRICE : 12,
  KIDS_PRICE : 10,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
