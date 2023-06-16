import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,tap,catchError, of } from 'rxjs';
import { LoginDataSchema } from '../login/LoginData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 

  private apiUrl = 'http://sample-url';

  constructor(private http: HttpClient) {}


  login(email:string,password:string) {
      

    const data = {email,password}

    return this.http.post<any>('${this.apiUrl}/login',data)
}

  signup(username:string,email:string,password:string) {


    const data = {username,email,password}
    return this.http.post<any>('${this.apiUrl}/signup',data)
   
  }

  logout(): void {
   
    localStorage.removeItem('token');

  }
  
  isLoggedIn(): boolean {
    
    const token = localStorage.getItem('token');
    return !!token;
   

  }
  
}
