import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginDataSchema } from './LoginData';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  
  
  loginForm!:FormGroup 
  loginSubscription!:Subscription
  constructor(private toastr: ToastrService,private router:Router , private auth:AuthenticationService , private formBuilder:FormBuilder ){

    this.loginForm = this.formBuilder.group({
        email : ['',[Validators.required, Validators.email]],
        password : ['',[Validators.required, Validators.minLength(6)]]

    });


  }
  
  ngOnInit(): void {
    
      




  }




  login(){
    
    
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);

    if(this.loginForm.valid){
      const email = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value
  
    this.loginSubscription =  this.auth.login( email, password).pipe(
        catchError((error) => { console.log(error.message);
        
          return of([]);
        
        })

    ).subscribe( (response:any) =>{
                
        const responseJson = JSON.stringify(response)
        console.log("Login Response:-> " + responseJson );
        const responseObject = JSON.parse(responseJson); 
        const statusCode = responseObject.body.status.code;
      
        console.log(response.headers);
        
         
       
       if(statusCode == 200){
           //localStorage.setItem('token', token);
            this.navigateToCreateMail() 
            }
            else{

              console.log("Error in Login/Login Failed API Related");
              
            }
           
             
  
      }
      );
       
    }
    
    else
    {

      console.log("Invalid Login/Login Credentials")
      
      //this.toastr.error("Login Failed")
     
    }

   
    

    
          
    
  
  }
    

    navigateToSignUpPage(){
        
      this.router.navigate(['/signup']);
    }

    navigateToCreateMail() {
 
      this.router.navigate(['/createmail']);
    }

    ngOnDestroy(): void {
      

     
      
      if(this.loginSubscription){
        console.log("Login Subscrption Unsubscribed");  
      this.loginSubscription.unsubscribe();

      }
    }
    

}
 

