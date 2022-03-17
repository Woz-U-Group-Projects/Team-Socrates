import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable()
export class ApiService {
  defaultHeaders = new HttpHeaders({
    'content-type': 'application/json; charset=utf-8',
  });
  baseURL: string = 'http://localhost:3001/api/';
  constructor(private http: HttpClient) {}
  setHeaders(headers: string[] | void) {
    if (!headers) {
      return this.defaultHeaders;
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
  get(extURL: string, headers: string[] | void) {
    return this.http
      .get(this.baseURL + extURL, {
        headers: this.setHeaders(headers),
        withCredentials: true,
      })
      .pipe(first());
  }
  post(extURL: string, body: object, headers: string[] | void) {
    return this.http
      .post(this.baseURL + extURL, body, {
        headers: this.setHeaders(headers),
        withCredentials: true,
      })
      .pipe(first());
  }
  put(extURL: string, body: object, headers: string[] | void) {
    return this.http
      .put(this.baseURL + extURL, body, {
        headers: this.setHeaders(headers),
        withCredentials: true,
      })
      .pipe(first());
  }
  delete(extURL: string, body: object, headers: string[] | void) {
    return this.http
      .delete(this.baseURL + extURL, {
        headers: this.setHeaders(headers),
        withCredentials: true,
      })
      .pipe(first());
  }
}
