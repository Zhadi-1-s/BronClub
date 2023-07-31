import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  private apiUrl = 'http://localhost:3000/clubs'

  constructor(private http : HttpClient) { }

  getClubsData():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getClubById(id:number):Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
  }
  changeAvailability(updatedClub: any):Observable<any>{
    const url = `${this.apiUrl}/${updatedClub.id}`;
    return this.http.put(url,updatedClub);
  }
}
