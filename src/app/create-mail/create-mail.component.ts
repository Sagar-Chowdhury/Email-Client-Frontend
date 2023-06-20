import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';


@Component({
  selector: 'app-create-mail',
  templateUrl: './create-mail.component.html',
  styleUrls: ['./create-mail.component.scss']
})
export class CreateMailComponent implements OnDestroy {


  composeForm!:FormGroup
  composeSectionVisible:boolean = true
  logout$  = this.authService.logout()
  logoutSubscription!:Subscription

  constructor(private authService: AuthenticationService, private router: Router,private formBuilder:FormBuilder) {

    this.composeForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email ] ],
      cc: ['', [Validators.required, Validators.email ] ],
      bcc: ['', [Validators.required, Validators.email ] ],
      subject: ['', [Validators.required, Validators.minLength(1) ] ],
      body: ['', [Validators.required, Validators.minLength(1) ] ],
      attachments: ['']
    });


   }
 

  sendMail() {
    // Implement the logic to send the mail
  }

  //goes back to the login page after logout
  logout() {
    
   this.logoutSubscription = this.logout$.pipe(
      catchError((error) => { console.log(error.message);
      
        return of([]);
      
      })

    ).subscribe(response=>{
     
    const responseJson = JSON.stringify(response)
    console.log("Logout Response:-> " + responseJson );
    const responseObject = JSON.parse(responseJson); 
    const statusCode = responseObject.status;

    if(statusCode === 200)
    {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    else
    {
      console.log("Logout Error");
      
    }



  });
   
  }
  
  toggleComposeVisibility() {

    this.composeSectionVisible =!this.composeSectionVisible;

  }


  ngOnDestroy(): void {

    if(this.logoutSubscription){
    console.log("Logout Subscrption Unsubscribed");
    this.logoutSubscription.unsubscribe()
    }
  }


}
