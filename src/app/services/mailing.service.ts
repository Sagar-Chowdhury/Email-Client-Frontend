import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailingService {


  

  constructor(private http: HttpClient) {}
   
   sendMail(data: any) {


   
    const authToken = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', authToken!);
   
    return this.http.post<any>('https:smtpbackend.iitmandi.co.in/email/send_email',data,{headers})

   }

   getAllMails(){
    
    const authToken = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', authToken!);
    return this.http.get<any>('https://smtpbackend.iitmandi.co.in/email/get_email',{headers})


   }


}
