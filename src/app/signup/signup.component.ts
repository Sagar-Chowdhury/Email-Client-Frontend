import { Component } from '@angular/core';
import { LoginDataSchema } from '../login/LoginData';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm!: FormGroup;
   

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


      this.auth.signup(name, email, password).subscribe(response =>{
     
      
        if(response.success){
        this.navigateToLogin()
         }
         else{
            console.log("Signup Error API related error");
            

         }

        })

    }
    else
    {
      console.log("Signup Credentials Invalid!");
      

    }
     
    
    }

  navigateToLogin(){
    this.route.navigate(['/login']);
  }

}
