import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable()
export class ApiService {
  baseURL: string = 'http://localhost:3001/api/';
  constructor(private http: HttpClient) {}
  setHeaders(headers: string[] | void) {
    if (!headers) {
      return undefined;
    } else {
      let newHeaders = new HttpHeaders();
      let headerKey: string;
      for (let i = 0; i < headers.length; i++) {
        if (i % 2 == 0) {
          headerKey = headers[i];
        } else {
          newHeaders = newHeaders.set(headerKey, headers[i]);
        }
      }
      return newHeaders;
    }
  }
  get(extURL: string) {
    return this.http
      .get(this.baseURL + extURL, {
        withCredentials: true,
      })
      .pipe(first());
  }
  post(extURL: string, body: object | void) {
    return this.http
      .post(this.baseURL + extURL, body, {
        withCredentials: true,
      })
      .pipe(first());
  }
  put(extURL: string, body: object | void) {
    return this.http
      .put(this.baseURL + extURL, body, {
        withCredentials: true,
      })
      .pipe(first());
  }
  delete(extURL: string, body: object | void) {
    return this.http
      .delete(this.baseURL + extURL, {
        withCredentials: true,
      })
      .pipe(first());
  }
}
