import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { foyer } from './universite';

@Injectable({
  providedIn: 'root'
})
export class NomDuServiceService {

 
  readonly API_URL = 'http://192.168.33.10:8089/Foyer/universite';

  constructor(private httpClient: HttpClient) { }
  getAllfoyer() {
    return this.httpClient.get(`${this.API_URL}/findAll`)
  }
  addfoyer(foyer : any) {
    return this.httpClient.post(`${this.API_URL}/addOrUpdate`, foyer)
  }


  
}