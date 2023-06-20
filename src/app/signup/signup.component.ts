import { Component, OnDestroy } from '@angular/core';
import { LoginDataSchema } from '../login/LoginData';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnDestroy {

  signupForm!: FormGroup;
  signupsubscription!:Subscription 

  constructor( private route:Router , private auth:AuthenticationService , private formBuilder:FormBuilder  ){

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.nullValidator] ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)]
    })

  }
 
  signup(){

    
     console.log(this.signupForm.value);
     console.log(this.signupForm.valid);
     
    if(this.signupForm.valid){
      
       const name = this.signupForm.get('name')?.value
       const email = this.signupForm.get('email')?.value
       const password = this.signupForm.get('password')?.value


    this.signupsubscription =  this.auth.signup(name, email, password).pipe(
          catchError((error) => { console.log(error.message);
          
            return of([]);
          
          })

      ).subscribe(response =>{
     
        const responseJson = JSON.stringify(response)
        console.log("Signup Response:-> " + responseJson );
        const responseObject = JSON.parse(responseJson);
        
      const statusCode = responseObject.status.code;
      const message = responseObject.status.message;
      const userId = responseObject.status.data.id;
      const email = responseObject.status.data.email;

        if(statusCode === 200){
        this.navigateToLogin()
         }
         else{
            console.log("Signup Error API related error");
            

         }

        }
        
        
      )

    }
    else
    {
      console.log("Signup Credentials Invalid!");
      

    }
     
    
    }

  navigateToLogin(){
    this.route.navigate(['/login']);
  }

  ngOnDestroy(): void {
    
    
    if(this.signupsubscription)
    {
      console.log("Signup Subscription Unsubscribed");  
    this.signupsubscription.unsubscribe();
    }
    
  }


}
