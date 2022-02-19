import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = new HttpHeaders({'content-type': 'application/json; charset=utf-8','Access-Control-Allow-Origin': '*','withCredentials': 'true'})

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  get(URI: string) {
   return this.http.get(URI, {headers: headers})
  }
  post(URI: string, body: object) {
    return this.http.post(URI, body, {headers: headers})
  }
  put(URI: string, body: object){
    return this.http.put(URI, body, {headers: headers})
  }
  delete(URI: string, body: object){
    return this.http.delete(URI, body)
  }
}
