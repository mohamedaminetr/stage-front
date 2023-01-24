import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService
 {
  constructor(private http : HttpClient , public router: Router) { }
  login(data:any): Observable<any> {

    
    return this.http.post(environment.urlBackend + 'sessions/', data);
  }

}
