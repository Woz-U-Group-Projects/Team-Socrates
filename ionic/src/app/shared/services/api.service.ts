import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'content-type': 'application/json; charset=utf-8'})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  get(URI: string) {
   return this.http.get(URI, {headers: headers, withCredentials: true})
  }
  post(URI: string, body: object) {
    return this.http.post(URI, body, {headers: headers, withCredentials: true})
  }
  put(URI: string, body: object){
    return this.http.put(URI, body, {headers: headers, withCredentials: true})
  }
  delete(URI: string, body: object){
    return this.http.delete(URI, {headers: headers, withCredentials: true})
  }
}
