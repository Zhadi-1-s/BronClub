import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  getUser():Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }
  createUser(user:any){
    return this.http.post<any>(this.apiUrl, user)
  }
  getUserById(id:number):Observable<any>{
    const url = `${this.apiUrl}?clubId=${id}`;
    return this.http.get<any>(url);
  }
  deleteUser(id:string){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url)
  }
}
