import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 

   options = {
    headers: Headers,
    observe: "response" as 'body', // to display the full response & as 'body' for type cast
    responseType: "json"
    };

  constructor(private http: HttpClient) {}


  login(email:string,password:string) {
      
   //my data fromat to be sent to the server
    const data = {
      user: {
        email: email,
        password: password
      }
    };
    console.log("Login data Sent -> " + JSON.stringify(data))
    
   


    return this.http.post<any>('https://smtpbackend.iitmandi.co.in/users/sign_in',data,{observe: 'response',withCredentials: true})
}

  signup(username:string,email:string,password:string) {


    const data = {
      user: {
        email: email,
        password: password
      }
    };
    console.log( "Sign Up data Sent -> " + JSON.stringify(data))
    
  
   
    return this.http.post<any>('https://smtpbackend.iitmandi.co.in/users',data)
}

  

  logout() {
   
    const authToken = localStorage.getItem('token')
   
     
  
     const headers = new HttpHeaders().set('Authorization', authToken!);
     return this.http.delete<any>('https://smtpbackend.iitmandi.co.in/users/sign_out',{headers})

  }
  
  isLoggedIn(): boolean {
    
    const token = localStorage.getItem('token');
    return !!token;
   

  }
  
}
