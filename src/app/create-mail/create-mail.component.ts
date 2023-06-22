import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, catchError, of } from 'rxjs';
import { MailingService } from '../services/mailing.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-mail',
  templateUrl: './create-mail.component.html',
  styleUrls: ['./create-mail.component.scss']
})



export class CreateMailComponent implements OnDestroy,OnInit {


  composeForm!:FormGroup
  composeSectionVisible:boolean = false
  logout$  = this.authService.logout()
  logoutSubscription!:Subscription
  sendMailSubscription!:Subscription
  getAllMailsSubscription!:Subscription
  attachMentsGlobal:Array<Attachment> =[]
  
  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef;

  constructor(private toastr: ToastrService, private emailService:MailingService, private authService: AuthenticationService, private router: Router,private formBuilder:FormBuilder) {

    this.composeForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email ] ],
      cc: ['', [ Validators.email ] ],
      bcc: ['', [ Validators.email ] ],
      subject: ['', [Validators.required, Validators.minLength(1) ] ],
      body: ['', [Validators.required, Validators.minLength(1) ] ],
      attachments: ['']
    });


   }
  ngOnInit(): void 
  {
  
   

  
    
  }


   selectAttachments(data:any) {
    console.log(data.target.files);
    const fileList = data.target.files

    Object.keys(fileList).forEach((fileIndex:any) => {
     
      const file = fileList[fileIndex]
      const reader = new FileReader();
      reader.readAsDataURL(file);
       reader.onload = ()=>{
       
       console.log(file.name);
       console.log(reader.result);

       //remember the base 64 formatting data:[<mediatype>][;base64],<data>
       const attachmentData: Attachment = {
        filename: file.name,
        content: reader.result?reader.result.toString().split(',')[1]:"Error"
      };
       
        

       this.attachMentsGlobal.push(attachmentData); 


      
       }
    })

    
   }


  sendMail() {
    
    if(this.composeForm.valid)
    {
      
      const emailData = {
        to: this.composeForm.value.to,
        subject: this.composeForm.value.subject,
        body: this.composeForm.value.body,
        attachments: [] as Array<Attachment>
      };

      this.attachMentsGlobal.forEach((attachment:Attachment) => {
        emailData.attachments.push(attachment);
      });
      
      console.log("Send Mail Data ->" + JSON.stringify(emailData) );
      

      this.sendMailSubscription =   this.emailService.sendMail(emailData).pipe(
        catchError((error) => { console.log(error.message);
        
          return of([]);
        
        })

    ).subscribe( (response:any)=>{
         
      const responseJson = JSON.stringify(response)
      const responseObject = JSON.parse(responseJson); 
      console.log("SendMail Response ->" + responseJson);
      const statusCode = responseObject.status.code;

      if(statusCode === 200)
      { 
           this.toastr.success("Mail Sent Successfully ") 
           console.log("Mail Sent Successfully");
           this.composeForm.reset();
           this.attachMentsGlobal =[]
           this.fileInputRef.nativeElement.value = '';    
      }
      else
      {
        console.log("Error in Send Mail Failed API Related");
        this.toastr.error("Mail not sent ,try again"); 
      }
        

      

    } )



    }
    else
    {

      console.log("Compose Mail Credentials Invalid");
      
    }





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
      this.toastr.success("Logout Success")
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    else
    {
      console.log("Logout Error");
      this.toastr.error("Logout Error")
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

    if(this.sendMailSubscription){
        console.log("SendMail Subscrption Unsubscribed");
        this.sendMailSubscription.unsubscribe()
        }

       

  }


}

interface Attachment {
  filename: string;
  content: string;
}