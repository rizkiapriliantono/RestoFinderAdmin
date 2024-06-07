import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ReqLoginUser } from '../../inteface/req';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.apiUrl + '/master-vendor-api';
  private baseUrl2: string = environment.apiUrl + '/master-vendor-api';

  constructor(private httpClient: HttpClient) {}

  // getDetailVendorNotPermanentInternal(vendorHdrId: number) {
  //   return this.httpClient.post(`${this.baseUrl}/common/getDetailVendorNotPermanentInternal`, { vendorHdrId });
  // }

  // getDataLogin(req : ReqLoginUser){
  //   return this.httpClient.post(`${this.baseUrl}/common/getDetailVendorNotPermanentInternal`, { req });
  // }

  // getDataLogin(req: ReqLoginUser): Observable<any> {
  //   // Ganti URL sesuai dengan endpoint login Anda
  //   const loginUrl = 'http://example.com/api/login';
  //   // Kirim permintaan POST untuk login
  //   return this.httpClient.post(loginUrl, { req });
  // }

  // generateToken(user: any): string {
  //   // Contoh sederhana untuk menghasilkan token dari data pengguna
  //   return btoa(JSON.stringify(user));
  // }

  loginWithGoogle(token: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>('/api/auth/google', { token }, { observe: 'response' });
  }

  loginWithCredentials(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8000/api/auth/login', { email, password });
  }

  // getSubCategoryCoverage(req: ReqSubCategoryCoverage) {
  //   return this.httpClient.post(`${this.baseUrl}/general/getSubCategoryCoverage`, req).pipe(
  //     map((v: ApiResponsePaging<ResSubCategoryCoverage>) => {
  //       return {
  //         ...v,
  //         data: {
  //           ...v.data,
  //           responseBody: v.data?.responseBody?.map((v) => {
  //             return {
  //               id: v.itemSubCategoryId,
  //               itemCategory: {
  //                 id: v.itemCategoryId.toString(),
  //                 value: v.itemCategoryName
  //               },
  //               itemSubcategory: {
  //                 id: v.itemSubCategoryId.toString(),
  //                 value: v.itemSubCategoryName
  //               }
  //             } as SubCategoryCoverage;
  //           })
  //         }
  //       };
  //     })
  //   );
  // }
}
