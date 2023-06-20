import { Component, OnDestroy, OnInit } from '@angular/core';
import { MailingService } from '../services/mailing.service';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit,OnDestroy {


  getAllMailsSubscription!:Subscription
  constructor(private emailService:MailingService ){}
  emails!: any[];

  ngOnInit(): void {
       

     this.emailService.getAllMails().pipe(
      catchError((error) => { console.log(error.message);
      
        return of([]);
      
      })).subscribe( (response:any) =>{
           
        const responseJson = JSON.stringify(response)
        console.log("GetMail Response:-> " + responseJson );
        const responseObject = JSON.parse(responseJson); 
        this.emails= response.emails || []   

      } )



  }


  ngOnDestroy(): void {
    if(this.getAllMailsSubscription){
      console.log("GetAllMails Subscrption Unsubscribed");
      this.getAllMailsSubscription.unsubscribe()
      } 
  }

}
