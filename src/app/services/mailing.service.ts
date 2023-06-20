import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailingService {


  private mailapiUrl = 'http://sample-url';

  constructor(private http: HttpClient) {}
   
   sendMail(email: string, subject: string, body: string){

    const data = { email,subject,body }
    return this.http.post<any>('${this.mailapiUrl}/mail',data)

   }


}
