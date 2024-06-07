import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, of, timeout } from 'rxjs';
import { CommonUtils } from '../utils/commonUtil';
import { ConstantaUtil } from '../utils/constantaUtil';

// body from go
export interface ApiResponse<T = any> {
  status?: boolean;
  message: string;
  code: number;
  data: T;
}
export interface ApiResponsePaging<T = any> {
  status?: boolean;
  message: string;
  code: number;
  data: {
    pagingInfo: {
      pageNumber: number;
      activePage: number;
      rowCount: number;
      totalRecords: number;
    };
    responseBody: T[];
  };
}
/**
 * @author chandraa01
 * 28/02/24
 * HTTP Client API Interceptor
 */
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // exclude interception
  if (!req.url.includes('http')) return next(req);

  const apiTimeout: number = environment.apiTimeout; //ms
  const isDevelopment: boolean = !environment.production;
  const isProtected: boolean = ConstantaUtil.PROTECTED_ENDPOINTS.some((v) => req.url.includes(v));
  const commonUtils = inject(CommonUtils);

  if (isDevelopment) var request = req.clone();
  req = req.clone({
    headers: new HttpHeaders({
      ...getDefaultHttpHeaders(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    body: isProtected ? commonUtils.encrypt(req.body) : req.body
  });

  return next(req).pipe(
    map((res) => {
      if (res instanceof HttpResponse) {
        if (isProtected) {
          const apiResponse = res.body as ApiResponse;
          res = res.clone({
            body: {
              ...apiResponse,
              data: apiResponse.data ? JSON.parse(commonUtils.decyprt(apiResponse.data)) : apiResponse.data
            }
          });
        }
        if (isDevelopment) {
          console.log('REQUEST:', request.url, request.body);
          console.log('RESPONSE:', res.status, res.body);
        }
      }
      return res;
    }),
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        commonUtils.showErrorPopUp(ConstantaUtil.APPLICATION_ERROR_TITLE, ConstantaUtil.APPLICATION_ERROR_MESSAGE);

        if (isDevelopment) {
          console.log('REQUEST:', request.url, request.body);
          console.log('ERROR:', err.status, err.message);
        }
        return of(
          new HttpResponse({
            headers: err.headers,
            status: err.status,
            body: {
              status: false,
              code: err.status,
              message: err.message
            } as ApiResponse
          })
        );
      }
    }),
    timeout(apiTimeout),
    catchError((err) => {
      commonUtils.showErrorPopUp(ConstantaUtil.APPLICATION_ERROR_TITLE, ConstantaUtil.APPLICATION_ERROR_MESSAGE);
      if (isDevelopment) {
        console.log('REQUEST:', request.url, request.body);
        console.log('ERROR:', HttpStatusCode.RequestTimeout, err.message);
      }
      return of(
        new HttpResponse({
          headers: err.headers,
          status: HttpStatusCode.RequestTimeout,
          body: {
            status: false,
            code: HttpStatusCode.RequestTimeout,
            message: err.message
          } as ApiResponse
        })
      );
    })
  );
};

export const getDefaultHttpHeaders = () => {
  // prettier-ignore
  return {
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    'Content-Security-Policy': "default-src 'none'; object-src 'none'; script-src 'none'; form-action 'none'; frame-ancestors 'none'; block-all-mixed-content 'none'; base-uri 'none'; report-uri 'none'",
    'Expect-CT': 'max-age=31536000, enforce',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'same-origin',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0',
    'Pragma': 'no-cache'
  };
};
