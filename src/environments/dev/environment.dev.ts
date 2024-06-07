import { Env } from "app/env.enum";

export const environment = {
    production: false,
    environment: Env.dev,
    SALT: 'uxKqTsYSkDVeXxre',
    SECRET: 'Faw8Qm8Ttwgf2Cc3',
	apiUrl: 'https://eprocdev.sm.co.id/portal-management-api',
    rbacUrl: 'https://eprocdev.sm.co.id/rbac-api',
    generalUrl: 'https://eprocdev.sm.co.id/general-api',
    s3Url: 'https://eprocdev.sm.co.id/item-dist-api',
    webUrl: '',
    ITERATION: 16
};
