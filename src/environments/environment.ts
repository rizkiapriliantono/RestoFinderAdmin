// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Env } from "../app/env.enum";

export const environment = {
    production: false,
    environment: Env.local,
    SALT: 'uxKqTsYSkDVeXxre',
    SECRET: 'Faw8Qm8Ttwgf2Cc3',
	apiUrl: 'http://localhost:6905/eproc-portal-management-api',
    rbacUrl: 'http://localhost:6901/rbac-api',
    generalUrl: 'http://localhost:6902/general-api',
    s3Url: 'https://eprocdev.sm.co.id/item-dist-api',
    webUrl: '',
    ITERATION: 16,
    apiTimeout: 30000
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
