import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'content-type': 'application/json; charset=utf-8'})
@Injectable()
export class ApiService {
  baseURL: string = 'http://localhost:3001/api/';
  constructor(private http:HttpClient) { }
  
  get(URL: string) {
   return this.http.get(this.baseURL+URL, {headers: headers, withCredentials: true})
  }
  post(URL: string, body: object) {
    return this.http.post(this.baseURL+URL, body, {headers: headers, withCredentials: true})
  }
  put(URL: string, body: object){
    return this.http.put(this.baseURL+URL, body, {headers: headers, withCredentials: true})
  }
  delete(URL: string, body: object){
    return this.http.delete(this.baseURL+URL, {headers: headers, withCredentials: true})
  }
}
